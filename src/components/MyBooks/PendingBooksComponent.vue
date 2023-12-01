<style lang="sass" scoped>
.on-notmobile
  height: 400px
  width: 260px

.on-notmobile-card
  height: 400px
  width: 250px
  img
    height: calc(100% - 60px)
</style>

<template>
  <div class="q-pa-md">
    <div v-if="myBooks.length === 0" :class="Platform.is.mobile ? 'q-mt-lg flex flex-center text-h5 text-grey-7 text-weight-light' : 'q-mt-xl flex flex-center text-h3 text-grey-7 text-weight-light'">
      No recent pending status
    </div>
    <div class="row justify-center q-gutter-sm q-mt-lg">
      <q-intersection
        v-for="item in myBooks"
        :key="item"
        transition="scale"
        :class="!Platform.is.mobile ? 'on-notmobile q-mb-md' : 'on-mobile'"
      >
        <q-card flat bordered>
          <q-img :src="checkIfImage(item.img_path)" />

          <q-card-section>
            <div class="text-subtitle1 text-capitalize">{{item.title }}</div>
            <div class="text-caption text-uppercase text-orange-10">{{ item.status }}</div>
         </q-card-section>
        </q-card>
      </q-intersection>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Platform, format } from 'quasar';
import { linkimg } from 'src/utils/links';
import DefaultImg from 'src/assets/no-image-available.jpeg';
import { useMybookStore } from 'stores/mybooks-store';
import mybooks from 'src/utils/Books/mybooks';
import { IPending } from 'src/utils/interface/transaction';

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
