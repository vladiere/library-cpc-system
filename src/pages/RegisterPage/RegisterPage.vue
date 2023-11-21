<template>
  <q-page
    :class="Platform.is.mobile ? 'q-mt-xs' : 'column items-center'"
    padding
  >
    <div
      :class="
        Platform.is.mobile
          ? 'full-width column items-center q-gutter-y-md '
          : 'column q-px-xl items-center q-gutter-y-md '
      "
    >
      <q-img
        :src="LibraryLogo"
        width="20%"
        style="border-radius: 50%"
      />
      <q-btn flat dense label="Back to login" icon="mdi-chevron-left" to="/"/>
      <q-stepper
        header-nav
        class="full-width q-mt-md"
        v-model="step"
        active-color="blue-9"
        active-icon="border_color"
        flat
        bordered
        animated
        transition-prev="scale"
        transition-next="scale"
        :transition-duration="150"
        ref="stepper"
        :vertical="Platform.is.mobile"
      >
        <q-step
          :name="1"
          title="Choose your role"
          caption="What role are you in school"
          prefix="1"
          :disable="disableSteps.step1"

        >
          <div class="column items-center">
            <q-select
              label="Role"
              transition-show="scale"
              transition-hide="scale"
              borderless
              dense
              v-model="role"
              :options="['Instructor', 'Student']"
              style="width: 250px"
            />
          </div>
        </q-step>
        <q-step
          :name="2"
          title="Login Information"
          caption="You email address and password"
          prefix="2"
          :disable="disableSteps.step2"
        >
          <q-input
            outlined
            label="Email Address"
            color="primary"
            v-model="form.email"
            type="email"
            lazy-rules
            :rules="[
              val => val && val.length > 0 || 'Please enter your email address',
              val => emailRegex.test(val) || 'Invalid email address'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
          <q-input
            :type="isPwd ? 'password' : 'text'"
            outlined
            label="Password"
            v-model="form.password"
            class="q-my-md"
            color="primary"
            lazy-rules
            :rules="[
              val => val && val.length > 0 || 'Please enter your password'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            :type="isPwd ? 'password' : 'text'"
            outlined
            label="Confirm Passsword"
            color="primary"
            v-model="confirmPass"
            lazy-rules
            :rules="[
              val => val && val.length > 0 || 'Please confirm your password',
              val => (val === form.password) || 'Passsword does not match'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </q-step>
        <q-step
          :name="3"
          title="ID Picture"
          caption="Upload/Take a picture of your ID"
          prefix="3"
          :disable="disableSteps.step3"
        >
        <div class="column justify-center items-center content-center" >

        <q-uploader
            :style="Platform.is.mobile ? 'width: 250px; max-height: 450px' : 'max-width: 350px'"
            flat
            dense
            url="http://localhost:3000/api/user/register/upload/image"
            auto-upload
            :form-fields="role !== null ? [{ name: 'role', value: `${role}`}] : '[]'"
            @failed="uploaderFailed"
            field-name="image"
            accept=".jpg, image/*"
            @rejected="onRejected"
            @uploaded="onUploadedImage"
            @uploading="SpinnerFacebook(true, 'Reading Image')"
          />
        </div>
        </q-step>
        <q-step
          :name="4"
          title="Login Information"
          caption="Checking your Information if correct"
          prefix="4"
          :disable="disableSteps.step4"
        >
        <q-item-label class="q-mb-md text-h6">
          Checking Information
        </q-item-label>
          <q-input
            color="primary"
            outlined
            disable
            readonly
            v-model="form.email"
            class="q-mb-md"
            label="Email Address"
          />
          <q-input
            color="primary"
            outlined
            v-model="form.fullname"
            label="Fullname"
            disable
            readonly
          />
          <q-input
            color="primary"
            outlined
            v-model="form.id_number"
            class="q-my-md"
            label="ID Number"
            disable
            readonly
          />
          <q-input
            color="primary"
            outlined
            v-model="form.department"
            label="Department"
            disable
            readonly
          />
        </q-step>
        <template v-slot:navigation>
          <q-stepper-navigation class="row">
            <q-btn
              v-if="step > 1"
              icon="arrow_left"
              label="Back"
              flat
              dense
              @click="$refs.stepper.previous()"
            />

            <q-space />

            <q-btn
              v-if="!disableSteps.step2"
              :label="step === 4 ? 'Submit' : 'Next'"
              color="primary"
              @click="doneFillUps($refs)"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Platform, Notify  } from 'quasar';
import { defineComponent, ref, watchEffect } from 'vue';
import LibraryLogo from 'src/assets/librarylogo.png';
import { useRouter } from 'vue-router';
import { notApi } from 'src/boot/axios.ts'
import { SpinnerFacebook, SpinnerHourglass } from 'src/utils/loading.ts'

defineComponent({
  name: 'RegisterPage',
});

const router = useRouter();
const step = ref(1);
const isPwd = ref(true);
const role = ref(null);
const roleField = ref('')
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const disableSteps = ref({
  step1: false,
  step2: true,
  step3: true,
  step4: true,
});
const confirmPass = ref('');
const form = ref({
  email: '',
  password: '',
  fullname: '',
  department: '',
  role: '',
  id_number: null,
});

const uploaderFailed = (faileds) => {
  const xhrResponse = JSON.parse(faileds.xhr.response);
  Notify.create({
    message: xhrResponse.message,
    type: 'negative',
    position: 'top',
    timeout: 2300
  })
  SpinnerFacebook(false);
}

const doneFillUps = (refs) => {
  if (step.value === 4) {
    onSubmit();
  }

  return refs.stepper.next();
}

const onRejected = (rejectedEntries) => {
  console.log(rejectedEntries)
}

const onUploadedImage = (data: any) => {
  SpinnerFacebook(false);
  disableSteps.value.step4 = false;
  const { xhr } = data;
  const responseText = xhr.responseText;
  const jsonResponse = JSON.parse(responseText);

  if (jsonResponse.status === 200) {
    const dataArray = jsonResponse.valueFromDepartmentToIdNumber;
    let fullname = '';

    for (let index = 1; index < dataArray.length - 1; index++) {
      fullname += dataArray[index] + ' '
    }

    form.value.fullname = fullname;
    form.value.department = dataArray[0];
    form.value.role = role.value;
    form.value.id_number = dataArray[dataArray.length - 1]


    disableSteps.value.step3 = false
  } else {
    Notify.create({
      message: 'Cannot read image try again',
      type: 'negative',
      position: 'top',
      timeout: 3000,
    });
  }
}

const onSubmit = async () => {
  try {
    const response = await notApi.post('/user/register', { form: form.value });

    if (response.data[0].status === 201) {
      SpinnerHourglass(true, 'Redirecting to login...')
      setTimeout(() => {
        SpinnerHourglass(false);
        router.push('/');
      }, 2300);
    } else {
      Notify.create({
        message: response.data[0].message,
        type: 'negative',
        position: 'top-right',
        timeout: 2300
      })
    }
  } catch (error: any) {
    console.error(error)
    throw new Error(error)
  }
}

watchEffect(() => {
  if (role.value !== null) {
    console.log(role.value)
    disableSteps.value.step2 = false;
  }
  if (form.value.email && (form.value.password !== '' && confirmPass.value !== '') && (form.value.password === confirmPass.value)) {
     disableSteps.value.step3 = false;
  } else {
    disableSteps.value.step3 = true;
  }
});

</script>
