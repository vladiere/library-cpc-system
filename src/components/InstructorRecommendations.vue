<style lang="sass" scoped>
.on-mobile
  height: 200px
  max-width: 150px
.on-notmobile
  height: 240px
  max-width: 200px
</style>

<template>
  <div class="column q-gutter-y-md q-ml-md">
    <span class="text-h6 text-grey-9 self-center"
      >Instructor Recommendations</span
    >
    <div class="col">
      <div
        v-if="myBooks.length === 0"
        class="column content-center self-center q-gutter-y-md"
      >
        <q-img :src="ManEmpty" style="width: 15rem" />
        <span class="text-grey-9">There are no books in this shelf</span>
      </div>
      <div class="row justify-center q-gutter-sm">
        <q-intersection
          v-for="myBook in myBooks"
          :key="myBook.id"
          :class=" Platform.is.mobile ? 'q-ma-sm on-mobile' : 'on-notmobile q-ma-md cursor-pointer rounded-borders ' "
          transition="scale"
        >
          <q-img
              :src="myBook.link"
              spinner-color="primary"
            >
              <div class="absolute-bottom column text-subtitle1 text-center" >
                {{ myBook.title }}
                <span class="text-caption">by: {{ myBook.recommendedBy }}</span>
              </div>
            </q-img>
        </q-intersection>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import ManEmpty from 'assets/man-empty.png';
import { Platform } from 'quasar';

defineComponent({
  name: 'MyBooksPage',
});

const router = useRouter();

interface MyBook {
  id: number;
  link: string;
  title: string;
  recommendedBy: string;
}

const myBooks = ref<MyBook[]>([
  {
    id: 1,
    link: 'https://picsum.photos/200/300?random=1',
    title: 'The one',
    recommendedBy: 'pending',
  },
  {
    id: 2,
    link: 'https://picsum.photos/200/300?random=2',
    title: 'The two',
    recommendedBy: 'should return',
  },
  {
    id: 3,
    link: 'https://picsum.photos/200/300?random=3',
    title: 'The three',
    recommendedBy: 'pending',
  },
  {
    id: 4,
    link: 'https://picsum.photos/200/300?random=4',
    title: 'The four',
    recommendedBy: 'should return',
  },
  {
    id: 5,
    link: 'https://picsum.photos/200/300?random=5',
    title: 'the five',
    recommendedBy: 'pending',
  },
  {
    id: 6,
    link: 'https://picsum.photos/200/300?random=6',
    title: 'the six',
    recommendedBy: 'should return',
  },
  {
    id: 7,
    link: 'https://picsum.photos/200/300?random=7',
    title: 'the seven',
    recommendedBy: 'pending',
  },
  {
    id: 8,
    link: 'https://picsum.photos/200/300?random=8',
    title: 'the eight',
    recommendedBy: 'should return',
  },
  {
    id: 9,
    link: 'https://picsum.photos/200/300?random=9',
    title: 'the nine',
    recommendedBy: 'pending',
  },
]);

const gotoLink = (link: string) => {
  router.push(link);
};
</script>
