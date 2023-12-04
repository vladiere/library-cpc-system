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
      <q-img
        v-for="item in recommendationPersonal"
        :key="item.recomendation_id"
        :src="checkIfImage(item.img_path)"
        sizes="(min-width: 100px) and (max-width: 400px) 400w,
              (min-width: 400px) and (max-width: 800px) 800w,
              (min-width: 800px) and (max-width: 1200px) 1200w,
              (min-width: 1200px) 1600w"
        :style="Platform.is.mobile ? 'height: 250px; max-width: 160px' : 'height: 280px; max-width: 300px'"
        fit="contain"
        class="shadow-2"
        @click="gotoBookInfo(item.book_id)"
      >
        <div class="absolute-bottom text-body2 text-center text-capitalize" style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden">
          {{ item.title }}
        </div>
      </q-img>
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
  recommendationPersonal.value = recommendationStore.getPersonalize;
  console.log(recommendationStore.getPersonalize)
});
</script>
