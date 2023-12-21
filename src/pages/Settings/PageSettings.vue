<template>
  <q-page padding class="column items-center">
    <div
      class="column q-px-xl q-mt-xl"
      :style="Platform.is.mobile ? '' : 'width: 45%'"
    >
      <q-tabs
        v-model="tab"
        dense
        class="bg-grey-2 text-grey-7"
        active-color="grey-8"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="password" label="Password" />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
        class="bg-grey-2 text-dark text-center"
      >

        <q-tab-panel name="password">
          <div class="text-h6">Change Password</div>
          <q-form @reset="onSuccess" greedy @submit.prevent="handleChangePassword" class="column q-gutter-y-md">
            <q-input
              square
              outlined
              label="New Password"
              color="grey-10"
              v-model="password.newPass"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[
                val => val && val.length > 0 || 'Please enter your new password',
                val => val.length >= 1 && val.length > 8 || 'Must be at least 8 characters',
                val => passwordRegex.test(val) || 'Must be at least one special characters'
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-input
              square
              outlined
              label="Confirm Password"
              color="grey-10"
              v-model="password.confirmPass"
              :type="isPwd ? 'password' : 'text'"
              lazy-rules
              :rules="[
                val => val && val.length > 0 || 'Please confirm your password',
                val => val === password.newPass || 'Password does not match'
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <div class="row">
              <q-btn
                color="blue-grey-9"
                text-color="grey-2"
                label="Save Settings"
                type="submit"
              />
            </div>
          </q-form>
        </q-tab-panel>

      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { Platform, SessionStorage, Notify, debounce } from 'quasar'
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios'
import { useUserStore } from 'src/stores/user-store';

defineComponent({
  name: 'SettingsPage',
});

const router = useRouter();
const userStore = useUserStore();
const tab = ref('password');
const isPwd = ref(true);
const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
const password = ref({
  newPass: '',
  confirmPass: '',
});
const isLoading = ref(false);

const onSuccess = () => {
  password.value.newPass = '';
  password.value.confirmPass = '';
}

const changePassword = debounce(async (email: string, password: string) => {
  try {
    const response = await api.post('/user/change/password', { email: email, password: }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })

    if (response.data[0][0].status === 201) {
      Notify.create({
        message: response.data[0][0].message,
        type: 'positive',
        position: 'top-right',
        timeout: 2300
      });
      password.value.newPass = '';
      password.value.confirmPass = '';
    } else {
      console.error(response);
    }
  } catch (error: any) {
    throw new Error(error);
  } finally {
    isLoading.value = false;
  }
}, 1000);

const handleChangePassword = async () => {
  try {
    isLoading.value = true;
    await changePassword(router.currentRoute.value.params.email, password.value.newPass);
  } catch (error) {
    throw error;
  }
}

</script>
