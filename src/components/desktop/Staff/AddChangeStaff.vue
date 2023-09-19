<template>
  <div class="row">
    <q-btn flat dens no-caps icon="arrow_left" label="Back" to=/staff />
    <span class="text-h5 text-bold self-center q-pl-xl"
      >Add or Change Staff</span
    >
  </div>
  <div class="q-pl-xl q-ml-xl">
    <div class="text-capitalize q-pt-md row q-gutter-x-md">
      <div class="col-5 column">
        <span class="text-h6 text-bold">Staff details</span>
        <div>
          <q-input
            square
            outlined
            label-color="grey-10"
            color="grey-10"
            v-model="staffForm.firstname.value"
            label="firstname"
          />
          <q-input
            square
            outlined
            label-color="grey-10"
            color="grey-10"
            v-model="staffForm.middlename.value"
            label="middlename"
          />
          <q-input
            square
            outlined
            label-color="grey-10"
            color="grey-10"
            v-model="staffForm.lastname.value"
            label="lastname"
          />
          <q-input
            square
            outlined
            label-color="grey-10"
            color="grey-10"
            v-model="staffForm.email_address.value"
            label="email address"
          />
          <q-input
            square
            outlined
            label-color="grey-10"
            color="grey-10"
            v-model="staffForm.phone_number.value"
            label="phone number"
          />
          <q-input
            square
            outlined
            label-color="grey-10"
            color="grey-10"
            v-model="staffForm.hobbies.value"
            autogrow
            label="hobbies"
          />
          <q-input
            square
            outlined
            label-color="grey-10"
            color="grey-10"
            v-model="staffForm.description.value"
            autogrow
            label="decriptions"
          />
        </div>
      </div>
      <div class="col-5 column">
        <span class="text-h6 text-bold">address informations</span>
        <div>
          <q-input
            square
            outlined
            label-color="grey-10"
            color="grey-10"
            v-model="staffForm.street_address.value"
            label="street address"
          />
          <q-input
            square
            outlined
            label-color="grey-10"
            color="grey-10"
            v-model="staffForm.city.value"
            label="city"
          />
          <q-input
            square
            outlined
            label-color="grey-10"
            color="grey-10"
            v-model="staffForm.state_province_region.value"
            label="state/province/region"
          />
          <q-input
            square
            outlined
            label-color="grey-10"
            color="grey-10"
            v-model="staffForm.address_type.value"
            label="address type"
          />
          <q-input
            square
            outlined
            label-color="grey-10"
            color="grey-10"
            v-model="staffForm.postal_code.value"
            label="postal code"
            type="number"
            min="0"
          />
          <div class="column q-pt-md">
            <span class="text-h6">Privilege</span>
            <div class="row text-capitalize">
              <q-radio
                v-model="staffForm.privilage"
                color="green-14"
                checked-icon="done_all"
                unchecked-icon="panorama_fish_eye"
                val="library_assistant"
                label="library assistant"
              />
              <q-radio
                v-model="staffForm.privilage"
                checked-icon="done_all"
                unchecked-icon="panorama_fish_eye"
                color="green-14"
                val="library_aide"
                label="library aide"
              />
              <q-radio
                v-model="staffForm.privilage"
                checked-icon="done_all"
                unchecked-icon="panorama_fish_eye"
                color="green-14"
                val="tech_coordinator"
                label="tech coordinator"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column q-pt-lg">
      <span class="text-h6 text-bold">Log in informations</span>
      <div class="row">
        <q-input
          square
          outlined
          label-color="grey-10"
          color="grey-10"
          v-model="staffForm.username.value"
          label="Username"
        />
        <q-input
          square
          outlined
          label-color="grey-10"
          color="grey-10"
          :type="isPwd ? 'password' : 'text'"
          v-model="staffForm.password.value"
          label="Password"
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
          label-color="grey-10"
          color="grey-10"
          :type="isPwd ? 'password' : 'text'"
          v-model="confirmPass"
          label="Confirm Password"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="row col-1 q-mt-md">
        <q-btn
          label="Save Changes"
          color="teal-3"
          text-color="grey-10"
          @click="handleSubmitButton"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { AddStaff } from 'src/models/desktop/Register/addStaff';

defineComponent({
  name: 'AddChangeStaffs',
});

const isPwd = ref(true);

const confirmPass = ref('');

const staffForm = ref<AddStaff>({
  firstname: {
    value: '',
    error: false,
    msg: '',
    required: true,
  },
  middlename: {
    value: '',
    error: false,
    msg: '',
    required: true,
  },
  lastname: {
    value: '',
    error: false,
    msg: '',
    required: true,
  },
  privilage: {
    value: '',
    error: false,
    msg: '',
    required: true,
  },
  street_address: {
    value: '',
    error: false,
    msg: '',
    required: true,
  },
  city: {
    value: '',
    error: false,
    msg: '',
    required: true,
  },
  state_province_region: {
    value: '',
    error: false,
    msg: '',
    required: true,
  },
  postal_code: {
    value: 0,
    error: false,
    msg: '',
    required: true,
  },
  address_type: {
    value: '',
    error: false,
    msg: '',
    required: true,
  },
  email_address: {
    value: '',
    error: false,
    msg: '',
    required: true,
  },
  phone_number: {
    value: '',
    error: false,
    msg: '',
    required: true,
  },
  hobbies: {
    value: '',
    error: false,
    msg: '',
    required: true,
  },
  description: {
    value: '',
    error: false,
    msg: '',
    required: true,
  },
  username: {
    value: '',
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

const handleSubmitButton = () => {
  console.log(staffForm.value);
};
</script>
``
