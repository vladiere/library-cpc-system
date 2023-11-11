<style lang="sass" scoped>
.chips-menu
  padding: 5px 10px
  border-radius: 10px
  cursor: pointer
  transition: 0.5s ease-in

  &:hover
    background-color: #1e88e5 !important
</style>

<template>
  <q-layout>
    <q-header class="bg-grey-2 column justify-center">
      <div v-if="!Platform.is.mobile" class="q-mt-md row justify-center q-gutter-x-md relative-position">
       <div :class="ifRoute === 'mybooks' ? 'bg-blue-7 text-grey-10 text-subtitle1 chips-menu' : 'bg-blue-2 chips-menu text-grey-10 text-subtitle1'" @click="gotoLink('/userbooks')">
          My Books
        </div>
        <div :class="ifRoute === 'user_borrow_history' ? 'bg-blue-7 text-grey-10 text-subtitle1 chips-menu' : 'bg-blue-2 chips-menu text-grey-10 text-subtitle1'" @click="gotoLink('/userbooks/borrowshistory')">
          Borrows History
        </div>
        <div :class="ifRoute === 'recommendation' ? 'bg-blue-7 text-grey-10 text-subtitle1 chips-menu' : 'bg-blue-2 chips-menu text-grey-10 text-subtitle1'" @click="gotoLink('/userbooks/recommendation')">
          Personalize Recommendation
        </div>
        <div :class="ifRoute === 'contributions' ? 'bg-blue-7 text-grey-10 text-subtitle1 chips-menu' : 'bg-blue-2 chips-menu text-grey-10 text-subtitle1'" @click="gotoLink('/contribute/list')">
          My Contributions
        </div>
      </div>
      <q-btn v-else class="self-start" flat no-caps icon="mdi-tune" label="Filters" color="grey-10" @click="showDialog = !showDialog"/>
     </q-header>

     <q-dialog
        v-model="showDialog"
        full-width
      >
      <div class="q-mt-md column justify-center q-gutter-y-sm relative-position">
       <div :class="ifRoute === 'mybooks' ? 'bg-blue-7 text-grey-10 text-subtitle1 chips-menu' : 'bg-blue-2 chips-menu text-grey-10 text-subtitle1'" @click="gotoLink('/userbooks')">
          My Books
        </div>
        <div :class="ifRoute === 'user_borrow_history' ? 'bg-blue-7 text-grey-10 text-subtitle1 chips-menu' : 'bg-blue-2 chips-menu text-grey-10 text-subtitle1'" @click="gotoLink('/userbooks/borrowshistory')">
          Borrows History
        </div>
        <div :class="ifRoute === 'recommendation' ? 'bg-blue-7 text-grey-10 text-subtitle1 chips-menu' : 'bg-blue-2 chips-menu text-grey-10 text-subtitle1'" @click="gotoLink('/userbooks/recommendation')">
          Personalize Recommendation
        </div>
      </div>
     </q-dialog>

    <q-page-container>
      <router-view v-if="!isRouteLoading"/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Platform } from 'quasar';
import { SpinnerFacebook } from 'src/utils/loading';

defineComponent({
  name: 'MyBooksLayout',
});

const ifRoute = ref('');
const isRouteLoading = ref(false);
const showDialog = ref(false);
const router = useRouter();

const gotoLink = (link: string) => {
  router.push(link);
};

onMounted(() => {
  ifRoute.value = router.currentRoute.value.name
})

watch(() => router.currentRoute.value.name, (newRouteName) => {
  ifRoute.value = newRouteName
})

watch(() => router.currentRoute.value, () => {
  isRouteLoading.value = true;
  SpinnerFacebook(isRouteLoading.value, 'Loading...');

  setTimeout(() => {
    isRouteLoading.value = false;
    SpinnerFacebook(isRouteLoading.value);
  }, 1000);
})
</script>
