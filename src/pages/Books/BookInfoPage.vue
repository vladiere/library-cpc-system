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
import { Platform, debounce } from 'quasar';
import { BookInfoInterface } from 'components/Books/BookInfoComponent.vue'
import { useRouter } from 'vue-router';
import { AuthorBooksInterface } from 'components/Author/AuthorBooksComponent.vue'
import { useBooksStore } from 'stores/books-store';
import books from 'src/utils/Books/books';
import { SpinnerFacebook } from 'src/utils/loading';

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
const bookStore = useBooksStore();

const getBookInfo = async () => {
  try {
    if (bookInfo.value.length === 0) {
      await books.getAllContributorsBooks();
    }
    bookInfo.value = await bookStore.getBookById(parseInt(router.currentRoute.value.query.book_id));
    authorBooks.value = await bookStore.getBookAuthor(bookInfo.value.author_name);
  } catch (error) {
    throw error;
  } finally {
    SpinnerFacebook(false);
  }
};

const gotoBookInfo = (book_id: number) => {
  router.push({ name: 'book_info', query: { book_id }})
}

onMounted(async () => {
  SpinnerFacebook(true, 'Loading book');
  await getBookInfo();
});

watch(router.currentRoute, (newValue) => {
  if (newValue) {
    getBookInfo()
  }
})

</script>
