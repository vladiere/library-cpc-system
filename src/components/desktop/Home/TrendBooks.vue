<template>
  <div class="q-mt-md column">
    <span class="text-h5 q-pl-md" style="text-decoration: underline"
      >Top 5 Trending Books</span
    >
    <div
      v-if="recommendBooks.length === 0"
      class="column content-center items-center q-mt-md"
    >
      <q-img :src="ManEmpty" style="width: 15rem" />
      <span class="text-grey-9 text-h6">Empty trending Book</span>
    </div>
    <q-carousel
      v-else
      v-model="activeIndex"
      class="bg-blue-grey-4 rounded-borders shadow-13"
    >
      <q-carousel-slide
        v-for="(slideImages, index) in groupedImages"
        :name="index"
        :key="index"
        class="column no-wrap"
      >
        <div
          class="rounded-borders column full-height items-center justify-center text-capitalize"
        >
          <q-img
            v-for="bookRecommend in slideImages"
            :src="bookRecommend.imageUrl"
            class="rounded-borders q-mb-md"
            width="17%"
            :key="bookRecommend.id"
          >
            <div
              class="absolute-bottom text-subtitle1 text-center column content-center"
            >
              <span class="text-subtitle1 text-grey-2">{{
                bookRecommend.title
              }}</span>
            </div>
          </q-img>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, computed } from 'vue';
import ManEmpty from 'assets/man-empty.png';
import { useQuasar } from 'quasar';

defineComponent({
  name: 'TrendBooks',
});

const $q = useQuasar();
const activeIndex = ref(0);

interface RecommendBook {
  id: number;
  rating: number;
  imageUrl: string;
  title: string;
  description: string;
  author: string;
  publisher: string;
  date: string;
  value: string;
  book_stat: string;
}

const recommendBooks = ref<RecommendBook[]>([
  {
    id: 1,
    rating: 5,
    imageUrl: 'https://picsum.photos/200/300?random=1',
    title: 'The one',
    description:
      'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
    author: 'Author One',
    publisher: 'Publisher One',
    date: 'August 39, 2032',
    value: 'Php 589.75',
    book_stat: 'reserve',
  },
  {
    id: 2,
    rating: 4.97,
    imageUrl: 'https://picsum.photos/200/300?random=2',
    title: 'The two',
    description:
      'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
    author: 'Author Two',
    publisher: 'Publisher two',
    date: 'August 39, 2032',
    value: 'Php 589.75',
    book_stat: 'borrow',
  },
  {
    id: 3,
    rating: 4.76,
    imageUrl: 'https://picsum.photos/200/300?random=3',
    title: 'The three',
    description:
      'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
    author: 'Author three',
    publisher: 'Publisher three',
    date: 'August 39, 2032',
    value: 'Php 589.75',
    book_stat: 'reserve',
  },
  {
    id: 4,
    rating: 4.55,
    imageUrl: 'https://picsum.photos/200/300?random=4',
    title: 'The four',
    description:
      'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
    author: 'Author four',
    publisher: 'Publisher four',
    date: 'August 39, 2032',
    value: 'Php 589.75',
    book_stat: 'borrow',
  },
  {
    id: 5,
    rating: 4.35,
    imageUrl: 'https://picsum.photos/200/300?random=5',
    title: 'the five',
    description:
      'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
    author: 'Author five',
    publisher: 'Publisher five',
    date: 'August 39, 2032',
    value: 'Php 589.75',
    book_stat: 'reserve',
  },
]);

const groupedImages = computed(() => {
  const groupSize = 5; // Number of images in each slide
  const result = [];

  for (let i = 0; i < recommendBooks.value.length; i += groupSize) {
    result.push(recommendBooks.value.slice(i, i + groupSize));
  }

  return result;
});
</script>
