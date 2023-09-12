<template>
  <div
    class="col column q-px-md shadow-8 text-capitalize q-py-md q-mb-lg"
    style="border-radius: 15px"
  >
    <div class="col text-subtitle1">
      <span>overall daily total</span>
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
        <span>123</span>
        <span>321</span>
        <span>124</span>
        <span>412</span>
        <q-separator color="grey-7" size="2px" />
        <span>980 overall total</span>
      </div>
    </div>
    <div class="row">
      <q-btn
        flat
        dense
        outlined
        :label="theLabel"
        icon="report"
        icon-right="forward"
        @click="handleClickBtn"
      />
    </div>
  </div>
  <router-view />
</template>

<script setup lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

defineComponent({
  name: 'DailyReport',
});

const router = useRouter();
const theRoute = ref();
const theLabel = ref('add daily report');

const handleClickBtn = () => {
  if (theRoute.value === 'DailyChart' || undefined) {
    theLabel.value = 'see daily report';
    router.replace({ name: 'AddReport' });
  } else {
    theLabel.value = 'add daily report';
    router.replace({ name: 'DailyChart' });
  }
};

watchEffect(() => {
  theRoute.value = router.currentRoute.value.name ?? undefined;
});
</script>
