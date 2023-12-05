<template>
  <q-page padding>
    <div class=" q-pa-md bg-blue-2 q-gutter-md q-pb-lg" :style="!Platform.is.mobile ? 'margin: 2em 10em 0px 10rem' : ''">
      <div :class="!Platform.is.mobile ? 'row' : 'column'">
        <div :class="!Platform.is.mobile ? 'column col q-gutter-y-md' : 'column'">
          <div class="column">
              <div :class="!Platform.is.mobile ? 'text-capitalize text-h4 text-weight-bold' : 'text-capitalize text-h5 '"> {{ userData.fullname }} </div>
              <div class="text-capitalize">
                Joined {{ userData.created_at }}
              </div>
          </div>

          <div class="column q-ml-sm q-mt-xl">
            <div class="text-subtitle1 text-weight-light row q-gutter-x-sm">Email: <p>{{ userData.email_address }}</p></div>
            <div class="text-subtitle1 text-weight-light row q-gutter-x-sm">ID Number: <p>{{ userData.id_number }}</p></div>
            <div class="text-subtitle1 text-weight-light row q-gutter-x-sm">Department: <p class="text-uppercase">{{ userData.department }}</p></div>
            <div class="text-subtitle1 text-weight-light row q-gutter-x-sm">Fines and fees due: <p>{{ userData.total_amount ? addCommas(userData.total_amount) : 0 }}</p></div>
          </div>

          <div class="text-h4 column text-grey-9 q-mt-lg">
            Reading Log
            <q-btn flat no-caps rounded to="/userbooks" label="See my books" size="lg" padding="2px 5px" class="self-start" />
          </div>
        </div>
        <div class="column justify-center q-gutter-y-md col text-h6 text-weight-light q-mt-lg">
          <span class="text-h5">Random quotes</span>
          <span>
            {{ quotes.quote }}
          </span>
          <span class="self-end">
            by: {{ quotes.author }}
          </span>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, defineAsyncComponent } from 'vue';
import { Platform } from 'quasar';
import { useUserStore } from 'stores/user-store';
import { IUser } from 'src/utils/interface/user';
import { api } from 'boot/axios';

defineComponent({
  name: 'UserProfilePage',
});

type QuoteType = {
  author: string;
  quote: string;
}

const userStore = useUserStore();
const userData = ref<UserData>({});
const quotes = ref<QuoteType>([]);

const addCommas = (number: number): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const getQoutes = async () => {
  try {
    fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
      .then(response => response.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);

        quotes.value = data[randomIndex];
      });
  } catch (error) {
    throw error;
  }
}

onMounted(async () => {
  userData.value = userStore.getUserData[0]
  await getQoutes();
})
</script>
