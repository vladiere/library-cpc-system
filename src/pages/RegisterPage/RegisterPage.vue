<template>
  <q-page
    :padding="$q.platform.is.mobile"
    :class="$q.platform.is.mobile ? 'q-mt-xs' : 'flex flex-center'"
  >
    <div
      :class="
        $q.platform.is.mobile
          ? 'full-width column items-center'
          : 'column q-px-xl items-center'
      "
    >
      <q-img
        :src="LibraryLogo"
        width="30%"
        style="border-radius: 50%"
        class="cursor-pointer"
        @click="handleRouter"
      />
      <q-stepper
        header-nav
        class="full-width"
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
        :vertical="$q.platform.is.mobile"
      >
        <q-step
          :name="1"
          title="Login Information"
          caption="You email address and password"
          prefix="1"
          :disable="disableSteps.step1"
        >
          <q-input
            outlined
            label="Email Address"
            color="blue-7"
            v-model="form.email"
            type="email"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
          <q-input
            :type="isPwd ? 'password' : 'text'"
            outlined
            label="Password"
            icon="email"
            v-model="form.password"
            class="q-my-md"
            color="blue-7"
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
            color="blue-7"
            icon="email"
            v-model="confirmPass"
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
          :name="2"
          title="ID Picture"
          caption="Upload/Take a picture of your ID"
          prefix="2"
          style="max-width: 400px"
        >
          <q-file
            capture="user"
            :loading="loading"
            color="grey-2"
            bg-color="blue-7"
            filled
            :disable="loading"
            square
            v-model="fileModel"
            label="ID Picture"
            @onChange="recognize"
          >
            <template v-slot:prepend>
              <q-icon name="attachment" />
            </template>
            <template v-if="fileModel" v-slot:append>
              <q-icon
                name="cancel"
                @click.stop.prevent="fileModel = null"
                class="cursor-pointer"
              />
            </template>
          </q-file>
        </q-step>
        <q-step
          :name="3"
          title="Login Information"
          caption="You email address and password"
          prefix="3"
        >
          <q-input
            color="blue-7"
            outlined
            v-model="form.email"
            class="q-mb-md"
            label="Email Address"
          />
          <q-input
            color="blue-7"
            outlined
            v-model="form.fullname"
            label="Fullname"
          />
          <q-input
            color="blue-7"
            outlined
            v-model="form.id_number"
            class="q-my-md"
            label="ID Number"
          />
          <q-input
            color="blue-7"
            outlined
            v-model="form.department"
            label="Department"
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
              :label="step === 3 ? 'Submit' : 'Next'"
              color="blue-7"
              @click="$refs.stepper.next()"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, ref, watch } from 'vue';
import LibraryLogo from 'src/assets/librarylogo.png';
import { useRouter } from 'vue-router';
import Tesseract from 'tesseract.js';

defineComponent({
  name: 'RegisterPage',
});

const router = useRouter();
const $q = useQuasar();
const step = ref(1);
const isPwd = ref(true);
const disableSteps = ref({
  step1: false,
  step2: true,
  step3: true,
});
const confirmPass = ref('');
const form = ref({
  email: '',
  password: '',
  fullname: '',
  department: '',
  id_number: 0,
});
const fileModel = ref(null);
const loading = ref(false);
const textOutput = ref();

const handleRouter = () => {
  router.push('/');
};

const recognize = async () => {
  try {
    if (!fileModel.value) {
      console.error('No image selected.');
      return;
    }
    loading.value = true;
    const {
      data: { text },
    } = await Tesseract.recognize(fileModel.value, 'eng');
    loading.value = false;
    textOutput.value = text;
    processTextLines(text, (valueText: any) => {
      console.log(valueText);
    });
    console.log(textOutput.value);
  } catch (error) {
    console.error('Error recognizing text:', error);
  }
};

function processTextLines(text: string, lineCallback: any) {
  // Split the text into an array of lines using the newline character as the delimiter
  const lines = text.split('\n');

  // Iterate through each line and apply the lineCallback function
  for (const line of lines) {
    // Call the lineCallback function with the current line as an argument
    lineCallback(line);
  }
}

watch(fileModel, (newValue, oldValue) => {
  if (newValue && newValue !== oldValue) {
    // Only perform recognition when a new image is selected and it's not null
    recognize();
  }
});
</script>
