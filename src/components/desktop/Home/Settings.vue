<template>
  <div class="q-mt-md">
    <span class="q-ml-md text-h5 text-bold">Settings</span>
    <div class="text-capitalize q-pt-md q-pl-lg row q-gutter-x-md">
      <div class="col-5 column">
        <span class="text-h6 text-bold">Account Setttings</span>
        <div class="column q-pl-md q-gutter-y-md q-mb-md">
          <span class="text-subtitle1 text-bold">Change Password</span>
          <q-input
            square
            outlined
            label-color="grey-10"
            v-model="testingPass.confirmPass"
            color="grey-10"
            label="New Password"
          />
          <q-input
            square
            outlined
            label-color="grey-10"
            v-model="testingPass.confirmPass"
            color="grey-10"
            label="Confirm New Password"
          />
          <div class="row">
            <q-btn
              label="Save Password"
              no-caps
              color="teal-4"
              text-color="grey-10"
              size="md"
            />
          </div>
        </div>
        <div class="column q-pl-md q-gutter-y-md">
          <span class="text-subtitle1 text-bold">Change Email Address</span>
          <q-input
            square
            outlined
            label-color="grey-10"
            v-model="testingPass.confirmPass"
            color="grey-10"
            label="New Password"
          />
          <q-input
            square
            outlined
            label-color="grey-10"
            v-model="testingPass.confirmPass"
            color="grey-10"
            label="Confirm New Password"
          />
          <div class="row">
            <q-btn
              label="Save Email"
              no-caps
              color="teal-4"
              text-color="grey-10"
              size="md"
            />
          </div>
        </div>
      </div>
      <div class="col-5 column q-pl-md">
        <span class="text-h6 text-bold">System Settings</span>
        <div class="row">
          <q-btn
            flat
            icon="update"
            color="grey-10"
            label="Check Updates"
            no-caps
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

defineComponent({
  name: 'ViewSetting',
});

interface TestingPass {
  newPassword: string;
  confirmPass: string;
}

const testingPass = ref<TestingPass>({
  newPassword: '',
  confirmPass: '',
});
</script>
