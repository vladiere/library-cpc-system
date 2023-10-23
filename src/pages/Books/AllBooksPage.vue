<template>
  <div class="column items-center q-my-xl q-gutter-y-md">
    <span class="text-h3 text-weight-thin text-blue-9">CPC Books we love</span>
    <span class="text-h6 text-weight-regualr text-blue-9">Favorite Reads!</span>
    <q-separator size="2px" width="95%"/>
    <div class="self-start q-ml-xl row q-gutter-x-md">
      <span class="text-subtitle1 text-blue-9">Pages</span>
      <q-pagination
        v-model="current"
        :max="totalPages"
        :max-pages="8"
        direction-links
        boundary-links
        icon-first="mdi-page-first"
        icon-last="mdi-page-last"
        icon-prev="mdi-chevron-left"
        icon-next="mdi-chevron-right"
      />
    </div>
    <q-separator size="2px" width="95%"/>
    <div class="q-mt-md q-pa-md row q-gutter-x-md justify-center">
      <AllBooksComponent v-for="books in paginatedBooksList" class="cursor-pointer" :key="books.book_id" v-bind="books" @click="gotoBookInfo(books.book_id, books.title)"/>
   </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';
import AllBooksComponent, { AllBooksListInterface } from 'src/components/Books/AllBooksComponent.vue'
import { useRouter } from 'vue-router';

defineComponent({
  name: 'AllBooksPage'
});

const userStore = useUserStore();
const current = ref(1);
const itemsPerPage = 12;
const booksData = ref<AllBooksListInterface>([]);
const totalPages = computed(() => Math.ceil(booksData.value.length / itemsPerPage));
const router = useRouter();


const getAllBooksList = async () => {
  try {

    const response = await api.post('/get/all/books/inventory', { limit: 0 }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });

    booksData.value = response.data;

  } catch (error) {
    throw error;
  }
};

const paginatedBooksList = computed(() => {
  const start = (current.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return booksData.value.slice(start, end);
});

const gotoBookInfo = (book_id: number, book_title: string) => {
  router.push({ path: `/book/info/${book_title.replace(/\s+/g, '+')}`, query: { book_id } })
}

onMounted(() => {
  getAllBooksList();
})
</script>
