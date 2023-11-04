<template>
  <q-page padding>
    <div class="column text-h5 text-grey-7 text-weight-light q-pb-md">
      <span>Recent</span>
    </div>
    <q-separator />
    <PendingBooksComponent />
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
defineComponent({
   name: 'MyBooksPage'
});

const PendingBooksComponent = defineAsyncComponent({
  loader: () => import('components/MyBooks/PendingBooksComponent.vue'),
  loadingComponent: () => import('components/Loaders/BooksCardSkeleton.vue'),
  suspensible: false
});
</script>
