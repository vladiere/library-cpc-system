<template>
  <q-page padding>
    <div class="q-pa-xl">
      <BooksCard />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { defineComponent } from 'vue'
  import BooksCard from 'components/web/BooksCard.vue'

  defineComponent({
    name: 'RecentBooksPage'
  })
</script>
