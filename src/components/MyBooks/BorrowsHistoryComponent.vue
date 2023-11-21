<style lang="sass" scoped >
.on-notmobile
  height: 295px
  width: 260px
.on-notmobile-card
  height: 295px
  width: 250px
  img
    height: calc(100% - 95px)
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
        <q-card bordered :class="!Platform.is.mobile ? 'q-ma-sm on-notmobile-card' : 'q-ma-sm on-mobile-card'">
          <img :src="checkIfImage(item.img_path)" />

          <q-card-section>
            <q-item-label lines="1" class="text-subtitle1">{{ item.title }}</q-item-label>
            <q-item-label lines="1" class="text-caption">by: {{ item.author_name }}</q-item-label>
            <div class="row justify-center text-bold text-h6">{{ item.transaction_type }}</div>
          </q-card-section>
        </q-card>
      </q-intersection>
    </div>

  <div v-if="myBooks.length === 0" class="fit column items-center content-center q-pb-md" >
    <q-img :src="EmptyBox" style="width: 10rem;"/>
    <span class="text-h6 text-grey-9">You do not have any History records here</span>
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

const myBooks = ref<IHistorybook>([]);
const mybookStore = useMybookStore();

const checkIfImage = (img: string | null) => {
  return img ? linkimg + img : DefaultImg;
}

onMounted(() => {
  myBooks.value = mybookStore.getTransactionBook;
})

</script>
