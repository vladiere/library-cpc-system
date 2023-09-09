<template>
  <q-page class="bg-primary">
    <div class="q-py-lg q-px-xl q-mb-lg">
      <HomeBooks />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import HomeBooks from 'components/web/HomeBooks.vue';

defineComponent({
  name: 'HomeViewPage',
});
</script>
