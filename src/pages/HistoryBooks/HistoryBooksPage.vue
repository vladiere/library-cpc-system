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

const BorrowsHistoryComponent = defineAsyncComponent(() => import('components/MyBooks/BorrowsHistoryComponent.vue'))
</script>
