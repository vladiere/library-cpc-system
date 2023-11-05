<template>
  <q-page padding>
    <!-- content -->
    <div class="column q-gutter-y-md items-center">
      <q-btn
        flat
        label="Create New List"
        icon="add"
        text-color="grey-10"
        class="self-center"
        @click="showAddList = !showAddList"
      >
        <q-tooltip class="bg-grey-14">Create your list</q-tooltip>
      </q-btn>
      <q-list class="text-capitalize text-h6" style="max-width: 55vw">
        <AllListsComponent v-for="list in allList" :key="list.list_id" v-bind="list"/>
      </q-list>
    </div>
    <q-dialog v-model="showAddList" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Your new list</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="newList.list_name" :error="errorMap.list_name.error" :error-message="errorMap.list_name.message" placeholder="Name" lazy-rule @keyup.enter="addNewList" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense type="textarea" v-model="newList.list_desc" :error="errorMap.list_desc.error" :error-message="errorMap.list_desc.message" placeholder="Description" lazy-rule  autofocus @keyup.enter="addNewList" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add list" @click="addNewList" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent, onMounted, onBeforeUnmount, ref } from 'vue';
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';
import jwt_decoded from 'jwt-decode';
import { Notify } from 'quasar';
import { AllListProps } from 'components/Lists/AllListsComponent.vue';
import { SpinnerIos } from 'src/utils/loading'

defineComponent({
  name: 'MyListsPage'
});

const AllListsComponent = defineAsyncComponent({
  loader: () => import('components/Lists/AllListsComponent.vue'),
  loadingComponent: SpinnerIos(1300, 'Loading...'),
  suspensible: false
});

const showAddList = ref(false);
const errorMap = ref({
  list_name: {
    error: false,
    message: ''
  },
  list_desc: {
    error: false,
    message: ''
  }
})
const userStore = useUserStore();
const decoded = jwt_decoded(userStore.token);
const currentDate = new Date();
const allList = ref<AllListProps>([]);
const newList = ref({
  list_name: '',
  list_desc: ''
});

const addNewList = async () => {
  try {
    if (newList.value.list_name !== '') {
      if (newList.value.list_desc !== '') {
        const response = await api.post('/list/create',
          {
            user_id: decoded.user_id,
            list_name: newList.value.list_name,
            list_desc: newList.value.list_desc
          },
          {
            headers: {
              Authorization: `Bearer ${userStore.token}`
            }
          }
        );
        if (response.data.status === 201) {
          const newListId = allList.value[allList.value.length - 1].list_id
          const dateToday = currentDate.getMonth() + ' ' + currentDate.getDate() + ', ' + currentDate.getYear();
          allList.value.push({
            list_id: newListId,
            list_name: newList.value.list_name,
            created_at: dateToday,
            list_status: 0,
            list_desc: newList.value.list_desc
          })
          Notify.create({
            message: response.data.message,
            position: 'top-right',
            timeout: 2300,
            type: 'positive'
          });
          newList.value.list_name = '';
          newList.value.list_desc = '';
          showAddList.value = false;
        }
      } else {
        errorMap.value.list_desc.error = true;
        errorMap.value.list_desc.message = 'Enter the description for the list'
      }
    } else {
      errorMap.value.list_name.error = true;
      errorMap.value.list_name.message = 'Enter a name for the list'
    }
  } catch (error) {
    throw error;
  }
}

const getMyLists = async () => {
  try {
    const response = await api.post('/lists/get', { user_id: decoded.user_id }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })
    allList.value = [];
    allList.value = response.data;
  } catch (error) {
    throw error;
  }
}


onMounted(() => {
  getMyLists();
})

onBeforeUnmount(() => {
  allList.value = [];
})
</script>
