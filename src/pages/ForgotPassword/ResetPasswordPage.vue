<template>
  <q-page padding class="bg-grey-2">
    <div class="column items-center justify-center fullscreen">
      <div class="absolute" :style="!Platform.is.mobile ? 'top: 6%;right: 18%;z-index: 10000' : 'z-index: 999;top:6%; transform: translateX(30.5%)'">
        <img :src="appLogo" :style="!Platform.is.mobile ? 'width: 35%' : 'width: 40%'"/>
      </div>
      <q-form
        greedy
        @submit.prevent="handleClick"
        class="bg-grey-4 shadow-5 column justify-center q-gutter-y-md q-pa-lg q-pt-xl"
        :style="!Platform.is.mobile ? 'padding-top: 5em;width: 37%; border-radius: 15px' : 'width: 90%; border-radius: 5px'"
      >
        <q-input
          color="grey-10"
          bg-color="grey-4"
          outlined
          label="New password"
          v-model="resetPass.new_pass"
          :type="!isNewPass ? 'password' : 'text'"
          lazy-rules
          :rules="[
            val => val && val.length > 0 || '* Require new password',
            val => val.length > 1 && val.length > 8 || 'Must be at least 9 characters',
            val => passwordRegex.test(val) || 'Must be at least one special characters'
          ]"
        >
          <template v-slot:append>
            <q-icon :name="isNewPass ? 'mdi-eye' : 'mdi-eye-off'" @click="isNewPass = !isNewPass" class="cursor-pointer"/>
          </template>
        </q-input>
        <q-input
          color="grey-10"
          bg-color="grey-4"
          :type="!isConfirmPass ? 'password' : 'text'"
          outlined
          label="Confirm new password"
          v-model="resetPass.confirm_pass"
          lazy-rules
          :rules="[
            val => val && val.length > 0 || '* Require confirm your new password',
            val => (val === resetPass.new_pass) || 'Password does not match'
          ]"
        >
          <template v-slot:append>
            <q-icon :name="isConfirmPass ? 'mdi-eye' : 'mdi-eye-off'" @click="isConfirmPass = !isConfirmPass" class="cursor-pointer"/>
          </template>
        </q-input>
        <div :class="!Platform.is.mobile ? 'row justify-between' : 'column justify-center q-gutter-y-md'">
          <q-btn rounded color="teal-6" type="submit" label="Reset password" />
          <q-btn flat dense label="Back to login" to="/"/>
        </div>
      </q-form>
    </div>
    <div v-if="icon" class="fullscreen bg-blue-2 flex flex-center text-center column ">
      <span class="text-h4 text-grey-7">{{ message }}</span>
      <router-link to="/" style="text-decoration: none" class="text-h6 text-primary q-mt-xl">Sign in Now!</router-link>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import appLogo from 'src/assets/applogo.png';
import { Platform, debounce } from 'quasar';
import { notApi } from 'boot/axios';
import { SpinnerFacebook } from 'src/utils/loading';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'vue-router';

defineComponent({
  name: 'ResetPasswordPage'
});

const router = useRouter()
const icon = ref(false);
const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
const isNewPass = ref(false);
const isConfirmPass = ref(false);
const message = ref('')
const resetPass = ref({
  new_pass: '',
  confirm_pass: ''
});
const decoded = ref(null);
const resetToken = ref('');

const sendResetPassword = debounce(async() => {
  try {
    const response = await notApi.post('/reset/password', { email: decoded.value.email, password: resetPass.value.new_pass }, {
      headers: {
        Authorization: `Bearer ${router.currentRoute.value.query.reset}`
      }
    });
    if (response.status) {
      resetPass.value.new_pass = '';
      resetPass.value.confirm_pass = '';
      icon.value = true;
      message.value = response.data.message;
    }
  } catch (error) {
    throw error;
  } finally {
    SpinnerFacebook(false);
  }
}, 1500);

const handleClick = async() => {
  try {
    SpinnerFacebook(true, 'Loading...') ;
    await sendResetPassword();
  } catch (error) {
    throw error;
  }
}

onMounted(() => {
  resetToken.value = router.currentRoute.value.query.reset;
  decoded.value = jwtDecode(resetToken.value);
})
</script>
