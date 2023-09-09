<template>
  <div class="row q-pa-xl shadow-10" style="border-radius: 15px">
    <div class="col column text-h6">
      <div class="row q-gutter-x-xs">
        <span>Fullname: </span>
        <span class="text-subtitle1">{{ sampleUser.firstName }}</span>
        <span class="text-subtitle1">{{ sampleUser.lastName }}</span>
      </div>
      <div class="row q-gutter-x-xs">
        <span>email address: </span>
        <span class="text-subtitle1">{{ sampleUser.emailAddress }}</span>
      </div>
      <div class="row q-gutter-x-xs">
        <span>my hobbies : </span>
        <span
          class="text-subtitle1"
          v-for="hobbies in sampleUser.hobbies"
          :key="hobbies"
          >{{ hobbies }},</span
        >
      </div>
      <div class="row q-gutter-x-xs">
        <span>contact informations : </span>
        <div class="column q-gutter-y-xs">
          <div class="row q-gutter-x-xs">
            <span class="text-subtitle1">number :</span>
            <span class="text-subtitle1">{{
              sampleUser.contactInformation.phoneNumber
            }}</span>
          </div>
          <div class="row q-gutter-x-xs">
            <span class="text-subtitle1">address :</span>
            <span class="text-subtitle1">{{
              sampleUser.contactInformation.address
            }}</span>
          </div>
        </div>
      </div>
      <div class="row q-gutter-x-xs">
        <span>description :</span>
        <span class="text-subtitle1">{{ sampleUser.description }}</span>
      </div>
    </div>
    <div class="col-1 column">
      <div class="row">
        <q-btn
          flat
          dense
          icon="edit"
          color="teal-10"
          @click="staffOption('AddChangeStaff')"
        >
          <q-tooltip class="bg-teal-8 text-grey-2">Edit Staff</q-tooltip>
        </q-btn>
        <q-btn flat dense icon="delete" color="red-10">
          <q-tooltip class="bg-red-8 text-grey-2">Remove Staff</q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

defineComponent({
  name: 'ProfileStaff',
});

const router = useRouter();

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  hobbies: string[];
  contactInformation: {
    phoneNumber: string;
    address: string;
  };
  description: string;
}

const sampleUser: UserProfile = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  emailAddress: 'john.doe@example.com',
  hobbies: ['Reading', 'Cooking', 'Hiking'],
  contactInformation: {
    phoneNumber: '+1234567890',
    address: '123 Main Street, City, Country',
  },
  description:
    'I am a passionate individual who loves exploring new things and meeting new people.',
};

const staffOption = (link: string) => {
  router.push({ name: link });
};
</script>
