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
  <div :class="!Platform.is.mobile ? 'row q-mt-xl q-ml-xl q-pl-xl' : 'q-ml-lg'">
    <q-btn icon="mdi-backspace" to="/book/collections" color="primary" flat>
      <q-tooltip class="bg-grey-10 text-grey-2" :delay="300">return to the previous page</q-tooltip>
    </q-btn>
  </div>
  <div :class="!Platform.is.mobile ? 'row q-gutter-x-xl q-mt-lg q-ml-xl' : 'column q-gutter-y-sm items-center q-mt-md'">
      <div :class="!Platform.is.mobile ? 'col column q-gutter-y-md left-container' : 'onmobile'">
        <img :src="checkIfImage(props.img_path)" class="shadow-2"/>
      </div>
      <div :class="!Platform.is.mobile ? 'col column q-gutter-y-md' : 'col column q-gutter-y-sm'">
        <span :class="!Platform.is.mobile ? 'text-h4 text-capitalize text-blue-9 text-weight-light' : 'text-h6 text-capitalize text-blue-9 text-weight-light'">{{ props.title }}</span>
        <span :class="!Platform.is.mobile ? 'text-h6 text-capitalize q-mt-lg text-weight-light' : 'text-subtitle1 text-weight-light text-capitalize'">
          by
          <span class="text-underline">{{ props.author_name || 'No author available' }}</span>
        </span>
        <div :class="!Platform.is.mobile ? 'row q-gutter-x-md items-center text-h6' : 'row q-gutter-x-sm items-center'">
          <q-icon size="1.5em" name="mdi-star" color="orange-9" v-for="count in calculateLogRating(total_checkedout)" :key="count" />
          <q-icon size="1.5em" name="mdi-star-outline" color="orange-9" v-if="calculateLogRating(total_checkedout) === 0" />
          {{ calculateLogRating(props.total_checkedout) }}
        </div>
        <div :class="!Platform.is.mobile ? 'column q-gutter-y-md q-mt-lg-i text-h6 text-weight-light' : 'column q-gutter-y-sm text-subtitle1 text-weight-light'">
          <div class="col row q-gutter-x-sm">
            <span>Edition:</span>
            <span>{{ props.edition ? props.edition : '--' }}</span>
          </div>
          <div class="col row q-gutter-x-sm">
            <span>Publisher:</span>
            <span class="text-capitalize">{{ props.publisher_name }}</span>
          </div>
          <div class="col row q-gutter-x-sm items-center">
            <span>Copies:</span>
            <span>{{ props.borrowed_copies}}</span>
            <span class="text-blue-9 text-subtitle1">{{ props.borrowed_copies !== 0 ? 'Available' : 'No Copies available'}}</span>
          </div>
          <div v-if="borrowed_copies === 0" class="col row q-gutter-x-sm text-h3 text-weight-light">
            <span class="text-blue">No more copies Available</span>
          </div>
        </div>

        <div class="row q-gutter-x-md">
          <q-btn :loading="isLoading" label="reserve" color="primary" :disable="props.borrowed_copies === 0" @click="handleClickActions('reserve', props.book_id)">
            <q-tooltip class="bg-grey-10 text-grey-2 text-lowercase" :delay="300">
              Reserve this book
            </q-tooltip>
          </q-btn>

          <q-btn :loading="isLoading" :label="borrowed_copies === 0 ? 'Hold' : 'Borrow'" color="blue-9" padding="5px 20px" @click="handleClickActions('action-btn', props.book_id, props.borrowed_copies)">
            <q-tooltip class="bg-grey-10 text-grey-2 text-lowercase">{{ props.borrowed_copies === 0 ? 'Hold this book' : 'Borrow this book' }}</q-tooltip>
          </q-btn>
          <q-btn :loading="isLoading" flat dense icon="mdi-plus-box-outline" color="grey-9" v-if="decoded.privilege !== 'student'" @click="handleAddRecommendation(props.book_id)">
            <q-tooltip class="bg-grey-10 text-grey-2 text-lowercase" :delay="300">add to your recommendations</q-tooltip>
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
import { jwtDecode } from 'jwt-decode';
import { api } from 'src/boot/axios';
import { socket } from 'src/utils/socket'
import { Notify, Platform, debounce } from 'quasar'
import { useRouter } from 'vue-router'
import DefaultImg from 'src/assets/no-image-available.jpeg'
import { linkimg } from 'src/utils/links';
import { useMybookStore } from 'stores/mybooks-store';
import { useBooksStore } from 'stores/books-store';
import { useRecommendationStore } from 'stores/recommendation-store';

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
  total_checkedout: number;
}

