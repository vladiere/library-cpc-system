<template>
   <q-item>
      <q-item-section>
        <q-item-label v-if="user_id != decoded.user_id" overline>{{ department }}</q-item-label>
        <q-item-label>{{ wordCapitalizer(file_title) }} Format ({{ file_path.split('.')[1] }})</q-item-label>
        <q-item-label caption>{{ wordCapitalizer(file_description) }}</q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-badge color="teal" :label="formatNumber(file_total_downloads)" >
        <q-tooltip class="bg-grey-10 text-grey-2" :delay="200">
          Total downloads
        </q-tooltip>
      </q-badge>
      <q-item-label>{{ uploaded_date }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { linkfile } from 'src/utils/links';
import { format } from 'quasar';
import { useUserStore } from 'src/stores/user-store';
import { jwtDecode } from 'jwt-decode';

const { capitalize } = format;
const userStore = useUserStore();
const decoded = jwtDecode(userStore.token);

export interface UserContributionProps {
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
}

withDefaults(defineProps<UserContributionProps>(), {
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
  file_total_downloads: 0
})

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
</script>
