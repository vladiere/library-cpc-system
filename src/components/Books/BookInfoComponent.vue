<style lang="sass" scoped>
.q-mt-xl
  margin-top: 6em

.q-mt-lg-i
  margin-top: 3em

.left-container
  width: 100%
  max-width: 380px

  img
    width: 100%
    height: 420px
    border-radius: 5px

.text-underline
  text-decoration: underline
</style>

<template>
  <div class="row q-gutter-x-xl q-mt-xl q-ml-xl">
      <div class="col column q-gutter-y-md left-container">
        <img :src="checkIfImage(img_path)" class="shadow-2"/>

        <div class="row q-gutter-x-md justify-center">
          <q-icon name="mdi-bookmark-plus" size="3em" color="blue-9" class="cursor-pointer" @click="handleClickActions('add-collections', book_id)">
            <q-tooltip :delay="300" class="bg-grey-10 text-grey-2">
              Add to collections
            </q-tooltip>
          </q-icon>
          <q-btn :disable="borrowed_copies === 0" :label="borrowed_copies === 0 ? 'Not Available' : 'Reserve'" color="blue-9" padding="5px 20px" @click="handleClickActions('reserve', book_id)"/>
          <q-icon name="mdi-plus-box" size="3em" color="blue-9" class="cursor-pointer" @click="handleClickActions('add-list', book_id)">
            <q-tooltip :delay="300" class="bg-grey-10 text-grey-2">
              Add to list
            </q-tooltip>
          </q-icon>
        </div>
      </div>
      <div class="col column q-gutter-y-md">
        <span class="text-h4 text-capitalize text-blue-9 text-weight-light">{{ title }}</span>
        <span class="text-h6 text-capitalize q-mt-lg text-weight-light">
          by
          <span class="text-underline">{{ author_name }}</span>
        </span>
        <div class="row q-gutter-x-md">
          <q-rating
            name="quality"
            v-model="quality"
            max="5"
            size="2em"
            color="blue-9"
            icon="star_border"
            icon-selected="star"
            no-dimming
          />
          <span class="text-h6">4.5</span>
        </div>
        <div class="column q-gutter-y-md q-mt-lg-i text-h6 text-weight-light">
          <div class="col row q-gutter-x-sm">
            <span>Edition:</span>
            <span>{{ edition ? edition : '--' }}</span>
          </div>
          <div class="col row q-gutter-x-sm">
            <span>Publisher:</span>
            <span class="text-capitalize">{{ publisher_name }}</span>
          </div>
          <div class="col row q-gutter-x-sm items-center">
            <span>Copies:</span>
            <span>{{ borrowed_copies}}</span>
            <span class="text-blue-9 text-subtitle1">(Available)</span>
          </div>
          <div v-if="borrowed_copies === 0" class="col row q-gutter-x-sm text-h2">
            <span class="text-blue">Not Available</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from 'src/stores/user-store';
import jwt_decode from 'jwt-decode';
import { api } from 'src/boot/axios';

export interface BookInfoInterface {
  book_id: number;
  author_name: string;
  title: string;
  edition: string;
  publisher_name: string;
  cost_price: number;
  copies: number;
  borrowed_copies: number;
  book_status: string;
  img_path: string;
}

withDefaults(defineProps<BookInfoInterface>(), {
  book_id: null,
  author_name: '',
  title: '',
  edition: '',
  publisher_name: '',
  cost_price: null,
  copies: null,
  borrowed_copies: null,
  book_status: '',
  img_path: '',
});

const quality = ref(0);
const userStore = useUserStore();
const decoded = jwt_decode(userStore.token);

const handleClickActions = async (actions: string, book_id: number) => {
  if (actions === 'reserve') {
    const result = await api.post('/transaction/insert', { book_id: book_id, user_id: decoded.user_id, transaction_type: 'Reserved' }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });

    console.log(result);
  }
}

const checkIfImage = (img: string | null) => {
  if (img) {
    return `http://localhost:3000/images/${img}`
  } else {
    return 'https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg'
  }
}
</script>
