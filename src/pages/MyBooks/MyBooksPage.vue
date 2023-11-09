<template>
  <q-page padding>
    <PendingBooksComponent />
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import { SpinnerIos } from 'src/utils/loading';

defineComponent({
   name: 'MyBooksPage'
});

const PendingBooksComponent = defineAsyncComponent({
  loader: () => import('components/MyBooks/PendingBooksComponent.vue'),
  delay: 500,
  suspensible: false
});
</script>
