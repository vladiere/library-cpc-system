<template>
  <q-page padding>
    <div class=" q-pa-md bg-blue-2 q-gutter-md q-pb-lg" :style="!Platform.is.mobile ? 'margin: 2em 10em 0px 10rem' : ''">
      <div :class="!Platform.is.mobile ? 'row' : 'column'">
        <div :class="!Platform.is.mobile ? 'column col-5 q-gutter-y-md' : 'column'">
          <q-img :src="userData.img_path ? userData.img_path : 'https://picsum.photos/id/209/1200/820'" fit="cover" height="300px" :max-width="!Platform.is.mobile ? '350px' : '300px'"/>
          <div class="row justify-between">
            <div class="column">
              <div :class="!Platform.is.mobile ? 'text-capitalize text-h4 text-weight-bold' : 'text-capitalize text-h5 '"> {{ userData.fullname }} </div>
              <div class="text-capitalize">
                Joined {{ userData.created_at }}
              </div>
            </div>
           </div>
        </div>

        <div :class="!Platform.is.mobile ? 'col column q-gutter-y-md text-body q-mx-md' : 'column q-mt-lg q-gutter-y-md'">
          <div class="column self-end justify-end">
            Last edited on {{ userData.edited_at }}
            <q-btn
              bordered
              no-caps
              label="Edit"
              color="blue-8"
              text-color="grey-2"
              class="self-end"
            />
          </div>
          <div class="column">
            <div class="text-subtitle1 text-weight-light row q-gutter-x-sm q-ml-md">Email: <p>{{ userData.email_address }}</p></div>
            <div class="text-subtitle1 text-weight-light row q-gutter-x-sm q-ml-md">ID Number: <p>{{ userData.id_number }}</p></div>
            <div class="text-subtitle1 text-weight-light row q-gutter-x-sm q-ml-md">Department: <p class="text-uppercase">{{ userData.department }}</p></div>
            <div class="text-subtitle1 text-weight-light row q-gutter-x-sm q-ml-md">Fines and fees due: <p>{{ userData.total_amount ? userData.total_amount : 0 }}</p></div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, defineAsyncComponent } from 'vue';
import { Platform } from 'quasar';
import { useUserStore } from 'stores/user-store';
import { IUser } from 'src/utils/interface/user';

defineComponent({
  name: 'UserProfilePage',
});

const userStore = useUserStore();
const userData = ref<UserData>({});

onMounted(async () => {
  userData.value = userStore.getUserData[0]
})
</script>
