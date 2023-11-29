<style lang="sass" scoped>
.on-notmobile
  height: 335px
  width: 300px
.on-mobile
  height: 235px
  width: 170px
</style>

<template>
  <q-page>
    <div class="row justify-center q-gutter-sm q-mt-lg">
      <div v-if="recommendationPersonal.length === 0" :class="Platform.is.mobile ? 'q-mt-lg flex flex-center text-center text-h5 text-grey-7 text-weight-light' : 'q-mt-xl flex flex-center text-h3 text-grey-7 text-weight-light'">
      Sorry, no recommendations are currently available.
    </div>
      <q-intersection
        v-for="item in recommendationPersonal"
        :key="item.recomendation_id"
        transition="scale"
        :class="!Platform.is.mobile ? 'on-notmobile q-mb-md' : 'on-mobile'"
      >
        <q-card flat bordered>
          <q-img :src="checkIfImage(item.img_path)" spinner-color="primary" />

          <q-card-section>
            <q-item-label lines="2" class="text-subtitle1 text-capitalize">{{ item.title }}</q-item-label>
            <div class="text-caption">by {{ wordFormatter(item.author_name )}}</div>
            <div class="row ">
              <q-btn
                flat
                icon="mdi-information-outline"
                color="dark"
                round
                :to="`/book/info?book_id=${item.book_id}`"
              >
                <q-tooltip class="bg-grey-8 text-grey-3"
                  >Book Information</q-tooltip
                >
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </q-intersection>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Platform, format } from 'quasar';
import recommendations from 'src/utils/Books/recommendation';
import { IRecommendPersonal } from 'src/utils/recommendation';
import { useRecommendationStore } from 'stores/recommendation-store';
import DefaultImg from 'src/assets/no-image-available.jpeg'
import { linkimg } from 'src/utils/links';

defineComponent({
  name: 'RecommendationPage',
});

const recommendationStore = useRecommendationStore();
const recommendationPersonal = ref<IRecommendPersonal>([]);

const wordFormatter = (word: string) => {
  return format.capitalize(word);
}

const checkIfImage = (img: string | null) => {
  return img ? linkimg + img : DefaultImg;
}

onMounted(async() => {
  if (recommendationPersonal.value.length === 0) {
    await recommendations.getAllRecommendations();
  }
  recommendationPersonal.value = await recommendationStore.getPersonalize;
});
</script>
