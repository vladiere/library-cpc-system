<template>
  <div class="q-mt-md column q-gutter-y-md q-px-md">
    <div v-if="myBooks.length === 0" class="fit column items-center content-center q-pb-md" >
      <q-img :src="EmptyBox" style="width: 10rem;"/>
      <span class="text-h6 text-grey-9">You do not have any History records here</span>
    </div>
    <div class="row q-gutter-md">
      <q-img
        v-for="item in myBooks"
        :key="item.user_id"
        :src="checkIfImage(item.img_path)"
        fit="fill"
        :style="Platform.is.mobile ? 'height: 180px; max-width: 150px; border-radius: 10px' : 'height: 280px; max-width: 210px; border-radius: 10px'"
      >
        <div class="absolute-bottom text-h6 flex flex-center text-bold text-amber-2">
          {{ item.status }}
        </div>
        <q-tooltip class="bg-grey-10 text-grey-2 text-capitalize" :delay="300">
          {{ item.title }}
        </q-tooltip>
      </q-img>
    </div>

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
      option: 'Approved',
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

onMounted(() => {
  getMyBooksTransaction();
})

onBeforeUnmount(() => {
  myBooks.value = [];
})
</script>
