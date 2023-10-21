<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 252px
  transition: 0.35s ease-in-out

.mobile-card
  max-width: 100px
  width: 100%
</style>

<template>
  <div
    :class="
      Platform.is.mobile
        ? 'text-capitalize'
        : 'q-ml-sm q-mt-md text-capitalize'
    "
  >
    <span
      :class="
        Platform.is.mobile ? 'text-subtitle1 q-ml-md' : 'text-h5 q-mb-md'
      "
      style="text-decoration: underline"
      >Recent Books</span
    >
    <q-carousel
      v-model="activeIndex"
      :arrows="!Platform.is.mobile"
      :swipeable="Platform.is.mobile"
      transition-prev="slide-prev"
      class="bg-transparent"
      transition-next="slide-next"
      :control-color="!Platform.is.mobile ? 'dark' : ''"
      :control-type="!Platform.is.mobile ? 'regular' : undefined"
      :prev_icon="!Platform.is.mobile ? 'arrow_left' : ''"
      :height="Platform.is.mobile ? '255px' : '365px'"
      :next_icon="!Platform.is.mobile ? 'arrow_right' : ''"
    >
      <q-carousel-slide
        v-for="(slideImages, index) in groupedImages"
        :name="index"
        :key="index"
        transition-prev="fade"
        transition-next="fade"
        class="flex q-pa-none q-ma-none"
      >
        <q-card
          square
          flat
          :style="Platform.is.mobile ? 'max-width: 115px': ''"
          v-for="bookRecommend in slideImages"
          :key="bookRecommend.book_id"
          class="my-card bg-transparent cursor-pointer"
          @click="navigateToBookInfo(bookRecommend.book_id, bookRecommend.title)"
        >
          <q-img :src="checkIfImage(bookRecommend.img_path)" :height="Platform.is.mobile ? '150px' : '255px'" fit="fill"/>

          <q-card-section>
            <q-item-label lines="2" :class="Platform.is.mobile ? 'text-subtile1' : 'text-h6'">{{ bookRecommend.title }}</q-item-label>
            <q-item-label :class="Platform.is.mobile ? 'text-body' : 'text-subtitle2'">{{ bookRecommend.author_name }}</q-item-label>
          </q-card-section>
        </q-card>
      </q-carousel-slide>
    </q-carousel>

  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ManEmpty from 'assets/man-empty.png';
import { Platform } from 'quasar';
import { api } from 'src/boot/axios'
import { useUserStore } from 'src/stores/user-store';
import { useBooksStore } from 'src/stores/books-store'

defineComponent({
  name: 'RecommendBooks',
});

const router = useRouter();
const activeIndex = ref(0);
const userStore = useUserStore();
const bookStore = useBooksStore();

interface RecommendBook {
  author_name: string;
  book_id: number;
  book_status: string;
  borrowed_copies: number;
  copies: number;
  cost_price: number;
  edition: string;
  publisher_name: string;
  title: string;
  img_path: string;
}


const recommendBooks = ref<RecommendBook[]>([]);

const groupedImages = computed(() => {
  const groupSize = Platform.is.mobile ? 3 : 5; // Number of images in each slide
  const result = [];

  for (let i = 0; i < recommendBooks.value.length; i += groupSize) {
    result.push(recommendBooks.value.slice(i, i + groupSize));
  }

  return result;
});

const navigateToBookInfo = (book_id: number, book_title: string) => {
  router.push({ name: 'books', query: { q: book_id+'-'+book_title}});
};

const checkIfImage = (img: string | null) => {
  if (img) {
    return `http://localhost:3000/images/${img}`
  } else {
    return 'https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg'
  }
}

onMounted(() => {
  recommendBooks.value = bookStore.getAllBooks;
})

</script>
