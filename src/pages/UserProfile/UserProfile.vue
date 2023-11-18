<template>
  <q-page padding>
    <div class=" q-pa-md bg-blue-2 q-gutter-md q-pb-lg" :style="!Platform.is.mobile ? 'margin: 2em 10em 0px 10rem' : ''">
      <div class="row justify-between">
        <div class="column ">
          <q-img :src="img ? img : 'https://picsum.photos/id/209/1200/820'" fit="cover" height="300px" :width="!Platform.is.mobile ? '350px' : '300px'"/>
        </div>
        <div :class="!Platform.is.mobile ? 'column text-body q-mr-md' : ''">
          <div class="column">
            Last edited on {{ userData.updated_at }}
            <q-btn
              bordered
              no-caps
              label="Edit"
              color="blue-8"
              text-color="grey-2"
              class="self-end"
            />
          </div>
          <span class="text-subtitle1 text-weight-light">{{ userData.email_address }}</span>
          <span class="text-subtitle1 text-weight-light">{{ userData.id_number }}</span>
          <span class="text-subtitle1 text-weight-light text-uppercase">{{ userData.department }}</span>
        </div>
      </div>
      <div class="row justify-between">
        <div class="column">
          <span :class="!Platform.is.mobile ? 'text-capitalize text-h4 text-weight-bold' : 'text-capitalize text-h5 '"> {{ userData.fullname }} </span>
          <div class="text-capitalize">
            Joined {{ userData.created_at }}
          </div>
        </div>
       </div>
      <RecommendedBook  class="q-mt-xl" :count="5"/>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, defineAsyncComponent } from 'vue';
import { Platform } from 'quasar';
import { useUserStore } from 'stores/user-store';

defineComponent({
  name: 'UserProfilePage',
});

const RecommendedBook = defineAsyncComponent({
  loader: () => import('components/Recommend.vue'),
  delay: 300,
  timeout: 2400,
  suspensible: false
});

const userStore = useUserStore();
const userData = ref({
  fullname: '',
  created_at: '',
  updated_at: '',
  created_at: '',
  department: '',
  email_address: '',
  id_number: null,
  img_path: null,
  updated_at: '',
});

const setUserProfile = async () => {
  await userStore.getUserData.map((item: unknown) => {
    userData.value.fullname = item.fullname;
    userData.value.created_at = item.created_at;
    userData.value.updated_at = item.updated_at;
    console.log(item);
  })
}

onMounted(async () => {
  await setUserProfile()
})
</script>
