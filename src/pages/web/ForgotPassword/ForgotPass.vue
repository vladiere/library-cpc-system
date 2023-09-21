<template>
  <div
    :class="
      $q.platform.is.mobile ? 'column q-pa-md' : 'column fullscreen relative'
    "
  >
    <div v-if="!$q.platform.is.mobile" class="col-4 bg-blue-10 q-pa-md">
      <span
        class="text-h3 text-bold text-grey-1"
        style="
          font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
            'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        "
        >CPC Library</span
      >
    </div>
    <div
      :class="
        $q.platform.is.mobile
          ? ''
          : 'col absolute-center flex flex-center q-pa-md bg-grey-2 fullscreen shadow-8'
      "
      style="height: 450px; border-radius: 15px !important"
    >
      <div
        class="column q-gutter-y-md"
        :style="$q.platform.is.mobile ? '' : 'width: 400px'"
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
        <q-btn label="next" square color="blue-7" />
        <span class="cursor-pointer flex flex-center"
          ><q-icon name="arrow_back_ios" /> Back to Login</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import ForgotPass from 'src/assets/forgotpass.png';
import { useQuasar } from 'quasar';

defineComponent({
  name: 'ForgotPassword',
});

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const form = ref({
  email: '',
});
const $q = useQuasar();

const validateEmail = ref([
  (val: string) => (val && val.length > 0) || 'Please enter your Email Address',
  (val: string) => emailRegex.test(val) || 'Email is not valid',
]);
</script>
