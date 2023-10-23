<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 200px

  img
    width: 170px
    height: 210px
    border-radius: 15px
    transition: 300ms ease

    &:hover
      width: 180px
      height: 220px

.mobile-card
  width: 100%
  max-width: 145px

  img
    height: 200px
</style>

<template>
  <q-card :class="Platform.is.mobile ? 'mobile-card bg-transparent column items-center' : 'my-card bg-transparent column items-center'" flat square>
      <img :src="checkIfImage(img_path)" >

      <q-card-section class="text-capitalize">
        <q-item-label lines="2" :class="Platform.is.mobile ? 'text-subtitle1 text-blue-9' : 'text-h6 text-blue-9'">{{ title }}</q-item-label>
        <div class="text-subtitle2 text-weight-light">{{ author_name }}</div>
      </q-card-section>

    </q-card>
</template>

<script setup lang="ts">
  import { defineComponent } from 'vue';
  import { Platform } from 'quasar'

  defineComponent({
    name: 'BooksCard'
  })

  export interface AllBooksInterface {
    author_name: string;
    book_id: number;
    book_status: string;
    borrowed_copies: number;
    copies: number;
    cost_price: number;
    edition: string;
    publisher_name: string;
    title: string;
    img_path: string;
  }

  withDefaults(defineProps<AllBooksInterface>(), {
    author_name: '',
    book_id: 0,
    book_status: '',
    borrowed_copies: 0,
    copies: 0,
    cost_price: 0,
    edition: '',
    publisher_name: '',
    title: '',
    img_path: '',
  });

const checkIfImage = (img: string | null) => {
  if (img) {
    return `http://localhost:3000/images/${img}`
  } else {
    return 'https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg'
  }
}
</script>
