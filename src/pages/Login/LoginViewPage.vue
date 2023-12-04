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
  <q-page class="bg-grey-2">
    <LoadingComponent v-if="isLoading" />
    <div
      :class="Platform.is.mobile ? 'column q-pt-lg q-gutter-y-md' : 'row items-center justify-center'"
      :style="
        Platform.is.mobile ? '' : 'border: 1px solid #000; height: 100vh'
      "
    >
      <div
        style="border-radius: 15px; height: 90vh"
        :class="
          Platform.is.mobile
            ? 'q-px-md'
            : 'col-4 column q-px-lg justify-center shadow-3'
        "
      >
        <div
          class="column items-center content-center q-gutter-y-md q-pb-lg "
        >
          <q-img
            :src="Logo"
            fit="contain"
            width="50%"
            class="col"
            style="border-radius: 50%"
          />
          <span
            class="text-weight-bolder text-h3 text-blue-10"
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
            @click="gotoLink('/account/register')"
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
                @click="gotoLink('/account/forgot-password')"
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
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Logo from '/src/assets/librarylogo.png';
import { Platform, debounce, Notify } from 'quasar';
import { useRouter } from 'vue-router';
import { notApi } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';
import { socket } from 'src/utils/socket';
import LoadingComponent from 'components/Loaders/LoadingComponent.vue';

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
const isLoading = ref(false);

const submitLoginform = debounce(async () => {
  try {
    const response = await notApi.post('/user/login', { form: form.value });
    socket.emit('user_connected', form.value.email);
    userStore.initAuthorize(response.data);

    isLoading.value = true;
    router.push('/home');
  } catch (error: unknown) {
    if (error.response.data.message) {
      isLoading.value = false;
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

}, 1500)

const submitForm = async () => {
  try {
    isLoading.value = true;
    await submitLoginform();
  } catch (error: unknown) {
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

onMounted(async () => {
  await socket.emit('new_visit');
})
</script>
