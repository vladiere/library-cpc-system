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
import { defineComponent, onMounted } from 'vue';
import LibraryLogo from 'assets/applogo.png';
import Menu from 'components/desktop/MenuList/MenuList.vue';
import { useRouter } from 'vue-router';
import { useLibrarianDataStore, useUserStore } from 'src/stores/user';
import { api } from 'src/boot/axios';

defineComponent({
  name: 'SideLayout',
});

const router = useRouter();
const librarianStore = useLibrarianDataStore();
const userStore = useUserStore();

onMounted(async () => {
  try {
    const response = await api.get('protected/get/all', {
      headers: {
        Authorization: `Bearer ${userStore.token}`,
      },
    });

    librarianStore.initLibrarian(response.data.users[0]);
  } catch (error) {
    console.error(error);
  }
});
</script>
