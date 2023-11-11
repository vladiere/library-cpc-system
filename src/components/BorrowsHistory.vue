<style lang="sass" scoped>
.on-notmobile
  height: 335px
  width: 330px
.on-mobile
  height: 235px
  width: 170px
</style>

<template>
  <div class="q-mt-md column q-gutter-y-md q-px-md">
    <div v-if="myBooks.length === 0" class="fit column items-center content-center q-pb-md" >
      <q-img :src="EmptyBox" style="width: 10rem;"/>
      <span class="text-h6 text-grey-9">You do not have any History records here</span>
    </div>
    <!-- <div class="row q-gutter-md"> -->
    <!--   <q-img -->
    <!--     v-for="item in myBooks" -->
    <!--     :key="item.user_id" -->
    <!--     :src="checkIfImage(item.img_path)" -->
    <!--     fit="fill" -->
    <!--     :style="Platform.is.mobile ? 'height: 180px; max-width: 150px; border-radius: 10px' : 'height: 280px; max-width: 210px; border-radius: 10px'" -->
    <!--   > -->
    <!--     <div class="absolute-bottom text-h6 flex flex-center text-bold text-amber-2"> -->
    <!--       {{ item.status }} -->
    <!--     </div> -->
    <!--     <q-tooltip class="bg-grey-10 text-grey-2 text-capitalize" :delay="300"> -->
    <!--       {{ item.title }} -->
    <!--     </q-tooltip> -->
    <!--   </q-img> -->
    <!-- </div> -->
    <div class="row justify-center q-gutter-sm q-pt-md">
      <q-intersection
        v-for="item in myBooks"
        :key="item.user_id"
        transition="scale"
        :class="!Platform.is.mobile ? 'on-notmobile' : 'on-mobile'"
      >
        <q-card flat bordered>
          <q-img :src="checkIfImage(item.img_path)" />

          <q-card-section>
            <div class="text-subtitle1">{{ item.title }}</div>
            <div class="text-caption">by John Doe</div>
            <div class="row justify-between">
              <q-btn label="Reserve" color="primary" rounded />
              <q-btn
                flat
                icon="mdi-information-outline"
                color="dark"
                round
                to="/book"
              >
                <q-tooltip class="bg-grey-8 text-grey-3"
                  >Book Information</q-tooltip
                >
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </q-intersection>
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
import { linkimg } from 'src/utils/links';
import DefaultImg from 'src/assets/no-image-available.jpeg'

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
  return img ? linkimg + '/' + img : DefaultImg;
}

onMounted(async () => {
  await getMyBooksTransaction();
})

onBeforeUnmount(() => {
  myBooks.value = [];
})
</script>
