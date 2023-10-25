<template>
  <q-page padding class="q-mb-lg">
    <BookInfoComponent v-bind="bookInfo" />
    <div class="column q-gutter-y-md bg-blue-2 q-mt-xl rounded-borders">
      <span class="text-h4 text-weight-light text-blue-9 self-center q-mt-lg">More by this Author</span>
      <div class="row q-gutter-x-md items-center q-pl-xl">
        <AuthorBooksComponent v-for="book in authorBooks" :key="book.book_id" v-bind="book" class="cursor-pointer" @click="gotoBookInfo(book.book_id, book.title)"/>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, onBeforeMount, watch } from 'vue';
import { Platform } from 'quasar';
import BookInfoComponent, { BookInfoInterface } from 'src/components/Books/BookInfoComponent.vue'
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/user-store';
import AuthorBooksComponent, { AuthorBooksInterface } from 'src/components/Author/AuthorBooksComponent.vue'
import { SpinnerIos } from 'src/utils/loading'

defineComponent({
  name: 'BookInfoPage'
});

const router = useRouter()
const bookInfo = ref<BookInfoInterface>([]);
const authorBooks = ref<AuthorBooksInterface>([]);
const userStore = useUserStore();

const getBookInfo = async () => {
  try {
    const response = await api.post('/get/all/books/inventory', { limit: 1, book_id: router.currentRoute.value.query.book_id }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });
    bookInfo.value = response.data[0];

    getAuthorBooks();

  } catch (error) {
    throw error;
  }
};

const getAuthorBooks = async () => {
  try {
    const response = await api.post('/get/books/author', { author_name: bookInfo.value.author_name }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })

    authorBooks.value = response.data;
  } catch (error) {
    throw error;
  }
};

const gotoBookInfo = (book_id: number, book_title: string) => {
  router.push({ name: 'book_info', params: { book_title: book_title.replace(/\s+/g, '+')}, query: { book_id }})
}

onMounted(() => {
  getBookInfo();
});

onBeforeMount(() => {
  SpinnerIos(true, 'Loading...')

  setTimeout(() => {
    SpinnerIos(false)
  }, 1500);
});

watch(router.currentRoute, (newValue) => {
  getBookInfo()
})

</script>
