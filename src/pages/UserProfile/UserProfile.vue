<template>
  <q-page padding>
    <div
      :class="
        Platform.is.mobile
          ? ''
          : 'column q-mx-xl q-pa-md bg-blue-grey-13 text-capitalize'
      "
      :style="Platform.is.mobile ? '' : 'border-radius: 5px;'"
    >
      <div class="row q-gutter-x-md">
        <div class="column">
          <img :src="accountProfile.picture" style="width: 8rem" />
          <q-btn icon="edit_square" flat color="green-9">
            <q-tooltip
              class="bg-teal-5 text-grey-10"
              transition-show="flip-right"
              transition-hide="flip-left"
              >Edit Picture</q-tooltip
            >
          </q-btn>
        </div>
        <div
          :class="
            Platform.is.mobile
              ? 'column text-capitalize text-grey-10'
              : 'column text-capitalize text-h6 text-grey-10'
          "
        >
          <span class="text-bold">Fullname: {{ accountProfile.name }}</span>
          <span class="text-caption">ID: {{ accountProfile.student_id }}</span>
          <span>Email Address: {{ accountProfile.email }}</span>
          <span>Department: {{ accountProfile.department }}</span>
        </div>
      </div>
      <RecommendedBook :count="Platform.is.mobile ? 3 : 5" />
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import RecommendedBook from 'components/Recommend.vue';
import { Platform } from 'quasar';

defineComponent({
  name: 'UserProfilePage',
});

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
});
</script>
