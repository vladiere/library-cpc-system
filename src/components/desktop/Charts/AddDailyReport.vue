<template>
  <div
    class="col column q-px-md shadow-8 text-capitalize q-py-md"
    style="border-radius: 15px"
  >
    <div class="col text-subtitle1">
      <span>overall daily total</span>
      <q-separator color="grey-7" size="2px" />
    </div>
    <div class="col row">
      <div class="col column q-gutter-y-lg">
        <span class="text-h6">Departments</span>
        <span>Bachelor of Science in Information Technology</span>
        <span>Bachelor of Science in Hospitality Management</span>
        <span>Bachelor of Elementary Education</span>
        <span>bachelor of science in secondary education</span>
      </div>
      <div class="col-2 column q-gutter-y-sm">
        <span class="text-h6">Total</span>
        <q-input
          type="number"
          min="0"
          dense
          color="grey-10"
          label="Visits from BSIT"
          v-model="reports.bsit"
        />
        <q-input
          type="number"
          min="0"
          dense
          color="grey-10"
          label="Visits from BSHM"
          v-model="reports.bshm"
        />
        <q-input
          type="number"
          min="0"
          dense
          color="grey-10"
          label="Visits from BEED"
          v-model="reports.beed"
        />
        <q-input
          type="number"
          min="0"
          dense
          color="grey-10"
          label="Visits from BSED"
          v-model="reports.bsed"
        />
        <q-separator color="grey-7" size="2px" />
        <span>{{ reports.total }} overall total</span>
      </div>
    </div>
    <div class="col row">
      <q-btn label="add report" color="teal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';

defineComponent({
  name: 'AddDailyReport',
});

const reports = ref({
  bsit: '0',
  bshm: '0',
  beed: '0',
  bsed: '0',
  total: '0',
});

watchEffect(() => {
  let total = 0;
  total += isValidInt(reports.value.bsit) ? parseInt(reports.value.bsit) : 0;
  total += isValidInt(reports.value.beed) ? parseInt(reports.value.beed) : 0;
  total += isValidInt(reports.value.bsed) ? parseInt(reports.value.bsed) : 0;
  total += isValidInt(reports.value.bshm) ? parseInt(reports.value.bshm) : 0;

  reports.value.total = total.toString();
});

function isValidInt(value: string) {
  const parsedValue = parseInt(value);
  return !isNaN(parsedValue) && Number.isInteger(parsedValue);
}
</script>
