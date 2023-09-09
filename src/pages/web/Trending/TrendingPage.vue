<template>
  <q-page padding>
    <div class="q-pa-xl">
      <TrendingBooks />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { defineComponent } from 'vue'
  import TrendingBooks from 'components/web/TrendingBooksCard.vue'

  defineComponent({
    name: 'TrendingPage'
  })
</script>
