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
    <div class="row justify-center q-gutter-sm">
      <div class="flex flex-center text-weight-light text-h4 text-blue-8" v-if="recommendationInstructor.length === 0">
        Sorry, no recommendations are currently available.
      </div>
      <q-img
        v-for="item in recommendationInstructor"
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
import { IRecommendedInstructor, IRecommendPersonal } from 'src/utils/recommendation';
import { useRecommendationStore } from 'stores/recommendation-store';
import DefaultImg from 'src/assets/no-image-available.png'
import { linkimg } from 'src/utils/links';
import { useRouter } from 'vue-router';


defineComponent({
  name: 'RecommendationPage',
});

const router = useRouter()
const recommendationStore = useRecommendationStore();
const recommendationInstructor = ref<IRecommendedInstructor>([]);

const checkIfImage = (img: string | null) => {
  return img ? linkimg + img : DefaultImg;
}

const gotoBookInfo = (book_id: number) => {
  router.push({ path: '/book/info', query: { book_id: book_id }});
}

onMounted(async() => {
  if (recommendationInstructor.value.length === 0) {
    await recommendations.getAllRecommendations();
  }

  recommendationInstructor.value = recommendationStore.getRecommendations;
});
</script>
