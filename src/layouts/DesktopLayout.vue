<template>
  <q-layout view="hHh lpR lFf">
    <q-header class="bg-grey-10">
      <q-bar class="q-electron-drag fixed-top bg-grey-10">
        <q-avatar class="q-electron-drag--exception">
          <q-img :src="Logo" />
        </q-avatar>
        <span class="q-ml-md text-subtitle1">CPC <small>Library</small></span>

        <q-space />

        <q-btn dense flat icon="minimize" @click="minimize" />
        <q-btn
          dense
          flat
          :icon="icons ? 'fullscreen_exit' : 'fullscreen'"
          @click="toggleMaximize"
        />
        <q-btn dense flat icon="close" @click="closeApp" />
      </q-bar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import Logo from 'src/assets/logo.png';

defineComponent({
  name: 'DesktopLayout',
});

const icons = ref(true);

const minimize = () => {
  if (process.env.MODE === 'electron') {
    window.cpcWindowAPI?.minimize();
  }
};

const toggleMaximize = () => {
  if (process.env.MODE === 'electron') {
    window.cpcWindowAPI?.toggleMaximize();
    icons.value = !icons.value;
  }
};

const closeApp = () => {
  if (process.env.MODE === 'electron') {
    window.cpcWindowAPI?.close();
  }
};
</script>
