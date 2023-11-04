<style lang="sass" scoped>
.q-mtt-xl
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
  <div class="row q-gutter-x-xl q-mtt-xl q-ml-xl">
      <div class="col column q-gutter-y-md left-container">
        <img :src="checkIfImage(img_path)" class="shadow-2"/>

        <q-btn label="reserve" color="primary" :disable="borrowed_copies === 0">
          <q-tooltip class="bg-grey-10 text-grey-2" :delay="300">
            Reserve this book
          </q-tooltip>
        </q-btn>

        <div class="row q-gutter-x-md justify-center">
          <q-icon name="mdi-bookmark-plus" size="3em" color="blue-9" class="cursor-pointer" @click="handleClickActions('add-collections', book_id)">
            <q-tooltip :delay="300" class="bg-grey-10 text-grey-2">
              Add to collections
            </q-tooltip>
          </q-icon>
          <q-btn :label="borrowed_copies === 0 ? 'Hold' : 'Borrow'" color="blue-9" padding="5px 20px" @click="handleClickActions('action-btn', book_id, borrowed_copies)"/>
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
          <span class="text-h6 text-blue-9">4.5</span>
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
            <span class="text-blue-9 text-subtitle1">{{ borrowed_copies !== 0 ? 'Available' : 'No Copies available'}}</span>
          </div>
          <div v-if="borrowed_copies === 0" class="col row q-gutter-x-sm text-h3 text-weight-light">
            <span class="text-blue">No more copies Available</span>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="dialog.show" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
            <span class="q-ml-sm">{{ dialog.message }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Confirm" color="primary" @click="handleBtnActions('confirm')" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from 'src/stores/user-store';
import jwt_decode from 'jwt-decode';
import { api } from 'src/boot/axios';
import { socket } from 'src/utils/socket'
import { Notify } from 'quasar'
import { useRouter } from 'vue-router'


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

const router = useRouter()
const quality = ref(0);
const userStore = useUserStore();
const decoded = jwt_decode(userStore.token);
const dialog = ref({
  show: false,
  message: '',
})

const handleClickActions = async (actions: string, book_id: number, copies?: number) => {
  if (actions === 'action-btn') {
    const transaction_type = copies === 0 ? 'Held' : 'Borrowed';
    const response = await api.post('/transaction/insert', { book_id: book_id, user_id: decoded.user_id, transaction_type: transaction_type }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });
    socket.emit("notifications", decoded.user_id);
    if (response.data.status === 201) {
      dialog.value.show = true;
      dialog.value.message = response.data.message + ' Do you want to check your books of borrowed history?';
    } else if (response.data.status === 409) {
      Notify.create({
        message: response.data.message + ' Check your borrowed book history',
        type: 'warning',
        timeout: 2300,
        position: 'top-right'
      })
    }
  }
};

const handleBtnActions = (btn_action?: string) => {
  if ( btn_action === 'confirm') {
    router.push('/userbooks')
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
