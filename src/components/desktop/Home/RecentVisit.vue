<template>
  <div
    class="q-mt-lg column q-px-md shadow-8 text-capitalize q-py-sm"
    style="border-radius: 15px"
  >
    <div class="col text-subtitle1">
      <span>overall total recent visit</span>
      <q-separator color="grey-7" size="2px" />
    </div>
    <div class="col row">
      <div class="col column q-gutter-y-sm">
        <span class="text-h6">Departments</span>
        <span>Bachelor of Science in Information Technology</span>
        <span>Bachelor of Science in Hospitality Management</span>
        <span>Bachelor of Elementary Education</span>
        <span>bachelor of science in secondary education</span>
      </div>
      <div class="col-2 column q-gutter-y-sm">
        <span class="text-h6">Total</span>
        <span>15</span>
        <span>15</span>
        <span>58</span>
        <span>32</span>
        <q-separator color="grey-7" size="2px" />
        <span>120 overall total visits</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'ViewOnlines',
});
</script>
