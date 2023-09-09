<template>
  <q-page class="bg-primary">
    <div
      :class="
        $q.platform.is.mobile ? 'q-pa-none text-center' : 'q-pa-lg text-center'
      "
    >
      <router-link to="/">
        <q-img :src="Logo" style="width: 10%" class="q-mb-md" />
      </router-link>
      <div
        :class="
          $q.platform.is.mobile
            ? 'full-width absolute-center'
            : 'row justify-center'
        "
      >
        <q-stepper
          class="col-8 bg-grey-3"
          active-color="blue"
          flat
          :bordered="$q.platform.is.mobile"
          header-nav
          done-color="positive"
          v-model="step"
          animated
          :transition-duration="250"
          :contracted="$q.platform.is.mobile"
          :vertical="$q.platform.is.mobile"
          ref="stepper"
        >
          <q-step
            :name="1"
            title="Account Details"
            caption="Account you will be using"
            prefix="1"
          >
            <div
              :class="$q.platform.is.mobile ? 'q-ma-none q-pa-none' : 'q-mx-xl'"
            >
              <q-input
                outlined
                class="q-mt-md"
                v-model="form.email.value"
                for="email"
                type="email"
                color="blue-grey-10"
                label="Email Address"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
              <q-input
                outlined
                class="q-mt-lg"
                v-model="form.password.value"
                for="password"
                color="blue-grey-10"
                :type="isPwd ? 'text' : 'password'"
                label="Password"
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
              <q-input
                outlined
                class="q-mt-lg"
                v-model="cpassword"
                for="cpassword"
                color="blue-grey-10"
                :type="isPwd ? 'text' : 'password'"
                label="Confirm Password"
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
            </div>
          </q-step>
          <q-step
            :name="2"
            title="Identification"
            caption="Upload your ID picture front only"
            prefix="2"
          >
            <div :class="$q.platform.is.mobile ? 'q-pa-none' : 'q-px-xl'">
              <q-file
                standard
                v-model="file"
                label="Upload ID"
                accept="image/*"
                max-file-size="50000"
                name="photoid"
                @rejected="onRejected"
                capture
                @change="handleFileChange"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
                <template v-if="file" v-slot:append>
                  <q-icon
                    name="cancel"
                    @click.stop.prevent="file = null"
                    class="cursor-pointer"
                  />
                </template>
              </q-file>
              <div
                v-if="file"
                class="q-pa-none q-ma-none row justify-center q-mt-sm"
              >
                <q-img :src="photoPreview" fit="fill" width="200px" />
              </div>
            </div>
          </q-step>
          <q-step
            :name="3"
            title="Checking Information"
            caption="Final checking to your information"
            prefix="3"
          >
            <div
              :class="$q.platform.is.mobile ? 'q-pa-none q-ma-none' : 'q-px-lg'"
            >
              <q-input
                readonly
                prefix="Email:"
                v-model:model-value="form.email.value"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
            </div>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation class="row">
              <q-btn
                v-if="step > 1"
                label="Back"
                icon="arrow_left"
                flat
                text-color="indigo"
                @click="$refs.stepper.previous()"
              />

              <q-space />

              <q-btn
                color="teal"
                :label="step === 3 ? 'Finish' : 'Continue'"
                @click="step !== 3 ? $refs.stepper.next() : sampleFunc()"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { useQuasar } from 'quasar';
import { RegisterUser } from 'src/models/users';
import recognizeText from 'src/controllers/hooks/RegisterHook';
import Logo from 'src/assets/logo.png';

const step = ref(1);

defineComponent({
  name: 'RegisterPage',
});

const $q = useQuasar();
const isPwd = ref(false);
const file = ref(null);
const photoPreview = ref('');
const cpassword = ref('');

const form = ref<RegisterUser>({
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
  fullname: {
    value: '',
    error: false,
    msg: '',
    required: true,
  },
  department: {
    value: '',
    error: false,
    msg: '',
    required: true,
  },
  id_number: {
    value: 0,
    error: false,
    msg: '',
    required: true,
  },
});

const sampleFunc = () => {
  console.log('Success');
};

const errorsMap = {
  accept: 'Not an image',
  'max-file-size': 'Image size exceeds',
};

const onRejected = (rejectedFile: any) => {
  rejectedFile.forEach((rejectedFile: any) => {
    const errMsg = errorsMap[rejectedFile.failedPropValidation];
    if (!errMsg) {
      return;
    }

    if (rejectedFile.failedPropValidation) {
      $q.notify({
        message: errMsg,
        type: 'negative',
        position: 'top',
      });
    }
  });
};

const handleFileChange = (file: any) => {
  file.value = file;
};

watchEffect(() => {
  if (file.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      photoPreview.value = e.target?.result || '';

      recognizeText(photoPreview.value)
        .then((text) => {
          console.log('Recognized Text:', text);
        })
        .catch((error) => {
          console.error('OCR Error:', error);
        });
    };
    reader.readAsDataURL(file.value);
  }
});
</script>
