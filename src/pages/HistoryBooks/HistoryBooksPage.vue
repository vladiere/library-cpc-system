<template>
  <q-page padding>
    <BorrowsHistoryComponent />
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'

defineComponent({
   name: 'HistoryBooksPage'
});

const BorrowsHistoryComponent = defineAsyncComponent({
  loader: () => import('components/MyBooks/BorrowsHistoryComponent.vue'),
  loadingComponent: () => import('components/Loaders/BooksCardSkeleton.vue'),
  suspensible: false
});
</script>
