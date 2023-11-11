<template>
  <q-page padding>
    <div
      :class="
        Platform.is.mobile
          ? ''
          : 'column q-mx-xl q-pa-md bg-transparent text-capitalize'
      "
      :style="Platform.is.mobile ? '' : 'border-radius: 5px;'"
    >
      <div class="row q-gutter-x-md">
        <div class="column">
          <img :src="userData.img_path || 'https://cdn-icons-png.flaticon.com/128/1144/1144760.png'" style="width: 8rem" :class="Platform.is.mobile ? 'self-center' : ''"/>
          <q-btn icon="edit_square" flat color="green-9" @click="card = !card">
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
              ? 'column text-uppercase text-grey-10'
              : 'column text-uppercase text-h6 text-grey-10'
          "
        >
          <span>Fullname: {{ userData.fullname }}</span>
          <span>ID: {{ userData.id_number }}</span>
          <span>Email Address: {{ userData.email_address }}</span>
          <span>Department: {{ userData.department }}</span>
        </div>
      </div>
      <RecommendedBook :count="Platform.is.mobile ? 3 : 5" />
    </div>
    <q-dialog v-model="card">
      <q-card class="my-card">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              Cafe Basilico
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <q-icon name="place" />
              250 ft
            </div>
          </div>

          <q-rating v-model="stars" :max="5" size="32px" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            $・Italian, Cafe
          </div>
          <div class="text-caption text-grey">
            Small plates, salads & sandwiches in an intimate setting.
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Reserve" />
          <q-btn v-close-popup flat color="primary" round icon="event" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import RecommendedBook from 'src/components/Recommend.vue';
import { Platform } from 'quasar';
import { useUserStore } from 'src/stores/user-store';
import jwt_decode from 'jwt-decode';
import { api } from 'src/boot/axios'

defineComponent({
  name: 'UserProfilePage',
});

interface UserData {
  user_id: number;
  fullname: string;
  id_number: number;
  department: string;
  email_address: string;
  img_path: string;
}


const userStore = useUserStore();
const card = ref(false)
const decoded = jwt_decode(userStore.token);
const userData = ref<UserData>([]);


const getUserData = async () => {
  try {
    const response = await api.post('/user/get/details', { user_id: decoded.user_id }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })

    userData.value = response.data[0];
  } catch (error) {
    throw new Error(error)
  }
}

onMounted(() => {
  getUserData()
})
</script>
