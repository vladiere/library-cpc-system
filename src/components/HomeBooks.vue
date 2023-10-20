<template>
  <div :class="$q.platform.is.mobile ? '' : ' q-py-lg q-mb-lg'">
    <div class="column q-gutter-y-md">
      <BooksCard />
      <TrendingBooksCard :count="$q.platform.is.mobile ? 3 : 5" />
      <TrendingBooksCard :count="$q.platform.is.mobile ? 3 : 5" />
      <TrendingBooksCard :count="$q.platform.is.mobile ? 3 : 5" />
      <TrendingBooksCard :count="$q.platform.is.mobile ? 3 : 5" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import BooksCard from 'components/BooksCard.vue';
import TrendingBooksCard from 'components/TrendingBooksCard.vue';
import { useQuasar } from 'quasar';

defineComponent({
  name: 'HomeBooksPage',
});

const $q = useQuasar();
</script>
