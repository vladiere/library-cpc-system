<template>
  <div class="q-py-lg q-px-xl q-mb-lg">
    <BooksCard />
    <TrendingBooksCard />
    <TrendingBooksCard />
    <TrendingBooksCard />
    <TrendingBooksCard />
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import BooksCard from 'components/web/BooksCard.vue';
import TrendingBooksCard from 'components/web/TrendingBooksCard.vue';
defineComponent({
  name: 'HomeBooksPage',
});
</script>
