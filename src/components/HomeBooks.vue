<template>
  <div :class="Platform.is.mobile ? '' : ' q-py-lg q-mb-lg'">
    <div class="column q-gutter-y-md">
      <BooksCard v-if="!loading"/>
      <q-skeleton v-else height="300px" width="100%" />
      <TrendingBooksCard :count="Platform.is.mobile ? 3 : 5" />
      <TrendingBooksCard :count="Platform.is.mobile ? 3 : 5" />
      <TrendingBooksCard :count="Platform.is.mobile ? 3 : 5" />
      <TrendingBooksCard :count="Platform.is.mobile ? 3 : 5" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import BooksCard from 'components/BooksCard.vue';
import TrendingBooksCard from 'components/TrendingBooksCard.vue';
import { Platform } from 'quasar';

defineComponent({
  name: 'HomeBooksPage',
});

const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 2000);

</script>
