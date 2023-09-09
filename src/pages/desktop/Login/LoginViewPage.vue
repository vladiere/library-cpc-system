<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Redressed&display=swap');
</style>

<template>
  <q-page class="relative-position">
    <q-img
      src="https://images.pexels.com/photos/3646105/pexels-photo-3646105.jpeg?auto=compress&cs=tinysrgb&w=600"
      fit="cover"
      height="100vh"
    />
    <div
      class="absolute-center bg-grey-2 q-pa-xl shadow-3 rounded-borders"
      style="width: 30%"
    >
      <div class="text-center q-gutter-lg">
        <div class="column items-center">
          <q-img :src="Logo" fit="cover" width="150px" />
          <div class="row justify-center items-center q-mt-md">
            <span class="text-h3" style="font-family: 'Redressed', cursive"
              >CPC</span
            >
            <small class="text-h5">Library</small>
          </div>
        </div>
        <q-form @submit.prevent="handleSubmit" class="column">
          <q-input
            square
            outlined
            color="grey-10"
            @update:model-value="validateInput(form, 'username')"
            @blur="validateInput(form, 'username')"
            :error="form.username.error"
            :error-message="form.username.msg"
            v-model="form.username.value"
            label="Username"
          />
          <div class="row justify-end q-pt-sm">
            <router-link
              to="/forgot-password"
              class="text-black"
              style="text-decoration: none"
            >
              Forgot Password
            </router-link>
          </div>
          <q-input
            square
            outlined
            class="q-my-md"
            color="grey-10"
            type="password"
            @update:model-value="validateInput(form, 'password')"
            @blur="validateInput(form, 'password')"
            :error="form.password.error"
            :error-message="form.password.msg"
            v-model="form.password.value"
            label="Password"
          />
          <q-btn
            label="Login"
            type="submit"
            flat
            style="width: 20%"
            :disable="!isSubmitBtn(form)"
          />
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import Logo from 'src/assets/logo.png';
import { User } from 'src/models/desktop/user';
import { useRouter } from 'vue-router';
import LoginHook from 'src/controllers/desktopHooks/LoginController';

defineComponent({
  name: 'LoginViewPage',
});

const router = useRouter();
const { isFormValid, validateInput, isSubmitBtn } = LoginHook();

const form = ref<User>({
  username: {
    value: '',
    error: false,
    msg: '',
    required: true,
  },
  password: {
    value: '',
    error: false,
    msg: '',
    required: true,
  },
});

const handleSubmit = () => {
  console.log(form.value);
  router.push('/home');
};
</script>
