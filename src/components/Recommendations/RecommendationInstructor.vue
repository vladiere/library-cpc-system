<style lang="sass" scoped>
.on-notmobile height: 335px
  width: 300px
.on-mobile
  height: 235px
  width: 170px
</style>

<template>
  <q-page>
    <div class="row justify-center q-gutter-sm q-mt-lg">
      <div class="flex flex-center text-weight-light text-h4 text-blue-8" v-if="recommendationInstructor.length === 0">
        Sorry, no recommendations are currently available.
      </div>
      <q-intersection
        v-for="item in recommendationInstructor"
        :key="item.recomendation_id"
        transition="scale"
        :class="!Platform.is.mobile ? 'on-notmobile q-mb-md' : 'on-mobile'"
      >
        <q-card flat bordered>
          <q-img :src="checkIfImage(img_path)" spinner-color="primary" />

          <q-card-section>
            <q-item-label lines="1" class="text-subtitle1 text-capitalize">{{ item.title }}</q-item-label>
            <div class="text-caption">by {{ wordFormatter(item.author_name) }}</div>
            <div class="row ">
              <q-btn
                flat
                icon="mdi-information-outline"
                color="dark"
                round
                :to="`/book/info?books_id=${item.book_id}`"
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
import { IRecommendedInstructor, IRecommendPersonal } from 'src/utils/recommendation';
import { useRecommendationStore } from 'stores/recommendation-store';
import DefaultImg from 'src/assets/no-image-available.jpeg'
import { linkimg } from 'src/utils/links';



defineComponent({
  name: 'RecommendationPage',
});

const recommendationStore = useRecommendationStore();
const recommendationInstructor = ref<IRecommendedInstructor>([]);

const wordFormatter = (word: string) => {
  return format.capitalize(word);
}

const checkIfImage = (img: string | null) => {
  return img ? linkimg + img : DefaultImg;
}

onMounted(async() => {
  if (recommendationInstructor.value.length === 0) {
    await recommendations.getAllRecommendations();
  }

  recommendationInstructor.value = await recommendationStore.getRecommendations;
});
</script>
