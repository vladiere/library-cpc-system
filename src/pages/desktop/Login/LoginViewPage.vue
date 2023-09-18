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
          <q-img
            :src="Logo"
            fit="cover"
            width="45%"
            style="border-radius: 50%"
          />
          <div class="row justify-center items-center q-mt-md text-blue-10">
            <span
              class="text-h3 text-weight-bolder"
              style="font-family: 'Redressed', cursive"
              >CPC</span
            >
            <small class="text-h5">Library</small>
          </div>
        </div>
        <q-form @submit.prevent="handleSubmit" class="column">
          <q-input
            square
            outlined
            color="blue-10"
            label-color="blue-10"
            @update:model-value="validateInput(form, 'username')"
            @blur="validateInput(form, 'username')"
            :error="form.username.error"
            :error-message="form.username.msg"
            v-model="form.username.value"
            label="Username"
          />
          <q-input
            square
            outlined
            class="q-my-md"
            color="blue-10"
            label-color="blue-10"
            :type="isPwd ? 'password' : 'text'"
            @update:model-value="validateInput(form, 'password')"
            @blur="validateInput(form, 'password')"
            :error="form.password.error"
            :error-message="form.password.msg"
            v-model="form.password.value"
            label="Password"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-btn
            label="Login"
            type="submit"
            color="blue-10"
            :disable="!isSubmitBtn(form)"
          />
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import Logo from 'src/assets/librarylogo.png';
import { User } from 'src/models/desktop/user';
import { useRouter } from 'vue-router';
import LoginHook from 'src/controllers/desktopHooks/LoginController';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import { useUserStore } from 'stores/user';

defineComponent({
  name: 'LoginViewPage',
});

const router = useRouter();
const $q = useQuasar();
const isPwd = ref(true);

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

const handleSubmit = async () => {
  if (!isFormValid) return false;

  try {
    const response = await api.post('login', {
      username: form.value.username.value,
      password: form.value.password.value,
    });

    const userData = response.data.user;
    const userStore = useUserStore();
    userStore.initUser(userData);

    router.push('/home');
  } catch (error: any) {
    console.error('Failed', error.response.data);
    $q.notify({
      position: 'top',
      message: error.response.data.message,
      color: 'negative',
      timeout: 3000,
    });
  }
};
</script>
