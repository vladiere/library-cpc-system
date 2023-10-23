

<template>
  <div :class="Platform.is.mobile ? 'q-pa-none q-ma-none' : 'q-my-lg'">
    <div class="bg-blue-2 q-pa-md rounded-borders column q-gutter-y-lg">
      <div class="col column items-center">
        <span :class="Platform.is.mobile ? 'text-h6 text-blue-9 self-center' : 'text-h4 text-blue-9 self-center'">All Books available at CPC Library</span>
        <q-btn icon-right="mdi-chevron-double-right" flat rounded text-color="blue-9" label="See all books list" no-caps to="book/collections" />
      </div>
      <div class="row q-gutter-x-md justify-center q-mb-md">
        <BooksCard v-for="books in allBooks" :key="books.book_id" v-bind="books" />
      </div>
    </div>

    <div class="column q-gutter-y-md">
      <!-- <BooksCard v-if="!loading"/> -->
      <!-- <q-skeleton v-else height="300px" width="100%" /> -->
      <!-- <TrendingBooksCard :count="Platform.is.mobile ? 3 : 5" /> -->
      <!-- <TrendingBooksCard :count="Platform.is.mobile ? 3 : 5" /> -->
      <!-- <TrendingBooksCard :count="Platform.is.mobile ? 3 : 5" /> -->
      <!-- <TrendingBooksCard :count="Platform.is.mobile ? 3 : 5" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import BooksCard, { AllBooksInterface } from 'components/Books/BooksCardComponent.vue';
import TrendingBooksCard from 'components/TrendingBooksCard.vue';
import { Platform } from 'quasar';
import { api } from 'src/boot/axios'
import { useUserStore } from 'src/stores/user-store';

defineComponent({
  name: 'HomeBooksPage',
});

const userStore = useUserStore();
const allBooks = ref<AllBooksInterface>([])

const getAllBooks = async () => {
  try {
    const response = await api.post('/get/all/books/inventory', { limit: 6 }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    allBooks.value = response.data;
  } catch (error) {
    throw error;
  }
}


onMounted(() => {
  getAllBooks();
})
</script>
