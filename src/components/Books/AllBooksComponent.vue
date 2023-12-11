
<template>
  <q-card :class="!Platform.is.mobile ? 'q-ma-sm my-book-card cursor-pointer relative-position' : 'relative-position onmobile-book-card cursor-pointer'">
    <img :src="checkIfImage(img_path)" :alt="author_name" :title="titleAndAuthor(title, author_name)" />
    <q-card-section>
      <q-item-label lines="2" :class="!Platform.is.mobile ? 'text-subtitle1' : ''">{{ title ? title : 'no book title available' }}</q-item-label>
      <q-item-label lines="1" class="text-caption">{{ author_name ? author_name : 'no author available' }}</q-item-label>

    </q-card-section>
    <div class="absolute-top-right q-ma-sm text-subtitle1 row items-center" >
         <q-icon size="1.5em" name="mdi-star" color="orange-9" v-for="count in calculateLogRating(total_checkedout)" :key="count" />
         <q-icon size="1.5em" name="mdi-star-outline" color="orange-9" v-if="calculateLogRating(total_checkedout) === 0" />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { Platform, format } from 'quasar';
import DefaultImg from 'src/assets/no-image-available.png';
import { linkimg } from 'src/utils/links';

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
  img_path: string | null;
  total_checkedout: number;
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
    img_path: '',
    total_checkedout: null
});

const calculateLogRating = (downloadCount: number) => {
  return Math.ceil(Math.log10(downloadCount + 1));
}

const checkIfImage = (img: string | null) => {
  return img ? linkimg + '/' + img : DefaultImg;
}

const titleAndAuthor = (title: string, author: string) => {
  return (title && author) ? capitalize(title) + ' by ' + capitalize(author) : 'No title and author available';
}

</script>
