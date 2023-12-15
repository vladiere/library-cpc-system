<style lang="sass" scoped>
.on-notmobile
  height: 320px
  width: 200px
.on-mobile
  height: 280px
  width: 170px
</style>

<template>
  <q-page>
    <div v-if="isLoading" class="row justify-center q-gutter-sm q-pt-md">
      <q-skeleton :height="!Platform.is.mobile ? '320px' : '280px'" :width="!Platform.is.mobile ? '200px' : '170px'" animation="wave" v-for="index in 12" :key="index" />
    </div>
    <div v-if="!isLoading" class="row justify-center q-gutter-sm q-pt-md">
      <q-intersection
        v-for="trend in trendingBooks"
        :key="trend.book_id"
        transition="scale"
        :class="!Platform.is.mobile ? 'on-notmobile' : 'on-mobile'"
      >
        <q-card flat bordered>
          <q-img :src="checkIfImage(trend.img_path)" :height="!Platform.is.mobile ? '200px' : '165px'" fit="fill" />

          <q-card-section>
            <q-item-label lines="1" class="text-subtitle2 text-capitalize">{{ trend.title }}</q-item-label>
            <div class="text-caption text-capitalize">{{ trend.author_name }}</div>
            <div class="row justify-between items-center">
              <q-btn
                flat
                icon="mdi-information-outline"
                color="dark"
                round
                :to="`/book/info?book_id=${trend.book_id}`"
              >
                <q-tooltip class="bg-grey-8 text-grey-3"
                  >Book Information</q-tooltip
                >
              </q-btn>

              <q-icon :size="!Platform.is.mobile ? '2em' : '1.5em'" name="mdi-star" color="orange-9" v-for="count in calculateLogRating(trend.total_checkedout)" :key="count" />
              <q-icon :size="!Platform.is.mobile ? '2em' : '1.5em'" name="mdi-star-outline" color="orange-9" v-if="calculateLogRating(trend.total_checkedout) === 0" />
            </div>
          </q-card-section>
        </q-card>
      </q-intersection>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Platform } from 'quasar';
import { api } from 'boot/axios';
import { useUserStore } from 'stores/user-store';
import { debounce } from 'quasar';
import DefaultImg from 'src/assets/no-image-available.jpeg'
import { linkimg } from 'src/utils/links';

defineComponent({
  name: 'TrendingPage',
});

type TrendBook = {
author_name: string;
book_id: number;
img_path: string | null;
title: string;
total_checkedout: number;
}

const trendingBooks = ref<TrendBook>([]);
const userStore = useUserStore();
const isLoading = ref(false);

const getAllTrendingBooks = debounce(async () => {
  try {
    const response = await api.get('/dashboard', {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });

    if (response.status === 200) {
      trendingBooks.value = response.data.trend_books_for_user;
    }

    console.log(trendingBooks.value)

  } catch (error) {
    throw error;
  } finally {
    isLoading.value = false;
  }
}, 1500);

const checkIfImage = (img: string | null) => {
  return img ? linkimg + img : DefaultImg;
}

const calculateLogRating = (downloadCount: number) => {
  console.log(typeof downloadCount)
  return Math.ceil(Math.log10(downloadCount + 1));
}

onMounted(async () => {
  isLoading.value = true;
  await getAllTrendingBooks();
})
</script>
