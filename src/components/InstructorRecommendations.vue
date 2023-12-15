<style lang="sass" scoped>
.onmobile-item
  height: 220px
  width: 168px

.notmobile-item
  height: 250px
  width: 220px
</style>

<template>
  <q-page padding>
      <div v-if="instructorRecommendations.length === 0" class="column content-center self-center q-gutter-y-md" >
        <span class="text-blue-4 text-h4">No results found in your search.</span>
      </div>

      <div class="row justify-center q-gutter-sm">
        <q-intersection
          v-for="item in instructorRecommendations"
          :key="item.recommendation_id"
          transition="scale"
          :class="Platform.is.mobile ? 'onmobile-item' : 'notmobile-item'"
        >
          <q-card bordered class="q-ma-sm">
            <q-item :class="Platform.is.mobile ? 'q-pa-sm' : ''">
              <q-item-section>
                <q-item-label class="text-body text-capitalize" lines="1">{{ item.fullname }}</q-item-label>
                <q-item-label caption lines="1" class="text-uppercase">{{ item.department }}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-icon name="mdi-information" @click="gotoBookInfo(item.book_id)" class="cursor-pointer">
                  <q-tooltip class="bg-grey-10 text-grey-2" :delay="300">book information</q-tooltip>
                </q-icon>
              </q-item-section>
            </q-item>

            <q-img spinner-color="primary" :src="checkIfImage(item.img_path)" width="100%" height="200px" fit="fill" :title="`${item.title}`" />

            <q-card-section :class="Platform.is.mobile ? 'q-pa-sm' : ''">
              <q-item-label class="text-body text-capitalize" lines="1">{{ item.title }}</q-item-label>
              <q-item-label caption lines="1" class="text-capitalize">{{ item.author_name }}</q-item-label>
            </q-card-section>
          </q-card>
        </q-intersection>
      </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, watch, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Platform } from 'quasar';
import { useRecommendationStore } from 'stores/recommendation-store';
import { IRecommendedInstructor } from 'src/utils/recommendation';
import recommendations from 'src/utils/Books/recommendation';
import DefaultImg from 'src/assets/no-image-available.jpeg'
import { linkimg } from 'src/utils/links';

defineComponent({
  name: 'MyBooksPage',
});

const router = useRouter();
const route = useRoute();
const recommendationStore = useRecommendationStore();

const instructorRecommendations = computed(() => searchInstructorRecommendations(route.query.q as string));
const recommendationsData = ref<IRecommendedInstructor>([]);

const gotoBookInfo = (book_id: number) => {
  router.push({ path: '/book/info', query: { book_id: book_id }});
}

const searchInstructorRecommendations = (search_query: string) => {
  if (search_query.toLowerCase() === 'all') {
    return recommendationsData.value;
  }

  return recommendationsData.value.filter(recommend =>
    Object.values(recommend).some(value => String(value).toLowerCase().includes(search_query.toLowerCase()))
  )
}

onMounted(async() => {
  if (instructorRecommendations.value.length === 0) {
    await recommendations.getRecommendations();
  }

  recommendationsData.value = recommendationStore.getAllRecommendations;
})

const checkIfImage = (img: string | null) => {
  return img ? linkimg + img : DefaultImg;
}

watch(() => route.query, () => {
  console.log(route.query.q)
})
</script>
