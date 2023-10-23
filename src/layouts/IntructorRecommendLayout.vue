<template>
  <q-layout view="lhh lpr lFr">
    <q-header class="bg-grey-2">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="sort"
          color="grey-10"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      class="bg-grey-2"
      bordered
    >
      <!-- drawer content -->
      <div class="fit row">
        <div class="col column text-subtitle1 q-pt-xl q-gutter-y-lg">
          <q-list dense separator class="text-capitalize">
            <q-item clickable v-ripple @click="gotoLink('all')">
              <q-item-section class="row justify-between"> All </q-item-section>
              <q-item-section avatar>
                <q-icon name="arrow_forward" />
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="gotoLink('bsit')">
              <q-item-section class="row justify-between">
                BSIT
              </q-item-section>
              <q-item-section avatar>
                <q-icon name="arrow_forward" />
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="gotoLink('bshm')">
              <q-item-section class="row justify-between">
                BSHM
              </q-item-section>
              <q-item-section avatar>
                <q-icon name="arrow_forward" />
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="gotoLink('beed')">
              <q-item-section class="row justify-between">
                BEED
              </q-item-section>
              <q-item-section avatar>
                <q-icon name="arrow_forward" />
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="gotoLink('bsed')">
              <q-item-section class="row justify-between">
                BSED
              </q-item-section>
              <q-item-section avatar>
                <q-icon name="arrow_forward" />
              </q-item-section>
            </q-item>
          </q-list>
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
        </div>
      </div>
    </q-drawer>

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

const gotoLink = (link: string) => {
  router.replace({ query: { q: link } });
};

const handleEnter = () => {
  console.log(search.value);
  gotoLink(search.value);
  search.value = '';
};
</script>
