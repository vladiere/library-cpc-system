<style lang="scss">
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
      :class="$q.platform.is.mobile ? 'column q-pt-lg q-gutter-y-md' : 'row'"
      :style="
        $q.platform.is.mobile ? '' : 'border: 1px solid #000; height: 100vh'
      "
    >
      <div
        :class="
          $q.platform.is.mobile
            ? 'q-px-md'
            : 'col-4 column q-px-lg justify-center'
        "
      >
        <div
          :class="
            $q.platform.is.mobile
              ? 'column items-center content-center q-gutter-y-md q-pb-lg'
              : 'col-4 column justify-center content-center'
          "
        >
          <q-img
            :src="Logo"
            :width="$q.platform.is.mobile ? '50%' : '65%'"
            style="border-radius: 50%"
          />
          <span
            :class="
              $q.platform.is.mobile
                ? 'text-bold text-h3 text-blue-10'
                : 'hidden'
            "
            >CPC Library</span
          >
        </div>
        <div
          :class="
            $q.platform.is.mobile
              ? 'other-link text-bold text-grey-10'
              : 'row other-link text-weight-bolder'
          "
        >
          <span
            :class="
              $q.platform.is.mobile ? 'q-mr-xs' : 'text-subtitle1 q-mr-xs'
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
          <q-form @submit.prevent="submitForm" class="column q-gutter-y-md">
            <q-input
              :debounce="1000"
              outlined
              color="blue-7"
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
            <q-input
              :debounce="1000"
              outlined
              @update:model-value="validateInput(form, 'password')"
              @blur="validateInput(form, 'password')"
              color="blue-7"
              :type="isPwd ? 'text' : 'password'"
              :error="form.password.error"
              :error-message="form.password.msg"
              v-model="form.password.value"
              label="Password"
              for="password"
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
                $q.platform.is.mobile
                  ? 'column fit'
                  : 'row q-my-md justify-between'
              "
            >
              <q-btn
                label="Login"
                :color="!isSubmitBtn(form) ? 'blue-grey-2' : 'blue-7'"
                :text-color="!isSubmitBtn(form) ? 'black' : 'grey-1'"
                :size="$q.platform.is.mobile ? '20px' : ''"
                type="submit"
                :disable="!isSubmitBtn(form)"
                class="col-3"
                style="border-radius: 8px"
              />

              <span
                @click="gotoLink('/forgot-password')"
                :class="
                  $q.platform.is.mobile
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
      <div :class="$q.platform.is.mobile ? 'hidden' : 'col row relative'">
        <q-img :src="BgImage" />
        <span
          class="absolute-center q-ml-xl text-weight-bolder text-blue-10"
          style="
            border-radius: 15px;
            font-size: 5rem;
            font-family: system-ui, -apple-system, BlinkMacSystemFont,
              'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
              'Helvetica Neue', sans-serif;
          "
          >CPC Library</span
        >
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import LoginHook from 'src/controllers/hooks/LoginHook';
import { defineComponent, ref } from 'vue';
import { User } from 'src/models/web/users';
import Logo from '/src/assets/librarylogo.png';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import BgImage from 'src/assets/bg.svg';

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
