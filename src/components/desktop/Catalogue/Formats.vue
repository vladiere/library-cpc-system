<template>
  <div class="column q-pa-md">
    <div class="column text-capitalize">
      <span class="text-h5 text-bold">Add online book format</span>
      <div class="row q-gutter-x-md">
        <q-input
          label="Add new book format"
          square
          outlined
          color="blue-10"
          dense
          v-model="formats"
        />
        <q-btn label="add" color="blue-10" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

defineComponent({
  name: 'FormatsView',
});

const formats = ref('');
</script>
