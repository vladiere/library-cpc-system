<template>
  <q-layout
    view="lhr lpR lFr"
    class="column text-capitalize q-gutter-x-md text-grey-10 q-py-xl text-grey-8 q-pr-xl float-right"
    style="width: 78vw"
  >
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'InnerPageLayout',
});
</script>
