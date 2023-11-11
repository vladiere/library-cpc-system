<template>
  <q-page padding class="bg-grey-2">
    <div :class="Platform.is.mobile ? 'q-pa-none q-ma-none column q-gutter-y-lg' : 'q-mb-lg column q-gutter-y-xl'">
      <div class="bg-blue-2 rounded-borders column q-gutter-y-lg q-px-md">
        <div class="col column items-center">
          <span :class="Platform.is.mobile ? 'text-h6 text-blue-9 self-center' : 'text-h4 text-blue-9 self-center'">All Books available at CPC Library</span>
          <q-btn icon-right="mdi-chevron-double-right" flat rounded text-color="blue-9" label="See all books list" no-caps to="book/collections" />
        </div>
        <div class="row q-gutter-x-md justify-center q-mb-md home-div">
          <BooksCard v-for="books in allBooks" :key="books.book_id" v-bind="books" />
        </div>
      </div>
      <div class="bg-blue-2 rounded-borders column q-gutter-y-lg q-px-md">
        <div class="col column items-center">
          <span :class="Platform.is.mobile ? 'text-h6 text-blue-9 self-center' : 'text-h4 text-blue-9 self-center'">Contributed eBooks available</span>
          <q-btn icon-right="mdi-chevron-double-right" flat rounded text-color="blue-9" label="See more" no-caps to="book/collections" />
        </div>
        <div class="row q-gutter-x-md justify-center q-mb-lg">
          <AllContributionComponent v-for="list in contributionList" :key="list.contribution_id" v-bind="list" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue';
import { AllBooksInterface } from 'components/Books/BooksCardComponent.vue';
import { Platform } from 'quasar';
import { api } from 'src/boot/axios'
import { useUserStore } from 'src/stores/user-store';
import BooksCardSkeleton from 'components/Loaders/BooksCardSkeleton.vue';
import { AllContributionProps } from 'components/Contribute/AllContributionComponent.vue';



defineComponent({
  name: 'HomeBooksPage',
});

const BooksCard = defineAsyncComponent({
  loader: () => import('components/Books/BooksCardComponent.vue'),
  loadingComponent: BooksCardSkeleton,
  delay: 200,
  timeout: 2300,
  suspensible: false,
});

const AllContributionComponent = defineAsyncComponent({
  loader: () => import('components/Contribute/AllContributionComponent.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: false
})

const userStore = useUserStore();
const allBooks = ref<AllBooksInterface>([])
const contributionList = ref<AllContributionProps>([])

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

const getUserContributions = async () => {
  try {
    const response = await api.post('/user/book/contribute/list', { user_id: 0, limit: 5 }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });
    contributionList.value = response.data;
  } catch (error) {
    throw error;
  }
}

onMounted(async () => {
  await getAllBooks();
  await getUserContributions();
})

onUnmounted(() => {
  allBooks.value = []
  contributionList.value = []
});
</script>
