<template>
  <q-page padding>
    <div class="q-pa-xl">
      <RecommendBook />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { defineComponent } from 'vue'
  import RecommendBook from 'components/web/Recommend.vue'

  defineComponent({
    name: 'RecommendationsPage'
  })
</script>
