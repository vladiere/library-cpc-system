<template>
  <div class="q-mt-md">
    <span class="q-ml-md text-h5 text-bold">Account Information</span>
    <div class="q-pl-xl q-ml-xl">
      <div class="text-capitalize q-pt-md row q-gutter-x-md">
        <div class="col-5 column">
          <span class="text-h6 text-bold">Staff details</span>
          <div>
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="staffForm.firstname.value"
              label="firstname"
            />
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="staffForm.middlename.value"
              label="middlename"
            />
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="staffForm.lastname.value"
              label="lastname"
            />
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="staffForm.email_address.value"
              label="email address"
            />
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="staffForm.phone_number.value"
              label="phone number"
            />
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="staffForm.hobbies.value"
              autogrow
              label="hobbies"
            />
            <q-input
              readonly
              dense
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
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="staffForm.street_address.value"
              label="street address"
            />
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="staffForm.city.value"
              label="city"
            />
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="staffForm.state_province_region.value"
              label="state/province/region"
            />
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="staffForm.address_type.value"
              label="address type"
            />
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="staffForm.postal_code.value"
              label="postal code"
              type="number"
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { AddStaff } from 'src/models/desktop/Register/addStaff';

defineComponent({
  name: 'ViewAccount',
});

const staffForm = ref<AddStaff>({
  firstname: {
    value: 'John',
    error: false,
    msg: '',
    required: true,
  },
  middlename: {
    value: 'Doe',
    error: false,
    msg: '',
    required: true,
  },
  lastname: {
    value: 'Smith',
    error: false,
    msg: '',
    required: true,
  },
  privilage: {
    value: 'Admin',
    error: false,
    msg: '',
    required: true,
  },
  street_address: {
    value: '123 Main St',
    error: false,
    msg: '',
    required: true,
  },
  city: {
    value: 'Anytown',
    error: false,
    msg: '',
    required: true,
  },
  state_province_region: {
    value: 'California',
    error: false,
    msg: '',
    required: true,
  },
  postal_code: {
    value: 12345,
    error: false,
    msg: '',
    required: true,
  },
  address_type: {
    value: 'Home',
    error: false,
    msg: '',
    required: true,
  },
  email_address: {
    value: 'john.smith@example.com',
    error: false,
    msg: '',
    required: true,
  },
  phone_number: {
    value: '+1 (123) 456-7890',
    error: false,
    msg: '',
    required: true,
  },
  hobbies: {
    value: 'Reading, Swimming',
    error: false,
    msg: '',
    required: true,
  },
  description: {
    value: 'A dedicated employee',
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
</script>
