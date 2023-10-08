<template>
  <q-page padding>
    <div class="column rounded-borders">
      <q-tabs
        v-model="tab"
        dense
        class="bg-grey-2 text-grey-7"
        active-color="grey-8"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="password" label="Password" />
        <q-tab name="mail" label="Email and Number" />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
        class="bg-grey-2 text-dark text-center"
      >
        <q-tab-panel name="password">
          <div class="text-h6">Change Password</div>
          <div class="column q-gutter-y-md">
            <q-input
              dense
              square
              outlined
              label="Old Password"
              color="grey-10"
              v-model="password.oldPass"
              :type="isPwd ? 'password' : 'text'"
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
              dense
              square
              outlined
              label="New Password"
              color="grey-10"
              v-model="password.newPass"
              :type="isPwd ? 'password' : 'text'"
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
              dense
              square
              outlined
              label="Confirm Password"
              color="grey-10"
              v-model="password.confirmPass"
              :type="isPwd ? 'password' : 'text'"
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
              />
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="mail" class="bg-grey-2 text-dark">
          <div class="text-h6">Change Email</div>
          <div class="column q-gutter-y-md">
            <q-input
              dense
              square
              outlined
              label="New Email"
              v-model="emailNumber.newEmail"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
            <q-input
              dense
              square
              outlined
              label="Confirm New Email"
              v-model="emailNumber.confirmEmail"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
            <div class="row">
              <q-btn color="grey-5" text-color="grey-10" label="Save email" />
            </div>
          </div>
          <q-separator size="2px" class="q-my-md" />
          <div class="text-h6">Change Number</div>
          <div class="column q-gutter-y-md">
            <q-input
              dense
              square
              outlined
              label="Mobile/Phone Number"
              v-model="emailNumber.number"
            >
              <template v-slot:prepend>
                <q-icon name="dialpad" />
              </template>
            </q-input>
            <q-input
              dense
              square
              outlined
              label="Confirm code "
              v-model="emailNumber.confirmCode"
            >
              <template v-slot:prepend>
                <q-icon name="confirmation_number" />
              </template>
            </q-input>
            <div class="row">
              <q-btn color="grey-5" text-color="grey-10" label="Save number" />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

defineComponent({
  name: 'SettingsPage',
});

interface Passwords {
  oldPass: string;
  newPass: string;
  confirmPass: string;
  otpCode: string;
}

interface EmailNumber {
  newEmail: string;
  confirmEmail: string;
  number: string;
  confirmCode: string;
}

const tab = ref('password');
const isPwd = ref(true);
const password = ref({
  oldPass: '',
  newPass: '',
  confirmPass: '',
  otpCode: '',
});
const emailNumber = ref({
  newEmail: '',
  confirmEmail: '',
  number: '',
  confirmCode: '',
});
</script>
