<style lang="sass" scoped>
$mobile: 576px
$tablet: 768px
$desktop: 992px
$large: 1200px

.book-container
  width: 400px
  height: 38vh
  border-radius: 5px

  .img-container
    position: relative

    img
      width: 100%
      position: absolute
      height: 220px
      max-width: 180px
      border-radius: 10px
      transition: 0.5s ease-in

      &:hover
        bottom: 5%
        box-shadow: 12px 15px 48px 1px rgba(66, 68, 90, 1)

    @media (max-width: $mobile)
      img
        height: 180px
</style>

<template>
  <div :class="Platform.is.mobile ? 'row q-gutter-x-md q-pa-sm bg-blue-1 book-container q-mb-md' : 'row q-gutter-x-md q-pa-md book-container q-mb-md bg-blue-1'">
    <div class="col img-container">
      <img :src="checkIfImage(img_path)"/>
    </div>
    <div class="col column q-gutter-y-md text-capitalize">
      <q-item-label lines="2" class="text-h6 text-blue-9">
        {{ title }}
      </q-item-label>
      <div class="text-subtitle2">
        {{ author_name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Platform } from 'quasar'

export interface AllBooksListInterface {
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

withDefaults(defineProps<AllBooksListInterface>(), {
    author_name: '',
    book_id: null,
    book_status: '',
    borrowed_copies: null,
    copies: null,
    cost_price: null,
    edition: '',
    publisher_name: '',
    title: '',
    img_path: ''
});

const checkIfImage = (img: string | null) => {
  if (img) {
    return `http://localhost:3000/images/${img}`
  } else {
    return 'https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg'
  }
}

</script>
