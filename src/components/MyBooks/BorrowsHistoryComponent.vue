<style lang="sass" scoped >
.on-notmobile
  max-height: 400px
  width: 260px
.on-notmobile-card
  max-height: 400px
  width: 250px
  img
    height: calc(100% - 60px)
.on-mobile
  height: 235px
  width: 170px
.on-mobile-card
  height: 235px
  width: 170px
  img
    height: calc(100% - 95px)
</style>

<template>
    <div class="row q-gutter-sm q-pt-md text-capitalize">
      <q-intersection
        v-for="item in myBooks"
        :key="item"
        transition="scale"
        :class="!Platform.is.mobile ? 'on-notmobile' : 'on-mobile'"
      >
        <q-card bordered :class="!Platform.is.mobile ? 'q-ma-sm on-notmobile-card q-py-sm' : 'q-ma-sm on-mobile-card'">
          <img :src="checkIfImage(item.img_path)" class="q-mb-sm" />

            <q-expansion-item
              icon="mdi-information-variant"
              dense
              dense-toggle
              label="Show more"
            >
              <q-card class="q-px-sm">
                <q-card-section>
                  <q-separator class="q-mb-md"/>
                  <q-item-label lines="2" class="text-subtitle1">{{ item.title }}</q-item-label>
                  <q-item-label lines="1" class="text-caption">by: {{ item.author_name }}</q-item-label>
                  <q-item-label lines="1" class="text-caption">Due date: {{ item.due_date }}</q-item-label>
                  <div class="row justify-center text-h6 text-weight-light text-blue-8">{{ item.transaction_type }}</div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
        </q-card>
      </q-intersection>
    </div>

  <div v-if="myBooks.length === 0" :class="Platform.is.mobile ? 'q-mt-lg flex flex-center text-center text-h5 text-grey-7 text-weight-light' : 'q-mt-xl flex flex-center text-h3 text-grey-7 text-weight-light'">
      You do not have any History records here
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import EmptyBox from 'assets/empty-folder.png'
import { Platform } from 'quasar';
import DefaultImg from 'src/assets/no-image-available.jpeg'
import { linkimg } from 'src/utils/links';
import { useMybookStore } from 'stores/mybooks-store';
import { IHistorybook } from 'src/utils/interface/transaction';
import mybooks from 'src/utils/Books/mybooks';

const myBooks = ref<IHistorybook>([]);
const mybookStore = useMybookStore();

const checkIfImage = (img: string | null) => {
  return img ? linkimg + img : DefaultImg;
}

onMounted(async() => {
  if (myBooks.value.length === 0) {
    await mybooks.getTransactionPendingAndBooks();
  }
  myBooks.value = mybookStore.getTransactionBook;
})

</script>
