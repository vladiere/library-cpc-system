<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
.on-notmobile
  height: 300px
  width: 290px
.on-mobile
  height: 230px
  width: 165px
</style>

<template>
  <div class="q-pa-md">
    <div v-if="myBooks.length === 0" :class="Platform.is.mobile ? 'q-mt-lg flex flex-center text-h5 text-grey-7 text-weight-light' : 'q-mt-xl flex flex-center text-h3 text-grey-7 text-weight-light'">
      No recent pending status
    </div>
    <div class="row justify-center q-gutter-sm q-mt-lg">
      <q-intersection
        v-for="index in myBooks"
        :key="index"
        transition="scale"
        :class="!Platform.is.mobile ? 'on-notmobile q-mb-md' : 'on-mobile'"
      >
        <q-card flat bordered>
          <q-img :src="checkIfImage(img_path)" />

          <q-card-section>
            <div class="text-subtitle1">{{ wordFormatter(index.title) }}</div>
            <div class="text-caption text-uppercase text-orange-10">{{ index.status }}</div>
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

const wordFormatter = (word_title: stirng) => format.capitalize(word_title);

onMounted(async() => {
  console.log(bookStore.getTransactionPending)
  if (myBooks.value.lenght === 0) {
    await mybooks.getTransactionPendingAndBooks();
  }

  bookStore.getTransactionPending.map((item: unknown) => {
    if (item.status === 'Pending') {
      myBooks.value = item;
    }
  });
});

</script>
