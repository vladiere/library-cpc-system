<template>
  <div
    :class="
      Platform.is.mobile ? 'column q-pa-md' : 'column fullscreen relative'
    "
  >
    <div v-if="!Platform.is.mobile" class="col-4 bg-blue-8 q-pa-md">
      <span
        class="text-h2 text-bold text-grey-1"
        style="
          font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
            'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        "
        >CPC Library</span
      >
    </div>
    <div
      :class="
        Platform.is.mobile
          ? ''
          : 'col absolute-center flex flex-center q-pa-md bg-grey-2 fullscreen shadow-8'
      "
      style="height: 450px; border-radius: 15px !important"
    >
      <q-form
        greedy
        @submit.prevent="handleClick('reset')"
        class="column q-gutter-y-md"
        :style="Platform.is.mobile ? 'margin-top: 3em' : 'width: 400px'"
      >
        <q-img :src="ForgotPass" width="20%" class="self-center" fit="cover" />
        <span class="text-h6 text-bold text-uppercase self-center"
          >Forget Password</span
        >
        <span class="text-grey-7 text-center"
          >Provide you account's email for which you want to reset your
          password!</span
        >
        <q-input
          label="Email Address"
          type="email"
          outlined
          square
          v-model="form.email"
          lazy-rules
          :rules="validateEmail"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
        <q-btn label="reset password" :loading="isLoading" square color="blue-7" type="submit"/>
        <span v-if="!isLoading" class="cursor-pointer flex flex-center" @click="handleClick('login')" >
          <q-icon name="arrow_back_ios" /> Back to Login</span>
      </q-form>
    </div>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="mdi-email-check-outline" color="primary" text-color="white" />
            <span class="q-ml-sm">{{ prompt_message }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Confirm" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import ForgotPass from 'src/assets/forgotpass.png';
import { Platform, debounce } from 'quasar';
import { useRouter } from 'vue-router';
import { notApi } from 'boot/axios';

defineComponent({
  name: 'ForgotPassword',
});

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isLoading = ref(false);
const router = useRouter();
const confirm = ref(false);
const prompt_message = ref('');
const form = ref({
  email: '',
});

const sendResetPasswordRequest = debounce(async () => {
  try {
    const response = await notApi.post('/send/email', { email_address: form.value.email });

    if (response.status === 200) {
      confirm.value = true;
      isLoading.value = false;
      prompt_message.value = response.data.message;
    }
  } catch (error) {
    throw error;
  }
},1500);

const handleClick = async (option: string) => {
  try {
    if (option === 'login') {
      router.push('/');
    } else {
      isLoading.value = true;
      await sendResetPasswordRequest();
    }
  } catch (error) {
    throw error;
  }
};

const validateEmail = ref([
  (val: string) => (val && val.length > 0) || 'Please enter your Email Address',
  (val: string) => emailRegex.test(val) || 'Email is not valid',
]);
</script>
