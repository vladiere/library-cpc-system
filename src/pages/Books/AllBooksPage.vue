<style lang="sass" >
.book-item
  height: 320px
  width: 240px
.my-book-card
  height: 320px
  width: 240px
  transform: scale(1.01)
  transition: 0.5s ease
  &:hover
    border-radius: 40px 2px 40px 2px
    box-shadow: 4px 4px 22px -2px rgba(0, 0, 0, 1)
  img
    height: calc(100% - 85px)
    object-fit: cover

.book-item-mobile
  height: 220px
  width: 150px
.onmobile-book-card
  height: 220px
  width: 150px
  transform: scale(1.01)
  img
    height: calc(100% - 85px)
    object-fit: cover

</style>

<template>
  <q-page class="column" >
    <div :class="!Platform.is.mobile ? 'column items-center q-my-xl q-gutter-y-md' : 'column items-center q-my-md q-gutter-y-sm'">
      <span :class="!Platform.is.mobile ? 'text-h3 text-weight-thin text-blue-9' : 'text-h4 text-weight-thin text-blue-9'">CPC Books we love</span>
      <span class="text-h6 text-weight-regualr text-blue-9">Favorite Reads!</span>
    </div>

    <q-separator size="2px" width="95%" class="self-center"/>

    <div :class="!Platform.is.mobile ? 'self-start q-ml-xl row q-gutter-x-md q-my-md' : 'self-start row q-gutter-x-xs q-my-sm q-ml-sm'">
      <span class="text-subtitle1 text-blue-9">Pages</span>
      <q-pagination
        v-model="current"
        :max="totalPages"
        :max-pages="!Platform.is.mobile ? 8 : 4"
        direction-links
        boundary-links
        icon-first="mdi-page-first"
        icon-last="mdi-page-last"
        icon-prev="mdi-chevron-left"
        icon-next="mdi-chevron-right"
      />
    </div>

    <q-separator size="2px" width="95%" class="self-center"/>

    <div :class="!Platform.is.mobile ? 'row q-gutter-lg justify-center text-capitalize q-mt-md' : 'row q-gutter-md justify-center text-capitalize q-mt-sm'">
      <q-intersection
        v-for="item in paginatedBooksList"
        :key="item.book_id"
        transition="rotate"
        :class="!Platform.is.mobile ? 'book-item' : 'book-item-mobile'"
        @click="gotoBookInfo(item.book_id)"
      >
        <AllBooksComponent v-bind="item" @click="gotoBookInfo(item.book_id)"/>
      </q-intersection>
   </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent, onMounted, onUnmounted, ref, computed } from 'vue';
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';
import { AllBooksListInterface } from 'components/Books/AllBooksComponent.vue';
import { useRouter } from 'vue-router';
import { Platform } from 'quasar';

defineComponent({
  name: 'AllBooksPage'
});

const AllBooksComponent = defineAsyncComponent({
  loader: () => import('components/Books/AllBooksComponent.vue'),
  delay: 500,
  timeout: 1300,
  suspensible: false
});

const userStore = useUserStore();
const current = ref(1);
const itemsPerPage = !Platform.is.mobile ? 25 : 10;
const booksData = ref<AllBooksListInterface>([]);
const totalPages = computed(() => Math.ceil(booksData.value.length / itemsPerPage));
const router = useRouter();


const getAllBooksList = async () => {
  try {

    const response = await api.post('/get/all/books/inventory', { limit: 0 }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });

    booksData.value = response.data;

  } catch (error) {
    throw error;
  }
};

const paginatedBooksList = computed(() => {
  const start = (current.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return booksData.value.slice(start, end);
});

const gotoBookInfo = (book_id: number, book_title: string) => {
  router.push({ path: '/book/info', query: { book_id } })
}

const checkIfImage = (img: string | null) => {
  if (img) {
    return `http://localhost:3000/images/${img}`
  } else {
    return 'https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg'
  }
}

onMounted(() => {
  getAllBooksList();
});

onUnmounted(() => {
  booksData.value = [];
})
</script>
