<template>
  <q-page padding>
    <div class="column q-mx-xl q-pa-md bg-blue-grey-13 text-capitalize" style="border-radius: 5px;">
      <div class="row q-gutter-x-md">
        <div class="column">
          <img :src="accountProfile.picture" style="width: 8rem;">
          <q-btn icon="edit_square" flat color="green-9">
            <q-tooltip
              class="bg-teal-5 text-grey-10"
              transition-show="flip-right"
              transition-hide="flip-left"
            >Edit Picture</q-tooltip>
          </q-btn>
        </div>
        <div class="column text-capitalize text-h6 text-grey-10">
          <span class="text-bold">Fullname: {{ accountProfile.name }}</span>
          <span class="text-caption">ID: {{ accountProfile.student_id }}</span>
          <span>Email Address: {{ accountProfile.email }}</span>
          <span>Department: {{ accountProfile.department }}</span>
        </div>
      </div>
      <div class="q-pa-md q-gutter-x-md">
        <RecommendedBook />
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
  import { defineComponent, ref } from 'vue'
  import RecommendedBook from 'components/web/Recommend.vue'

  defineComponent({
   name: 'UserProfilePage'
  })

  interface AccountProfile {
    id: number;
    student_id: number;
    name: string;
    picture: string;
  }

  const accountProfile = ref({
    id: 1,
    student_id: 20200800,
    name: 'Descartin, Lance Phillip b.',
    picture: 'https://cdn.quasar.dev/img/boy-avatar.png',
    email: 'vladiere@vlad.gg',
    department: 'BSIT',
  })
</script>
