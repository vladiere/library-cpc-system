<template>
  <q-layout
    class="column q-py-xl q-pl-xl q-pr-md q-mt-sm float-right"
    style="width: 82vw"
  >
    <div
      class="col-4 column bg-grey-3 q-px-md q-pt-md q-pb-md shadow-8"
      style="border-radius: 15px"
    >
      <div class="row">
        <div class="col-1">
          <q-btn flat dense no-caps icon="account_circle" to="/account">
            <q-tooltip
              class="bg-grey-2 text-grey-10"
              :delay="200"
              transition-show="fade"
              transition-hide="fade"
              >Account</q-tooltip
            >
          </q-btn>
        </div>
        <div class="col-11 row reverse">
          <q-btn icon="settings" flat dense no-caps to="/settings">
            <q-tooltip
              class="bg-grey-2 text-grey-10"
              :delay="200"
              transition-show="fade"
              transition-hide="fade"
              >Settings</q-tooltip
            >
          </q-btn>
          <q-btn icon="notifications" dense flat no-caps to="/notifications">
            <q-tooltip
              class="bg-grey-2 text-grey-10"
              :delay="200"
              transition-show="fade"
              transition-hide="fade"
              >Notifications</q-tooltip
            >
            <q-badge color="red-5" text-color="grey-2" floating transparent>
              6
            </q-badge>
          </q-btn>
        </div>
      </div>
      <q-separator color="grey-14" class="q-my-md" size="2px" />
      <div class="fit row q-px-sm q-gutter-x-md">
        <div
          class="col row justify-between cursor-pointer bg-blue-grey-2 q-pa-md content-center shadow-5"
          style="border-radius: 15px"
          @click="handleClick('trending')"
        >
          <div class="column text-uppercase">
            <span class="text-subtitle2 text-grey-8">trend books</span>
            <span class="text-subtitle1 text-grey-10">20</span>
          </div>
          <q-img :src="TrendingBook" fit style="width: 30%" avatar />
        </div>
        <div
          class="col row justify-between cursor-pointer bg-blue-grey-2 q-pa-md content-center shadow-5"
          style="border-radius: 15px"
          @click="handleClick('onlines')"
        >
          <div class="column text-uppercase">
            <span class="text-subtitle2 text-grey-8">online </span>
            <span class="text-subtitle1 text-grey-10">105</span>
          </div>
          <q-img :src="Online" fit style="width: 30%" avatar />
        </div>
        <div
          class="col row justify-between cursor-pointer bg-blue-grey-2 q-pa-md content-center shadow-5"
          style="border-radius: 15px"
          @click="handleClick('new-registers')"
        >
          <div class="column text-uppercase">
            <span class="text-subtitle2 text-grey-8">new register</span>
            <span class="text-subtitle1 text-grey-10">9</span>
          </div>
          <q-img :src="NewRegister" fit style="width: 30%" avatar />
        </div>
        <div
          class="col row justify-between cursor-pointer bg-blue-grey-2 q-pa-md content-center shadow-5"
          style="border-radius: 15px"
          @click="handleClick('recent-visits')"
        >
          <div class="column text-uppercase">
            <span class="text-subtitle2 text-grey-8">recent visit</span>
            <span class="text-subtitle1 text-grey-10">120</span>
          </div>
          <q-img :src="MostVisit" fit style="width: 30%" avatar />
        </div>
      </div>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import TrendingBook from 'assets/desktop/trending.png';
import MostVisit from 'assets/desktop/most-visit.png';
import Online from 'assets/desktop/online.png';
import NewRegister from 'assets/desktop/new-register.png';
import { useRouter } from 'vue-router';

defineComponent({
  name: 'HomeLayout',
});

const router = useRouter();

const handleClick = (link: string) => {
  console.log(link);

  router.push(link);
};
</script>
