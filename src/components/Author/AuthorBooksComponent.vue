<style lang="sass" scoped>
.my-card
  height: 290px
  width: 220px
  border-radius: 40px
  transition: all 0.5s cubic-bezier(0.79, 0.33, 0.14, 0.53)
  img
    height: calc(100% - 80px)
  &:hover
    border-radius: 5px
    box-shadow: 0px 0px 15px -1px rgba(0, 0, 0, 1)
.my-card-mobile
  height: 200px
  width: 150px
  img
    height: calc(100% - 80px)
</style>

<template>
   <q-card :class="!Platform.is.mobile ? 'my-card cursor-pointer' : 'my-card-mobile cursor-pointer'">
     <img :src="checkIfImage(img_path)">

     <q-card-section>
       <q-item-label lines="2" class="text-subtitle1 text-weight-light">{{ title }}</q-item-label>
     </q-card-section>
   </q-card>
</template>

<script setup lang="ts">
import { Platform } from 'quasar';
import { linkimg } from 'src/utils/links';
import DefaultImg from 'src/assets/no-image-available.png'

export interface AuthorBooksInterface {
  author_name: string | null;
  title: string;
  img_path: string | null;
}

withDefaults(defineProps<AuthorBooksInterface>(), {
  author_name: '',
  title: '',
  img_path: ''
})

const checkIfImage = (img: string | null) => {
  return img ? linkimg + img : DefaultImg;
}
</script>
