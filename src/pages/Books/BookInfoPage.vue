<template>
  <q-page padding class="q-mb-lg">
    <BookInfoComponent v-bind="bookInfo" />
    <div class="column q-gutter-y-md bg-blue-2 q-mt-xl rounded-borders">
      <span class="text-h4 text-weight-light text-blue-9 self-center q-mt-lg">More by this Author</span>
      <div :class="!Platform.is.mobile ? 'row q-gutter-md items-center q-pl-xl text-capitalize q-my-lg' : 'row q-gutter-md text-capitalize justify-center q-my-lg'">
        <AuthorBooksComponent
          v-for="book in authorBooks"
          :key="book.book_id"
          v-bind="book"
          @click="gotoBookInfo(book.book_id, book.title)"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, watch, defineAsyncComponent } from 'vue';
import { Platform } from 'quasar';
import { BookInfoInterface } from 'components/Books/BookInfoComponent.vue'
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/user-store';
import { AuthorBooksInterface } from 'components/Author/AuthorBooksComponent.vue'

defineComponent({
  name: 'BookInfoPage'
});

const BookInfoComponent = defineAsyncComponent({
  loader: () => import('components/Books/BookInfoComponent.vue'),
  delay: 500,
  suspensible: false
});

const AuthorBooksComponent = defineAsyncComponent({
  loader: () => import('components/Author/AuthorBooksComponent.vue'),
  delay: 500,
  suspensible: false
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

const gotoBookInfo = (book_id: number) => {
  router.push({ name: 'book_info', query: { book_id }})
}

onMounted(async () => {
  await getBookInfo();
});

watch(router.currentRoute, (newValue) => {
  if (newValue) {
    getBookInfo()
  }
})

</script>
