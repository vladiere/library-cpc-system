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
import { useRouter } from 'vue-router'
import EmptyBox from 'assets/empty-folder.png'
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';
import jwt_decode from 'jwt-decode';
import { Platform } from 'quasar';

const userStore = useUserStore();
const myBooks = ref([]);
const decoded = jwt_decode(userStore.token);

const getMyBooksTransaction = async () => {
  try {
    const response = await api.post("/user/get/borrowed/books",
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
  if (img) {
    return `http://localhost:3000/images/${img}`
  } else {
    return 'https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg'
  }
}

const checkStatusAndTransactionType = (transaction_status: string, transaction_type: string) => {
  if (transaction_status === 'Pending') {
    return transaction_status;
  } else if (transaction_status === 'Active'){
    return transaction_type;
  }
}

onMounted(() => {
  getMyBooksTransaction();
})

onBeforeUnmount(() => {
  myBooks.value = [];
})
</script>
