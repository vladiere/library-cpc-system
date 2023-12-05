<style lang="sass" scoped >
.on-notmobile
  max-height: 400px
  width: 260px
.on-notmobile-card
  max-height: 420px
  width: 250px
  img
    height: calc(100% - 60px)
.on-mobile
  height: 235px
  width: 160px
.on-mobile-card
  height: 235px
  width: 160px
  img
    height: calc(100% - 95px)
</style>

<template>
    <div v-if="Platform.is.mobile" class="row justify-center q-gutter-sm q-pt-md text-capitalize">
      <q-list bordered class="rounded-borders" style="width: 95%">
        <q-expansion-item
          expand-separator
          v-for="item in myBooks"
          :key="item"
          icon="mdi-information"
          :label="item.title"
          :header-class="(checkDueDate(item.due_date) && item.status === 'Active') ? 'bg-warning text-dark' : ''"
          style="text-overflow: ellipsis; overflow:hidden;"
          :caption="item.author_name"
        >
          <q-card flat class="bg-transparent row q-mt-sm">
            <q-card-section class="q-pt-none">
              <div class="row q-gutter-x-md">
                <img :src="checkIfImage(item.img_path)" class="col" style="width: 100%">
                <div class="col column">
                  <span class="text-caption">Due date</span>
                  <span class="text-caption">{{ item.due_date }}</span>
                  <div class="row justify-center text-h6 text-weight-light text-blue-8 q-mt-sm">{{ checkDueDate(item.due_date) ? 'Overdue' : item.transaction_type }}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>

    <div v-if="!Platform.is.mobile"  class="row justify-center q-gutter-sm q-pt-md text-capitalize">
      <q-intersection
        transition="scale"
        v-for="item in myBooks"
        :key="item"
        :class="!Platform.is.mobile ? 'on-notmobile q-mb-lg' : 'on-mobile'"
      >
        <q-card bordered :class="!Platform.is.mobile ? 'q-ma-sm on-notmobile-card relevant-position' : 'q-ma-sm relevant-position on-mobile-card'">
          <q-img spinner-color="primary" :src="checkIfImage(item.img_path)" class="q-mb-sm" height="235px" fit="fill" >
            <div class="absolute-full text-h6 text-blue-1 text-bold flex flex-center" v-if="checkDueDate(item.due_date) && item.status === 'Active'" >
              Overdue please return
            </div>
          </q-img>

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
                  <div class="row justify-center text-h6 text-weight-light text-blue-8 q-mt-sm">{{ item.transaction_type }}</div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-btn class="absolute-top-right q-ma-sm" label="renew" flat dense color="blue-8" v-if="!checkDueDate(item.due_date) && item.transaction_type !== 'Returned'" @click="handleShowDialog(item.transaction_id)">
              <q-tooltip class="bg-grey-10 text-grey-2" :delay="200">renew this book</q-tooltip>
            </q-btn>
        </q-card>
      </q-intersection>
    </div>

  <div v-if="myBooks.length === 0" :class="Platform.is.mobile ? 'q-mt-lg flex flex-center text-center text-h5 text-grey-7 text-weight-light' : 'q-mt-xl flex flex-center text-h3 text-grey-7 text-weight-light'">
      You do not have any History records here
  </div>

  <q-dialog v-model="showDateDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Enter number of dates</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="date_number" :disable="isLoading" autofocus @keyup.enter="handleRenewalBook" lazy-rules :error="errorMap.error" :error-message="errorMap.message" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary" v-if="!isLoading">
        <q-btn flat label="Cancel" v-close-popup @click="date_number = null" />
        <q-btn flat label="Add date" @click="handleRenewalBook" />
      </q-card-actions>

      <q-card-section align="center" v-if="isLoading">
        <q-spinner-tail
          color="primary"
          size="2em"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Platform, debounce, Notify } from 'quasar';
import DefaultImg from 'src/assets/no-image-available.jpeg'
import { linkimg } from 'src/utils/links';
import { useMybookStore } from 'stores/mybooks-store';
import { IHistorybook } from 'src/utils/interface/transaction';
import mybooks from 'src/utils/Books/mybooks';
import { api } from 'boot/axios';
import { useUserStore } from 'stores/user-store';

const myBooks = ref<IHistorybook>([]);
const mybookStore = useMybookStore();
const showDateDialog = ref(false);
const userStore = useUserStore();
const isLoading = ref(false);
const tempTransaction_id = ref(null);
const date_number = ref(null);
const errorMap = ref({
  error: false,
  message: '',
})

const checkIfImage = (img: string | null) => {
  return img ? linkimg + img : DefaultImg;
}

const handleShowDialog = (transaction_id: number) => {
  showDateDialog.value = true;
  tempTransaction_id.value = transaction_id;
}

const sendRenewalDate = debounce(async(number_date: number, transaction_id: number) => {
  try {
    const response = await api.post('/transaction/renew/book', { number_date: number_date, transaction_id: transaction_id }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });
    if (response.status === 200) {
      showDateDialog.value = false;
      date_number.value = null;
      Notify.create({
        message: response.data.message,
        position: 'top',
        progress: true,
        type: response.data.status === 200 || 201 ? 'positive' : 'warning',
        timeout: 2300
      });
    } else {
      showDateDialog.value = false;
      date_number.value = null;
      Notify.create({
        message: 'Something went wrong.',
        position: 'top',
        type: 'negative',
        timeout: 2300,
        progress: true
      })
    }
  } catch (error) {
    throw error;
  } finally {
    showDateDialog.value = false;
    isLoading.value = false;
    date_number.value = null;
  }
}, 1500);

const handleRenewalBook = async () => {
  try {
    if (date_number.value) {
      if (date_number.value <= 3) {
        isLoading.value = true;
        await sendRenewalDate(date_number.value,tempTransaction_id.value);
      } else {
        errorMap.value.error = true;
        errorMap.value.message = 'Number of date must be less than 3';
      }
    } else {
      errorMap.value.error = true;
      errorMap.value.message = 'Enter number of date';
    }
  } catch (error) {
    throw error;
  }
}

const checkDueDate = (due_date: string) => {
  // Parse the due date string into a Date object
  const duedate = new Date(due_date);
  // Get the current date
  const currentDate = new Date();
  // Compare the input date with the current date
  return (duedate < currentDate);
}

onMounted(async() => {
  isLoading.value = true;

  if (myBooks.value.length === 0) {
    await mybooks.getTransactionPendingAndBooks();
  }
  myBooks.value = await mybookStore.getTransactionBook;
})

</script>
