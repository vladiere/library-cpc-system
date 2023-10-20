<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');

.other-link {
  font-size: 16px;
}

.other-link span:nth-child(2) {
  font-size: 18px;
  font-weight: 700;
}

.other-link span:nth-child(2):hover {
  font-style: italic;
  color: rgb(72, 72, 202) !important;
  text-decoration: underline !important;
  cursor: pointer;
}

.hover-input:hover {
  box-shadow: 1px 1px 4px 2px rgba(30, 136, 229, 1);
}
</style>

<template>
  <q-page>
    <div
      :class="Platform.is.mobile ? 'column q-pt-lg q-gutter-y-md' : 'row'"
      :style="
        Platform.is.mobile ? '' : 'border: 1px solid #000; height: 100vh'
      "
    >
      <div
        :class="
          Platform.is.mobile
            ? 'q-px-md'
            : 'col-4 column q-px-lg justify-center'
        "
      >
        <div
          :class="
            Platform.is.mobile
              ? 'column items-center content-center q-gutter-y-md q-pb-lg'
              : 'col-4 column justify-center content-center'
          "
        >
          <q-img
            :src="Logo"
            fit="contain"
            width="50%"
            style="border-radius: 50%"
          />
          <span
            :class="
              Platform.is.mobile
                ? 'text-bold text-h3 text-blue-10'
                : 'hidden'
            "
            >CPC Library</span
          >
        </div>
        <div
          :class="
            Platform.is.mobile
              ? 'other-link text-bold text-grey-10'
              : 'row other-link text-weight-bolder'
          "
        >
          <span
            :class="
              Platform.is.mobile ? 'q-mr-xs' : 'text-subtitle1 q-mr-xs'
            "
            >Don't have an account?</span
          >
          <span
            @click="gotoLink('/register')"
            class="text-subtitle1 text-blue-7"
            style="text-decoration: none"
            >Signup Now</span
          >
        </div>
        <div class="column q-mt-md">
          <q-form
            @submit.prevent="submitForm"
            greedy
            class="column q-gutter-y-md"
          >
            <q-input
              :debounce="1000"
              outlined
              color="blue-7"
              v-model="form.email"
              label="Email address"
              type="email"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Enter your email address',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>
            <q-input
              :debounce="1000"
              outlined
              color="blue-7"
              :type="isPwd ? 'text' : 'password'"
              v-model="form.password"
              label="Password"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Enter your password',
              ]"
            >
              <template v-slot:prepend>
                <q-icon :name="isPwd ? 'lock_open' : 'lock'" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="!isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <div
              :class="
                Platform.is.mobile
                  ? 'column fit'
                  : 'row q-my-md justify-between'
              "
            >
              <q-btn
                label="Login"
                color="primary"
                :size="Platform.is.mobile ? '20px' : ''"
                type="submit"
                class="col-3"
                style="border-radius: 8px"
              />

              <span
                @click="gotoLink('/forgot-password')"
                :class="
                  Platform.is.mobile
                    ? 'text-h6 text-grey-10 self-center q-pt-xl cursor-pointer'
                    : 'text-subtitle1 text-dark cursor-pointer'
                "
                style="text-decoration: none"
                >Forgot Password?</span
              >
            </div>
          </q-form>
        </div>
      </div>
      <div :class="Platform.is.mobile ? 'hidden' : 'col row relative'">
        <div class="absolute-center q-ml-xl">
          <span
            class="text-weight-bolder text-blue-10"
            style="
              font-size: 5rem;
              font-family: system-ui, -apple-system, BlinkMacSystemFont,
                'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
                'Helvetica Neue', sans-serif;
            "
            >CPC Library</span
          >
          <div
            class="col column q-ml-md text-h5 text-left"
            style="font-family: 'Indie Flower', cursive"
          >
            <span
              >you are
              <span class="text-green text-bold text-strike"
                >READERS</span
              ></span
            >
            <span
              >you are
              <span class="text-yellow text-bold text-strike"
                >DREAMERS</span
              ></span
            >
            <span
              >you are
              <span class="text-red text-bold text-strike"
                >EXPLORERS</span
              ></span
            >
            <span
              >you are
              <span class="text-orange text-bold text-strike"
                >RESEARCHERS</span
              ></span
            >
            <span
              >you are
              <span class="text-light-blue text-bold text-strike"
                >AUTHORS</span
              ></span
            >
            <span
              >you are
              <span class="text-green-9 text-bold text-strike"
                >ADVENTURERS</span
              ></span
            >
            <span
              >you are
              <span class="text-yellow-9 text-bold text-strike"
                >STORYTELLERS</span
              ></span
            >
            <span
              >you are
              <span class="text-red-9 text-bold text-strike"
                >THE FUTURE</span
              ></span
            >
            <span class="text-uppercase text-decoration"
              >you are the reason why we are here!</span
            >
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import Logo from '/src/assets/librarylogo.png';
import { Platform, Notify } from 'quasar';
import { useRouter } from 'vue-router';
import { notApi } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';

defineComponent({
  name: 'LoginViewPage',
});

const isPwd = ref(false);
const router = useRouter();
const userStore = useUserStore();
const form = ref({
  email: '',
  password: '',
});

const submitForm = async () => {
  try {
    const response = await notApi.post('/user/login', { form: form.value });

    userStore.initAuthorize(response.data);
    router.push('/home');
  } catch (error: any) {
    if (error.response.data.message) {
      Notify.create({
        message: error.response.data.message,
        type: 'negative',
        position: 'top',
        timeout: 2300
      })
    } else {
      throw new Error(error)
    }
  }
};

const gotoLink = (link: string) => {
  router.push(link);
};
</script>
