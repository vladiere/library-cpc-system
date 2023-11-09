
<template>
  <q-card :class="!Platform.is.mobile ? 'q-ma-sm my-book-card cursor-pointer' : ' onmobile-book-card cursor-pointer'">
    <img :src="checkIfImage(img_path)" :alt="author_name" :title="titleAndAuthor(title, author_name)" />
    <q-card-section>
      <q-item-label lines="2" :class="!Platform.is.mobile ? 'text-subtitle1' : ''">{{ title ? title : 'no book title available' }}</q-item-label>
      <q-item-label lines="1" class="text-caption">{{ author_name ? author_name : 'no author available' }}</q-item-label>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { Platform, format } from 'quasar'

const { capitalize } = format;

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
    author_name: 'not available',
    book_id: null,
    book_status: '',
    borrowed_copies: null,
    copies: null,
    cost_price: null,
    edition: '',
    publisher_name: '',
    title: 'not available',
    img_path: ''
});

const checkIfImage = (img: string | null) => {
  if (img) {
    return `http://localhost:3000/images/${img}`
  } else {
    return 'https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg'
  }
}

const titleAndAuthor = (title: string, author: string) => {
  if (title && author) {
    return capitalize(title) + " by " + capitalize(author);
  } else {
    return "Not title and author available";
  }
}

</script>
