<template>
   <q-item v-if="props.user_status === 'active'">
     <q-item-section v-if="!isEditting">
        <q-item-label v-if="user_id != decoded.user_id" overline>{{ props.department }}</q-item-label>
        <q-item-label>{{ wordCapitalizer(props.file_title) }} Format ({{ props.file_path.split('.')[1] }})</q-item-label>
        <q-item-label class="text-capitalize" >{{ props.author_fullname }}</q-item-label>
        <q-item-label caption>{{ wordCapitalizer(props.file_description) }}</q-item-label>
    </q-item-section>

    <q-item-section v-if="isEditting">
      <q-form
        greedy
        @submit.prevent="handleRedButton(props.contribution_id)"
        class="column q-gutter-y-xs"
      >
        <q-input v-model="form.title" outlined dense stack-label label="Title"/>
        <q-input v-model="form.author" outlined dense stack-label label="Author"/>
        <q-input v-model="form.description" autogrow outlined dense stack-label label="Description"/>
      </q-form>
    </q-item-section>

    <q-item-section side top>
      <q-badge color="teal" :label="formatNumber(props.file_total_downloads)" >
        <q-tooltip class="bg-grey-10 text-grey-2" :delay="200">
          Total downloads
        </q-tooltip>
      </q-badge>
      <q-item-label>{{ props.uploaded_date }}</q-item-label>
      <div class="row ">
        <q-btn :loading="isLoading" flat no-caps dense rounded color="green-5" :icon="!isEditting ? 'mdi-file-edit' : 'mdi-file-remove'" @click="isEditting = !isEditting">
          <q-tooltip class="bg-grey-10 text-grey-2" :delay="300" anchor="bottom left">{{ !isEditting ? 'edit ebook' : 'cancel edit' }}</q-tooltip>
        </q-btn>
        <q-btn :loading="isLoading" flat no-caps dense rounded :color="!isEditting ? 'red-5' : 'primary'" :icon="!isEditting ? 'mdi-trash-can' : 'mdi-check-all'" type="submit" @click="handleRedButton(props.contribution_id)">
          <q-tooltip class="bg-grey-10 text-grey-2" :delay="300" anchor="bottom left">{{ !isEditting ? 'remove ebook' : 'save changes' }}</q-tooltip>
        </q-btn>
      </div>
    </q-item-section>
  </q-item>

  <q-dialog v-model="showDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
         <q-avatar icon="mdi-file-alert-outline" color="negative" text-color="white" />
         <span class="q-ml-sm">Are your sure you want to remove this file?</span>
       </q-card-section>

       <q-card-actions align="right">
         <q-btn flat no-caps dense label="Cancel" color="primary" v-close-popup />
         <q-btn flat no-caps dense label="Remove" color="primary" @click="yesRemoveNow" />
       </q-card-actions>
     </q-card>
   </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { format, debounce, Notify } from 'quasar';
import { useUserStore } from 'src/stores/user-store';
import { jwtDecode } from 'jwt-decode';
import { api } from 'boot/axios';

const { capitalize } = format;
const userStore = useUserStore();
const decoded = jwtDecode(userStore.token);
const isEditting = ref(false);
const showDialog = ref(false);
const isLoading = ref(false);
const fileStatus = ref('');
const tempId = ref(null);
const emit = defineEmits(['isEdited']);

export interface UserContributionProps {
  contribution_id: number;
  author_fullname: string;
  category_name: string;
  contribution_id: number;
  file_path: string | null;
  file_title: string;
  publisher_name: string;
  fullname: string;
  uploaded_date: string;
  user_id: number;
  department: string;
  file_description: string;
  file_total_downloads: number;
  file_status: string;
  user_status: string
}

const props = withDefaults(defineProps<UserContributionProps>(), {
  contribution_id: 0,
  author_fullname: '',
  category_name: '',
  contribution_id: 0,
  file_path: '',
  file_title: '',
  publisher_name: '',
  uploaded_date: '',
  user_id: 0,
  fullname: '',
  department: '',
  file_description: '',
  file_total_downloads: 0,
  file_status: '',
  user_status: '',
});

const form = ref({
  title: props.file_title,
  author: props.author_fullname,
  description: props.file_description,
});

const formatNumber = (total_downloads: number) => {
  if (total_downloads < 1000) {
    return total_downloads.toString();
  } else if (total_downloads < 1000000) {
    return (total_downloads / 1000).toFixed(1) + 'k';
  } else {
    return (total_downloads / 1000000).toFixed(1) + 'M';
  }
}

const wordCapitalizer = (word: string) => {
  return capitalize(word);
}

const submitChanges = debounce(async (endpoint: string, contribution_id: number) => {
  try {
    let response = null;
    if (fileStatus.value === 'remove') {
      response = await api.post(endpoint, { contribution_id: contribution_id }, {
        headers: {
          Authorization: `Bearer ${userStore.token}`
        }
      });
    } else {
      response = await api.post(endpoint, { contribution_id: contribution_id, author: form.value.author, title: form.value.title, description: form.value.description }, {
        headers: {
          Authorization: `Bearer ${userStore.token}`
        }
      });
    }

    emit('isEdited');

    fileStatus.value = '';
    tempId.value = null;

    if (response.status === 200) {
      Notify.create({
        message: response.data.message,
        progress: true,
        position: 'top',
        timeout: 2300,
        type: 'positive'
      });
    } else {
      Notify.create({
        message: 'Something is wrong try again later',
        position: 'top',
        type: 'negative',
        timeout: 2300,
        progress: true
      });
      throw new Error(response);
    }
  } catch (error) {
    throw error;
  } finally {
    isEditting.value = false;
    isLoading.value = false;
  }
}, 1500);

const yesRemoveNow = async () => {
  try {
    isLoading.value = true;
    showDialog.value = false;
    submitChanges('/contribution/remove', tempId.value);
  } catch (error) {
    throw error;
  }
}

const handleRedButton = (contribution_id: number) => {
  isLoading.value = true;
  if (!isEditting.value) {
    fileStatus.value = 'remove';
    tempId.value = contribution_id;
    showDialog.value = true;
  } else {
    submitChanges('/contribution/edit', contribution_id);
  }
}

</script>
