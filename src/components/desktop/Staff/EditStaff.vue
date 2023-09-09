<template>
  <div class="row text-capitalize q-gutter-x-md q-mt-lg text-grey-10 q-py-xl text-grey-8 q-pl-xl q-pr-xl q-gutter-y-md float-right" style="width: 82vw;">
    <div class="col-3 column q-pt-md">
      <img src="https://www.picsum.photos/200/300?random=5" fit style="max-width: 100%;"/>
      <q-btn color="teal-5" icon="edit_square" text-color="grey-10">
        <q-tooltip class="bg-teal-2 text-grey-10"
            :delay="300"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
          Change Staff Profile
        </q-tooltip>
        </q-btn>
    </div>
    <div class="col column text-h6 q-gutter-y-md">
      <q-input standout="bg-teal-3 text-grey-10" square label="Fullname"/>
      <q-input standout="bg-teal-3 text-grey-10" square label="Email Address"/>
      <q-input standout="bg-teal-3 text-grey-10" square label="Hobbies"/>
      <div class="row">
        <q-input class="col-6" standout="bg-teal-3 text-grey-10" square label="Contact Number"/>
        <q-input class="col-6" standout="bg-teal-3 text-grey-10" square label="Contact Address"/>
      </div>
      <q-input standout="bg-teal-3 text-grey-10" square label="Description" autogrow/>
      <div class="col row justify-center q-mt-lg">
        <q-btn flat size="32px" icon="person_off" text-color="warning">
          <q-tooltip
            class="bg-yellow-6 text-grey-10"
            :delay="300"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            Disable Account
          </q-tooltip>
        </q-btn>
        <q-btn flat size="32px" icon="person_remove" text-color="negative">
          <q-tooltip
            class="bg-red-6 text-grey-2"
            :delay="300"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            Remove Account
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineComponent } from 'vue'

  defineComponent({
    name: 'EditStaff'
  })
</script>
