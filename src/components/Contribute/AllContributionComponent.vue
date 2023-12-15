<style lang="sass" scoped>
.my-card
  width: 300px
</style>

<template>
  <q-card class="my-card q-pa-sm shadow-3" bordered>
    <q-card-section horizontal >
      <div class="column q-gutter-y-sm col">
        <div :class="!Platform.is.mobile ? 'text-h6 text-capitalize text-blue-9' : 'text-subtitle1 text-blue-9 text-capitalize'">{{ file_title }}</div>
        <div :class="!Platform.is.mobile ? 'text-caption text-capitalize' : 'text-body text-capitalize'">{{ author_fullname }}</div>

        <q-item-label class="q-mt-md text-capitalize text-caption">
          {{ category_name }}
        </q-item-label>
      </div>

      <q-card-actions vertical class="justify-around column">
        <q-badge rounded floating text-color="grey-1" :label="formatNumber(file_total_downloads)" />
        <q-btn flat round color="teal-5" icon="mdi-download" :href="linkfile +'/'+ file_path" >
          <q-tooltip class="bg-grey-10 text-grey-2" :delay="300">Download to read</q-tooltip>
        </q-btn>
        <q-btn flat round color="warning" icon="mdi-information-outline" @click="clickMore = !clickMore" >
          <q-tooltip class="bg-grey-10 text-grey-2" :delay="300">Show more info</q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>

  <q-dialog v-model="clickMore" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6 text-capitalize">{{ file_title }}</div>
          <div class="text-caption text-capitalize">{{ author_fullname }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <p>{{ wordCapitalizer(file_description) }}</p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { format, Platform } from 'quasar';
import { linkfile } from 'src/utils/links';

const { capitalize } = format;
const clickMore = ref(false);

export interface AllContributionProps {
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
  user_status: string;
}

withDefaults(defineProps<AllContributionProps>(), {
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
