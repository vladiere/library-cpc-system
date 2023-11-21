<template>
  <q-layout view="lhh lpr lFr">
    <q-header class="bg-grey-2 row justify-center items-center q-py-md">
        <q-input
          outlined
          rounded
          dense
          label="Search"
          color="grey-10"
          text-color="grey-10"
          v-model="search"
          @keyup.enter="handleEnter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn-dropdown color="primary" size="lg" flat dense rounded dropdown-icon="mdi-sort-variant" no-icon-animation menu-anchor="top left">
          <q-list dense separator>
            <q-item clickable v-close-popup @click="onItemClick('all')">
              <q-item-section>
              <q-item-label>All</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('bsit')">
            <q-item-section>
              <q-item-label>BSIT</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('bsed')">
            <q-item-section>
              <q-item-label>BSED</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('beed')">
            <q-item-section>
              <q-item-label>BEED</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('bshm')">
            <q-item-section>
              <q-item-label>BSHM</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

defineComponent({
  name: 'InstructorRecommendLayout',
});

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const search = ref();
const router = useRouter();

const onItemClick = (link: string) => {
  router.replace({ query: { q: link } });
};

const handleEnter = () => {
  console.log(search.value);
  gotoLink(search.value);
  search.value = '';
};
</script>
