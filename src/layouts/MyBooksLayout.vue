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
       <div :class="ifRoute === 'user_collections' ? 'bg-blue-7 text-grey-10 text-subtitle1 chips-menu' : 'bg-blue-2 chips-menu text-grey-10 text-subtitle1'" @click="gotoLink('/userbooks/collections')">
          My Collections
        </div>
        <div :class="ifRoute === 'user_borrow_history' ? 'bg-blue-7 text-grey-10 text-subtitle1 chips-menu' : 'bg-blue-2 chips-menu text-grey-10 text-subtitle1'" @click="gotoLink('/userbooks/borrowshistory')">
          Borrows History
        </div>
        <div :class="ifRoute === 'mylists' ? 'bg-blue-7 text-grey-10 text-subtitle1 chips-menu' : 'bg-blue-2 chips-menu text-grey-10 text-subtitle1'" @click="gotoLink('/userbooks/mylists')">
          My Lists
        </div>
        <div :class="ifRoute === 'recommendation' ? 'bg-blue-7 text-grey-10 text-subtitle1 chips-menu' : 'bg-blue-2 chips-menu text-grey-10 text-subtitle1'" @click="gotoLink('/userbooks/recommendation')">
          Personalize Recommendation
        </div>
      </div>
      <q-btn v-else class="self-start" flat no-caps icon="mdi-tune" label="Filters" color="grey-10" @click="showDialog = !showDialog"/>
     </q-header>

     <q-dialog
        v-model="showDialog"
        full-height
        full-width
      >
      Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
     </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Platform } from 'quasar';

defineComponent({
  name: 'MyBooksLayout',
});

const ifRoute = ref('');
const showDialog = ref(false);
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

onMounted(() => {
  ifRoute.value = router.currentRoute.value.name
})

watch(() => router.currentRoute.value.name, (newRouteName, oldRouteName) => {
  ifRoute.value = newRouteName
})
</script>
