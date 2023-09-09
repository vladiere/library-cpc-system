<style lang="scss">
.other-link span:nth-child(2):hover {
  font-style: italic;
  color: rgb(72, 72, 202) !important;
  text-decoration: underline !important;
  cursor: pointer;
}
</style>

<template>
  <q-page class="bg-primary">
    <div class="row">
      <div class="col-12 col-md-4 col-lg-4 q-px-xl">
        <div class="q-mt-lg text-center">
          <q-img :src="Logo" fit="fill" width="50%" />
        </div>
        <div
          :class="
            $q.platform.is.mobile
              ? 'text-h4 text-bold text-center q-mt-md'
              : 'text-h3 text-bold text-center q-mt-lg'
          "
        >
          CPC E-Library
        </div>
        <div class="column q-mt-md">
          <q-form @submit.prevent="submitForm" class="column">
            <q-input
              :debounce="1000"
              outlined
              color="teal-6"
              @update:model-value="validateInput(form, 'email')"
              @blur="validateInput(form, 'email')"
              :error="form.email.error"
              :error-message="form.email.msg"
              v-model="form.email.value"
              label="Email"
              for="email"
            >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>
            <div
              class="row justify-end items-center q-mb-md q-mt-none cursor-pointer other-link"
            >
              <span
                @click="gotoLink('/forgot-password')"
                :class="
                  $q.platform.is.mobile
                    ? 'text-subtitle2 text-dark'
                    : 'text-subtitle1 text-dark'
                "
                style="text-decoration: none"
                >Forgot Password?</span
              >
            </div>
            <q-input
              :debounce="1000"
              outlined
              @update:model-value="validateInput(form, 'password')"
              @blur="validateInput(form, 'password')"
              color="teal-6"
              :type="isPwd ? 'text' : 'password'"
              :error="form.password.error"
              :error-message="form.password.msg"
              v-model="form.password.value"
              label="Password"
              for="password"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="!isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <div class="column q-my-md">
              <q-btn
                label="Signin"
                :color="!isSubmitBtn(form) ? 'blue-grey-2' : 'teal-7'"
                :text-color="!isSubmitBtn(form) ? 'black' : 'grey-1'"
                type="submit"
                :disable="!isSubmitBtn(form)"
                style="width: 35%"
              />
            </div>
          </q-form>
          <div class="row other-link">
            <span class="text-subtitle1 q-mr-xs"
              >Don't have an account yet?</span
            >
            <span
              @click="gotoLink('/register')"
              :class="
                $q.platform.is.mobile
                  ? 'text-subtitle2 text-dark'
                  : 'text-subtitle1 text-dark'
              "
              style="text-decoration: none"
              >Signup Now</span
            >
          </div>
        </div>
      </div>
      <div
        :class="
          $q.platform.is.mobile
            ? 'hidden'
            : 'col-12 col-md-8 col-lg-8 q-pa-none'
        "
      >
        <q-img :src="BgImg" fit="cover" height="100vh" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import LoginHook from 'src/controllers/hooks/LoginHook';
import { defineComponent, ref } from 'vue';
import { User } from 'src/models/web/users';
import Logo from '/src/assets/logo.png';
import BgImg from 'src/assets/bg.svg';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

defineComponent({
  name: 'LoginViewPage',
});

const isPwd = ref(false);
const { isFormValid, validateInput, isSubmitBtn } = LoginHook();
const $q = useQuasar();
const router = useRouter();

const form = ref<User>({
  email: {
    value: '',
    email: true,
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

const submitForm = () => {
  if (!isFormValid) return false;
};

const gotoLink = (link: string) => {
  router.push(link);
};
</script>
