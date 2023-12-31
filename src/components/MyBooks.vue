<template>
  <div
    :class="$q.platform.is.mobile ? 'column' : 'column q-gutter-y-md q-ml-lg'"
  >
    <span class="text-h6 text-grey-9 self-center">My Books</span>
    <div class="col">
      <span class="text-subtitle1 text-grey-9 q-ml-md">Books you Borrowed</span>
      <div
        v-if="myBooks.length === 0"
        class="column content-center self-center q-gutter-y-md"
      >
        <q-img :src="ManEmpty" style="width: 15rem" />
        <span class="text-grey-9">There are no books in this shelf</span>
      </div>
      <q-scroll-area
        v-else
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        :style="
          $q.platform.is.mobile
            ? 'height: 400px; max-width: 100%;'
            : 'height: 70vh; max-width: 100%'
        "
      >
        <div
          :class="
            $q.platform.is.mobile
              ? ''
              : 'row items-center content-center text-capitalize'
          "
        >
          <q-img
            v-for="myBook in myBooks"
            :key="myBook.id"
            :src="myBook.link"
            spinner-color="white"
            style="height: 200px; max-width: 150px"
            :class="
              $q.platform.is.mobile
                ? 'cursor-pointer q-ma-sm'
                : 'q-ma-md cursor-pointer rounded-borders'
            "
            @click="gotoLink('/book')"
          >
            <div class="absolute-bottom text-subtitle1 text-center">
              {{ myBook.title }}
              <q-badge align="middle" :color="statusBook(myBook.status)">
                {{ myBook.status }}
              </q-badge>
            </div>
          </q-img>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import ManEmpty from 'assets/man-empty.png';
import { useQuasar } from 'quasar';

defineComponent({
  name: 'MyBooksPage',
});

const router = useRouter();
const $q = useQuasar();

interface MyBook {
  id: number;
  link: string;
  title: string;
  status: string;
}

const thumbStyle = ref({
  right: '4px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '5px',
  opacity: 0.75,
});

const barStyle = ref({
  right: '2px',
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '9px',
  opacity: 0.2,
});

const myBooks = ref<MyBook[]>([
  {
    id: 1,
    link: 'https://picsum.photos/200/300?random=1',
    title: 'The one',
    status: 'pending',
  },
  {
    id: 2,
    link: 'https://picsum.photos/200/300?random=2',
    title: 'The two',
    status: 'should return',
  },
  {
    id: 3,
    link: 'https://picsum.photos/200/300?random=3',
    title: 'The three',
    status: 'pending',
  },
  {
    id: 4,
    link: 'https://picsum.photos/200/300?random=4',
    title: 'The four',
    status: 'should return',
  },
  {
    id: 5,
    link: 'https://picsum.photos/200/300?random=5',
    title: 'the five',
    status: 'pending',
  },
  {
    id: 6,
    link: 'https://picsum.photos/200/300?random=6',
    title: 'the six',
    status: 'should return',
  },
  {
    id: 7,
    link: 'https://picsum.photos/200/300?random=7',
    title: 'the seven',
    status: 'pending',
  },
  {
    id: 8,
    link: 'https://picsum.photos/200/300?random=8',
    title: 'the eight',
    status: 'should return',
  },
  {
    id: 9,
    link: 'https://picsum.photos/200/300?random=9',
    title: 'the nine',
    status: 'pending',
  },
]);

const statusBook = (stat: string) => {
  if (stat === 'pending') {
    return 'teal';
  } else {
    return 'deep-orange-7';
  }
};

const gotoLink = (link: string) => {
  router.push(link);
};
</script>
