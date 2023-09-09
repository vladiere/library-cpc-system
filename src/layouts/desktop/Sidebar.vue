<template>
  <q-layout view="lhh lpR lFf">
    <div
      class="q-ml-lg bg-blue-grey-2 q-mt-md fixed-left shadow-10"
      style="border-radius: 20px; width: 18vw; height: 90vh; top: 5%"
    >
      <div class="row q-mt-md q-gutter-x-md justify-center items-center">
        <q-img :src="LibraryLogo" style="width: 15%" />
        <span class="text-subtitle1 text-bold text-grey-10">CPC Library</span>
      </div>
      <q-separator size="2px" class="q-mt-lg bg-grey-8" />
      <q-scroll-area style="height: 79vh; max-width: 100%">
        <Menu />
      </q-scroll-area>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import LibraryLogo from 'assets/logo.png';
import Menu from 'components/desktop/MenuList/MenuList.vue';

defineComponent({
  name: 'SideLayout',
});
</script>
