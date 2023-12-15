<style lang="sass" scoped>
.on-notmobile
  width: 100%
  max-width: 220px
  max-height: 240px

.on-mobile
  width: 100%
  height: 200px
</style>

<template>
  <q-page padding>
    <div v-if="myBooks.length === 0" :class="Platform.is.mobile ? 'q-mt-lg flex flex-center text-h5 text-grey-7 text-weight-light' : 'q-mt-xl flex flex-center text-h3 text-grey-7 text-weight-light'">
      No recent pending status
    </div>
    <div class="row justify-center q-gutter-md q-mt-lg">
        <q-img :src="checkIfImage(item.img_path)" :class="!Platform.is.mobile ? 'on-notmobile' : 'on-mobile'" v-for="item in myBooks" :key="item" fit="fill" style="border-radius: 5px">
          <div class="absolute-full text-subtitle2 flex flex-center column text-center">
            <div class="text-subtitle1 text-capitalize">{{item.title }}</div>
            <div class="text-subtitle2 text-uppercase text-orange-5">{{ item.status }}</div>
          </div>
        </q-img>
      <!-- </q-intersection> -->
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { onMounted, defineComponent, ref } from 'vue';
import { Platform, format } from 'quasar';
import { linkimg } from 'src/utils/links';
import DefaultImg from 'src/assets/no-image-available.jpeg';
import { useMybookStore } from 'stores/mybooks-store';
import mybooks from 'src/utils/Books/mybooks';
import { IPending } from 'src/utils/interface/transaction';

defineComponent({
  name: 'MyBooksPage'
})

const myBooks = ref<IPending>([]);
const bookStore = useMybookStore();

const checkIfImage = (img: string | null) => {
  return img ? linkimg + img : DefaultImg;
}

// const wordFormatter = (word_title: stirng) => format.capitalize(word_title);

onMounted(async() => {
  if (myBooks.value.length === 0) {
    await mybooks.getTransactionPendingAndBooks();
  }

  bookStore.getTransactionPending.forEach((item: unknown) => {
    if (item.status === 'Pending') {
      myBooks.value.push(item);
    }
  });
});

</script>
