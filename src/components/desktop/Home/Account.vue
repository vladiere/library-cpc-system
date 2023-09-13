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
              v-model="librarianStore.firstname"
              label="firstname"
            />
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="librarianStore.middlename"
              label="middlename"
            />
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="librarianStore.lastname"
              label="lastname"
            />
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="librarianStore.email_address"
              label="email address"
            />
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="librarianStore.phone_number"
              label="phone number"
            />
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="librarianStore.hobbies"
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
              v-model="librarianStore.description"
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
              v-model="librarianStore.street_address"
              label="street address"
            />
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="librarianStore.city"
              label="city"
            />
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="librarianStore.state_province_region"
              label="state/province/region"
            />
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="librarianStore.address_type"
              label="address type"
            />
            <q-input
              readonly
              dense
              square
              outlined
              label-color="grey-10"
              color="grey-10"
              v-model="librarianStore.postal_code"
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
import { useLibrarianDataStore } from 'src/stores/user';

defineComponent({
  name: 'ViewAccount',
});

const librarianStore = useLibrarianDataStore();
</script>
