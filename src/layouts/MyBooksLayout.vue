<template>
  <q-layout>
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
      <div class="column q-mt-lg">
        <div class="column text-subtitle1">
          <div
            class="column items-center content-center text-subtitle2 text-grey-9 q-py-sm"
          >
            Descartin, Lance Phillip B.
            <span class="text-caption">ID: 20200800</span>
          </div>
          <q-separator color="grey-9" class="q-my-lg" />
          <q-list dense padding>
            <q-item
              clickable
              v-ripple
              @click="gotoLink('/userbooks/collections')"
            >
              <q-item-section class="row justify-between">
                My Collections
              </q-item-section>
              <q-item-section avatar>
                <q-icon name="arrow_forward" />
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              @click="gotoLink('/userbooks/borrowshistory')"
            >
              <q-item-section class="row justify-between">
                Borrows History
              </q-item-section>
              <q-item-section avatar>
                <q-icon name="arrow_forward" />
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator color="grey-9" class="q-my-lg" />
          <div
            class="row q-px-sm content-center justify-between bg-grey-4 text-subtitle2 text-grey-9"
          >
            <span>My List</span>
            <span
              class="text-caption see-all"
              @click="gotoLink('/userbooks/mylists')"
              >See All <q-icon name="navigate_next" size="1rem"
            /></span>
          </div>
          <div v-if="lists.length === 0" class="column content-center q-mt-sm">
            <span class="text-subtitle1 text-grey-8">Empty List</span>
          </div>
          <div v-else class="column">
            <q-list dense padding separator class="q-x-sm">
              <q-item
                v-for="list in lists"
                :key="list.id"
                clickable
                :to="list.link"
              >
                <q-item-section>
                  {{ list.title }}
                </q-item-section>
              </q-item>
            </q-list>
          </div>
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
  name: 'MyBooksLayout',
});

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

interface List {
  id: number;
  title: string;
  link: string;
}

const router = useRouter();

const gotoLink = (link: string) => {
  router.push(link);
};

const lists = ref<List[]>([
  { id: 1, title: 'code complete', link: '/userbooks/mylists/lists' },
  { id: 2, title: 'clean code', link: '/userbooks/mylists/lists' },
]);
</script>
