<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 200px

  img
    width: 170px
    height: 210px
    border-radius: 5px
    transition: all 0.5s cubic-bezier(0.79, 0.33, 0.14, 0.53)
    object-fit: fill
    transform: scale(1.01)

    &:hover
      box-shadow: 4px 4px 22px -2px rgba(0, 0, 0, 1)

.mobile-card
  width: 100%
  max-width: 145px

  img
    height: 200px
    border-radius: 15px
    object-fit: fill
    transform: scale(1.01)
</style>

<template>
  <q-card :class="Platform.is.mobile ? 'mobile-card column items-center bg-transparent' : 'my-card bg-transparent column items-center'" flat square>
      <img :src="checkIfImage(img_path)" :alt="author_name" :title="titleAndAuthor(title, author_name)" class="shadow-1" >

      <q-card-section class="text-capitalize">
        <q-item-label lines="2" :class="Platform.is.mobile ? 'text-subtitle1 text-blue-9' : 'text-subtitle1 text-blue-9'">{{ title }}</q-item-label>
        <div class="text-body text-weight-light">{{ author_name || 'N/A' }}</div>
      </q-card-section>

    </q-card>
</template>

<script setup lang="ts">
  import { defineComponent } from 'vue';
  import { Platform, format } from 'quasar'
  import DefaultImg from 'src/assets/no-image-available.png'
  import { linkimg } from 'src/utils/links';

  defineComponent({
    name: 'BooksCard'
  });

  const { capitalize } = format;

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
    img_path: string | null;
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
  return img ? linkimg + img : DefaultImg;
}

const titleAndAuthor = (title: string, author: string) => {
  return (title && author) ? capitalize(title) + ' by ' + capitalize(author) : 'No title and author name available';
}
</script>
