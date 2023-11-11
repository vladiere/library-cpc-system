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
import { onMounted, onBeforeUnmount, ref } from 'vue'
import EmptyBox from 'assets/empty-folder.png'
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';
import jwt_decode from 'jwt-decode';
import { Platform } from 'quasar';
import DefaultImg from 'src/assets/no-image-available.jpeg'
import { linkimg } from 'src/utils/links';

const userStore = useUserStore();
const myBooks = ref([]);
const decoded = jwt_decode(userStore.token);

const getMyBooksTransaction = async () => {
  try {
    const response = await api.post('/user/get/borrowed/books',
    {
      option: 'all',
      user_id: decoded.user_id
    }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });
    myBooks.value = [];
    myBooks.value = response.data;
  } catch (error) {
    throw error;
  }
}

const checkIfImage = (img: string | null) => {
  return img ? linkimg + img : DefaultImg;
}

onMounted(async () => {
  await getMyBooksTransaction();
})

onBeforeUnmount(() => {
  myBooks.value = [];
})
</script>
