<template>
  <div
    :class="
      $q.platform.is.mobile
        ? 'text-capitalize'
        : 'q-ml-sm q-mt-md text-capitalize'
    "
  >
    <span
      :class="
        $q.platform.is.mobile ? 'text-subtitle1 q-ml-sm' : 'text-h5 q-mb-md'
      "
      style="text-decoration: underline"
      >Trending Books</span
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
      :arrows="!$q.platform.is.mobile"
      :swipeable="$q.platform.is.mobile"
      transition-prev="slide-prev"
      transition-next="slide-next"
      :control-color="!$q.platform.is.mobile ? 'dark' : ''"
      :control-type="!$q.platform.is.mobile ? 'regular' : undefined"
      :prev_icon="!$q.platform.is.mobile ? 'arrow_left' : ''"
      :height="$q.platform.is.mobile ? '160px' : '300px'"
      :next_icon="!$q.platform.is.mobile ? 'arrow_right' : ''"
      class="bg-grey-2"
    >
      <q-carousel-slide
        v-for="(slideImages, index) in groupedImages"
        :name="index"
        :key="index"
        :class="
          $q.platform.is.mobile
            ? 'flex q-pa-none q-ma-none q-ml-xs'
            : 'flex q-pa-none q-ma-none '
        "
      >
        <q-img
          v-for="bookRecommend in slideImages"
          :src="bookRecommend.imageUrl"
          fit="fill"
          class="cursor-pointer"
          :width="$q.platform.is.mobile ? '32%' : '20%'"
          :height="$q.platform.is.mobile ? '160px' : '300px'"
          :key="bookRecommend.id"
          @click="navigateToBookInfo"
        >
          <div class="absolute-bottom text-center column">
            <span
              :class="$q.platform.is.mobile ? '' : 'text-subtitle1 text-grey-2'"
              >{{ bookRecommend.title }}</span
            >
            <q-btn
              :label="bookRecommend.book_stat"
              color="blue-grey-8"
              text-color="text-grey-2"
              :padding="$q.platform.is.mobile ? '2px 4px' : '5px 10px'"
              dense
              :size="$q.platform.is.mobile ? 'xs' : ''"
            />
          </div>
        </q-img>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import ManEmpty from 'assets/man-empty.png';
import { useQuasar } from 'quasar';

defineComponent({
  name: 'RecommendBooks',
});

const props = defineProps<{
  count: number;
}>();

const router = useRouter();
const $q = useQuasar();
const activeIndex = ref(0);

interface RecommendBook {
  id: number;
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
  {
    id: 6,
    imageUrl: 'https://picsum.photos/200/300?random=6',
    title: 'the six',
    description:
      'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
    author: 'Author six',
    publisher: 'Publisher six',
    date: 'August 39, 2032',
    value: 'Php 589.75',
    book_stat: 'borrow',
  },
  {
    id: 7,
    imageUrl: 'https://picsum.photos/200/300?random=7',
    title: 'the seven',
    description:
      'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
    author: 'Author seven',
    publisher: 'Publisher seven',
    date: 'August 39, 2032',
    value: 'Php 589.75',
    book_stat: 'reserve',
  },
  {
    id: 8,
    imageUrl: 'https://picsum.photos/200/300?random=8',
    title: 'the eight',
    description:
      'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
    author: 'Author eight',
    publisher: 'Publisher eight',
    date: 'August 39, 2032',
    value: 'Php 589.75',
    book_stat: 'borrow',
  },
]);

const groupedImages = computed(() => {
  const groupSize = props.count; // Number of images in each slide
  const result = [];

  for (let i = 0; i < recommendBooks.value.length; i += groupSize) {
    result.push(recommendBooks.value.slice(i, i + groupSize));
  }

  return result;
});

const navigateToBookInfo = () => {
  router.push('book');
};
</script>
