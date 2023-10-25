<style lang="sass" scoped>
$mobile: 576px
$tablet: 768px
$desktop: 992px
$large: 1200px

.book-container
  width: 240px
  height: 50vh
  border-radius: 5px

  .img-container
    position: relative
    margin-top: 1em

    img
      width: 100%
      position: absolute
      height: 220px
      max-width: 190px
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
  <div class="column q-mb-xl book-container">
    <div class="col img-container">
      <img :src="checkIfImage(img_path)" />
    </div>
    <div class="q-pt-md column q-gutter-sm text-capitalize">
      <q-item-label lines="2" class="text-h6 text-blue-9 text-weight-light">
        {{ title }}
      </q-item-label>
      <div class="text-subtitle1 text-grey-7">
        {{ author_name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

export interface AuthorBooksInterface {
  author_name: string;
  title: string;
  img_path: string;
}

withDefaults(defineProps<AuthorBooksInterface>(), {
  author_name: '',
  title: '',
  img_path: ''
})

const checkIfImage = (img: string | null) => {
  if (img) {
    return `http://localhost:3000/images/${img}`
  } else {
    return 'https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg'
  }
}
</script>
