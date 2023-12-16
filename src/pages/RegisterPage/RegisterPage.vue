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
        <q-btn flat dense label="Back to login" icon="mdi-chevron-left" :to="{ name: 'login' }" padding="2px 10px 2px 2px"/>
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
              :options="['Faculty Staff', 'Student']"
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
              val => val && val.length > 0 || 'Please enter your password',
              val => val.length > 1 && val.length > 8 || 'Must be at least 8 characters',
              val => passwordRegex.test(val) || 'Must be at least one special characters'
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
            :rules="[ val => val && val.length > 0 || 'Please confirm your password', val => (val === form.password) || 'Passsword does not match' ]"
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
        <div class="column items-center content-center" >
          <div class="column items-center" :style="Platform.is.mobile ? '' : 'width: 50%'">
            <q-file :style="Platform.is.mobile ? 'width: 100%' : 'width:60%'" v-model="file" outlined dense label="School ID" accept="image/*" @input="handleFileChange" >
              <template v-slot:append>
                <q-icon :name="file ? 'mdi-close' : 'mdi-image'" @click="clearFileAndImageURL" class="cursor-pointer"/>
              </template>
            </q-file>
            <img
              v-if="imageURL"
              :src="imageURL"
              class="rounded-borders"
              style="width: 40%; max-height: 350px; object-fit: contain"
            />
          </div>
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
              :loading="isLoading"
              dense
              @click="$refs.stepper.previous()"
            />

            <q-space />

            <q-btn
              v-if="!disableSteps.step2"
              :label="step === 4 ? 'Submit' : 'Next'"
              color="primary"
              :loading="isLoading"
              @click="doneFillUps($refs)"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Platform, Notify, debounce  } from 'quasar';
import { defineComponent, ref, watchEffect, watch } from 'vue';
import LibraryLogo from 'src/assets/librarylogo.png';
import { useRouter } from 'vue-router';
import { notApi } from 'src/boot/axios.ts'
import { SpinnerFacebook, SpinnerHourglass } from 'src/utils/loading.ts'
import { useUserStore } from 'stores/user-store';
import { socket } from 'src/utils/socket';
import { handleImagesComparison } from 'src/utils/register/registerHandler';

defineComponent({
  name: 'RegisterPage',
});

const imageURL = ref('');
const file = ref(null);
const router = useRouter();
const userStore = useUserStore();
const step = ref(1);
const isPwd = ref(true);
const role = ref(null);
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
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
const isLoading = ref(false);

const handleFileChange = async () => {
  imageURL.value = '';
  if (file.value) {
    const reader = new FileReader();
    reader.onload = async () => {
      imageURL.value = reader.result;
      SpinnerFacebook(true, 'Reading image this may take a while...');
      await sendFileToHandler(reader.result, role.value);
    };
    reader.readAsDataURL(file.value);
  } else {
    imageURL.value = '';
  }

}

const clearFileAndImageURL = () => {
  file.value = null;
  imageURL.value = '';
}

const sendFileToHandler = async (fileImage: unknown, userRole: string) => {
  try {
    const result = await handleImagesComparison(fileImage, userRole.toUpperCase())
      console.log(result);
    if (result.status === 200) {

      const dataArray = result.valueFromDepartmentToIdNumber;
      let fullname = '';

      for (let index = 1; index < dataArray.length - 1; index++) {
        fullname += dataArray[index] + ' '
      }

      form.value.fullname = fullname;
      form.value.department = dataArray[0].includes('BS') ? dataArray[0] : dataArray[0] === 'IT' ? 'BS' + dataArray[0] : dataArray[0];
      form.value.role = role.value;
      form.value.id_number = dataArray[dataArray.length - 1]

      disableSteps.value.step4 = false

      Notify.create({
        message: 'Done reading image',
        type: 'positive',
        position: 'top',
        timeout: 3100,
        progress: true
      });

    } else {
      Notify.create({
        message: result.message,
        type: 'warning',
        position: 'top',
        timeout: 3100,
        progress: true
      });
    }
  } catch (error) {
    throw error
  } finally {
    SpinnerFacebook(false);
  }
}

const doneFillUps = async (refs) => {
  if (step.value === 4) {
    isLoading.value = true;
    await onSubmit();
  }

  return refs.stepper.next();
}

const submitLoginform = debounce(async (email, password) => {
  try {
    const form = {
      email,
      password
    }
    const response = await notApi.post('/user/login', { form });
    socket.emit('user_connected', email);
    userStore.initAuthorize(response.data);

    isLoading.value = true;
    router.push('/home');
  } catch (error) {
    throw error;
  } finally {
    SpinnerHourglass(false);
    isLoading.value = false;
  }
}, 1500)

const onSubmit = debounce(async () => {
  try {
    const response = await notApi.post('/user/register', { form: form.value });

    if (response.data[0].status === 201) {
      SpinnerHourglass(true, 'Logging in please wait...');
      await submitLoginform(form.value.email, form.value.password);
    } else {
      isLoading.value = false;
      Notify.create({
        message: response.data[0].message,
        type: 'negative',
        position: 'top-right',
        timeout: 2300
      })
    }
  } catch (error: unknown) {
    throw new Error(error)
  } finally {
    isLoading.value = false;
  }
}, 1500);

watch(file, handleFileChange);

watchEffect(() => {
  if (role.value !== null) {
    disableSteps.value.step2 = false;
  }
  if (form.value.email && (form.value.password !== '' && confirmPass.value !== '') && (form.value.password === confirmPass.value)) {
     disableSteps.value.step3 = false;
  } else {
    disableSteps.value.step3 = true;
  }
});

</script>
