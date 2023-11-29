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
          @blur="onItemClick('all')"
          @keyup.enter="onItemClick(search)"
        >
          <template v-slot:append>
            <q-icon :name="!search ? 'search' : 'cancel'" @click="search = null" class="cursor-pointer" />
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
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import recommendations from 'src/utils/Books/recommendation';

defineComponent({
  name: 'InstructorRecommendLayout',
});

const leftDrawerOpen = ref(false);
const search = ref(null);
const router = useRouter();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const onItemClick = (link: string) => {
  search.value = null;
  router.replace({ query: { q: link } });
};

onMounted(async () => {
  await recommendations.getRecommendations();
})
</script>