const props = withDefaults(defineProps<BookInfoInterface>(), {
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
  total_checkedout: null,
});

const router = useRouter()
const userStore = useUserStore();
const mybookStore = useMybookStore();
const isLoading = ref(false);
const bookStore = useBooksStore();
const recommendationStore = useRecommendationStore();
const decoded = jwtDecode(userStore.token);
const dialog = ref({
  show: false,
  message: '',
});

const addNewTransactionPending = (book_id: number, transaction_type: string) => {
    mybookStore.addTransactionPending({
      pending_transaction_id: 1,
      user_id: decoded.user_id,
      fullname: userStore.getUserData.fullname,
      transaction_type: transaction_type,
      status: 'Pending',
      request_date: Date.now(),
      approve_date: '',
      img_path: props.img_path
    })
}

const sendTransaction = debounce(async (book_id: number, transaction_type: string) => {
  try {
    const response = await api.post('/transaction/insert', { book_id: book_id, user_id: decoded.user_id, transaction_type: transaction_type }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });
    socket.emit('notifications', decoded.user_id);
    if (response.data.status === 201) {
      addNewTransactionPending(book_id,transaction_type);
      dialog.value.show = true;
      dialog.value.message = ' Do you want to check your books of borrowed history?';
    } else {
      addNewTransactionPending(book_id,transaction_type);
      Notify.create({
        message: response.data.message + ' Check your borrowed book history',
        type: 'warning',
        progress: true,
        timeout: 3100,
        position: 'top'
      })
    }
  } catch (error) {
    throw error;
  } finaly {
    isLoading.value = false;
  }
}, 1000);

const addTomyRecommendations = debounce(async (book_id: number) => {
  try {
    const response = await api.post('/instructor/add/recommendations', { user_id: decoded.user_id, book_id: book_id }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });

    if (response.status === 200) {
      if (response.data.status === 201) {
        Notify.create({
          message: response.data.message,
          type: 'positive',
          position: 'top',
          progress: true,
          timeout: 2300
        });
      } else if (response.data.status === 409) {
        Notify.create({
          message: response.data.message,
          type: 'warning',
          position: 'top',
          progress: true,
          timeout: 2300
        });
      }
    } else {
      throw new Error(response);
    }
  } catch (error) {
    throw error;
  } finally {
    isLoading.value = false;
  }
}, 1000);

const handleAddRecommendation = async (book_id: number) => {
  try {
    isLoading.value = true;
    await addTomyRecommendations(book_id);
    const newBookRecommend = bookStore.getBookById(book_id);
    recommendationStore.addRecommendation(newBookRecommend);
  } catch (error) {
    throw error;
  }
}

const handleClickActions = async (actions: string, book_id: number, copies?: number) => {
  let transaction_type = '';
  if (actions === 'action-btn') {
    transaction_type = copies === 0 ? 'Held' : 'Borrowed';
  } else if (actions === 'reserve') {
    transaction_type = 'Reserved';
  }
  isLoading.value = true;
  await sendTransaction(book_id,transaction_type);
};

const calculateLogRating = (downloadCount: number) => {
  return Math.ceil(Math.log10(downloadCount + 1));
}

const handleBtnActions = (btn_action?: string) => {
  if ( btn_action === 'confirm') {
    router.push('/userbooks')
  }
}

const checkIfImage = (img: string | null) => {
  return img ? linkimg + img : DefaultImg;
}
</script>
