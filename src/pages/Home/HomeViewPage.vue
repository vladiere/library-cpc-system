<template>
  <q-page padding class="bg-grey-2">
    <div :class="Platform.is.mobile ? 'q-pa-none q-ma-none column q-gutter-y-lg' : 'q-mb-lg column q-gutter-y-xl'">
      <div class="rounded-borders column q-gutter-y-lg q-px-md">
        <div class="col column items-center">
          <span :class="Platform.is.mobile ? 'text-h6 text-blue-9 self-center' : 'text-h4 text-blue-9 self-center'">All Books available at CPC Library</span>
          <q-btn icon-right="mdi-chevron-double-right" flat rounded text-color="blue-9" label="See all books list" no-caps to="book/collections" />
        </div>
        <div class="row q-gutter-x-md justify-center q-mb-md">
          <BooksCard v-for="books in allBooks" :key="books.book_id" v-bind="books" />
        </div>
      </div>
      <div class="rounded-borders column q-gutter-y-lg q-px-md" v-if="contributionList.length !== 0">
        <div class="col column items-center">
          <span :class="Platform.is.mobile ? 'text-h6 text-blue-9 self-center' : 'text-h4 text-blue-9 self-center'">Contributed eBooks available</span>
          <q-btn icon-right="mdi-chevron-double-right" flat rounded text-color="blue-9" label="See more" no-caps to="contribute/all" />
        </div>
        <div class="row q-gutter-md justify-center q-mb-lg">
          <AllContributionComponent v-for="list in contributionList" :key="list.contribution_id" v-bind="list" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, defineAsyncComponent } from 'vue';
import { AllBooksInterface } from 'components/Books/BooksCardComponent.vue';
import { Platform } from 'quasar';
import BooksCardSkeleton from 'components/Loaders/BooksCardSkeleton.vue';
import { AllContributionProps } from 'components/Contribute/AllContributionComponent.vue';
import { useBooksStore } from 'src/stores/books-store';
import books from 'src/utils/Books/books';


defineComponent({
  name: 'HomeBooksPage',
});

const BooksCard = defineAsyncComponent({
  loader: () => import('components/Books/BooksCardComponent.vue'),
  loadingComponent: BooksCardSkeleton,
  delay: 500,
  timeout: 2300,
  suspensible: false,
});

const AllContributionComponent = defineAsyncComponent({
  loader: () => import('components/Contribute/AllContributionComponent.vue'),
  delay: 500,
  timeout: 2300,
  suspensible: false
})

const allBooks = ref<AllBooksInterface>([]);
const contributionList = ref<AllContributionProps>([]);
const bookStore = useBooksStore();

const booksTimeout = async () => {
  await setTimeout(async () => {
    await bookStore.getAllBooks.map((item: unknown, index: number) => {
      if (index < 5) allBooks.value.push(item);
    })
    await bookStore.getAllEBooks.map((item: unknown, index: number) => {
      if (index < 5) contributionList.value.push(item)
    });
  }, 500);
}

onMounted(async () => {
  if (allBooks.value.length === 0 || contributionList.value.length === 0) {
    await books.getAllContributorsBooks();
  }
  await booksTimeout();
})

</script>
