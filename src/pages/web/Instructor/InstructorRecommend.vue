<style lang="scss">
.span-cursor span {
  cursor: pointer;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #212121; /* Change this to your preferred color */
    bottom: -2px;
    left: 0;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.3s ease-in-out;
  }

  &:hover::before {
    transform: scaleX(1);
  }
}
.see-all:hover {
  cursor: pointer;
  color: #212121;
}
</style>

<template>
  <q-page padding>
    <div
      class="q-mx-xl q-px-lg q-py-md bg-blue-grey-13"
      style="border-radius: 5px"
    >
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
        <q-separator vertical color="grey-9" class="q-mx-sm" />
        <div class="col-9">
          <router-view />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

defineComponent({
  name: 'InstructorRecommendPage',
});

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
