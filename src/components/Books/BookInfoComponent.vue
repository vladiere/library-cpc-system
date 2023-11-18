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

.onmobile
  width: 100%
  max-width: 280px

  img
    width: 100%
    height: 280px
    border-radius: 5px

.text-underline
  text-decoration: underline
</style>

<template>
  <div :class="!Platform.is.mobile ? 'row q-gutter-x-xl q-mtt-xl q-ml-xl' : 'column q-gutter-y-sm items-center q-mt-lg'">
      <div :class="!Platform.is.mobile ? 'col column q-gutter-y-md left-container' : 'onmobile'">
        <img :src="checkIfImage(img_path)" class="shadow-2"/>
      </div>
      <div :class="!Platform.is.mobile ? 'col column q-gutter-y-md' : 'col column q-gutter-y-sm'">
        <span :class="!Platform.is.mobile ? 'text-h4 text-capitalize text-blue-9 text-weight-light' : 'text-h6 text-capitalize text-blue-9 text-weight-light'">{{ title }}</span>
        <span :class="!Platform.is.mobile ? 'text-h6 text-capitalize q-mt-lg text-weight-light' : 'text-subtitle1 text-weight-light text-capitalize'">
          by
          <span class="text-underline">{{ author_name || 'No author available' }}</span>
        </span>
        <div :class="!Platform.is.mobile ? 'row q-gutter-x-md' : 'row q-gutter-x-sm'">
          <q-rating
            name="quality"
            v-model="quality"
            max="5"
            :size="!Platform.is.mobile ? '2em' : '20px'"
            color="blue-9"
            icon="star_border"
            icon-selected="star"
            no-dimming
          />
          <span class="text-h6 text-blue-9">4.5</span>
        </div>
        <div :class="!Platform.is.mobile ? 'column q-gutter-y-md q-mt-lg-i text-h6 text-weight-light' : 'column q-gutter-y-sm text-subtitle1 text-weight-light'">
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

        <div class="row q-gutter-x-md">
        <q-btn label="reserve" color="primary" :disable="borrowed_copies === 0">
          <q-tooltip class="bg-grey-10 text-grey-2" :delay="300">
            Reserve this book
          </q-tooltip>
        </q-btn>

        <q-btn :label="borrowed_copies === 0 ? 'Hold' : 'Borrow'" color="blue-9" padding="5px 20px" @click="handleClickActions('action-btn', book_id, borrowed_copies)">
          <q-tooltip class="bg-grey-10 text-grey-2">{{ borrowed_copies === 0 ? 'Hold this book' : 'Borrow this book' }}</q-tooltip>
        </q-btn>
        </div>
      </div>
    </div>
    <q-dialog v-model="dialog.show" persistent>
      <q-card>
        <q-card-section class="row items-center">
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
import { Notify, Platform } from 'quasar'
import { useRouter } from 'vue-router'
import DefaultImg from 'src/assets/no-image-available.jpeg'
import { linkimg } from 'src/utils/links';


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
  img_path: string | null;
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
    socket.emit('notifications', decoded.user_id);
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
  return img ? linkimg + img : DefaultImg;
}
</script>
