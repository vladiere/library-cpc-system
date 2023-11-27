<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
.on-mobile
  width: 100%
  max-width: 290px
</style>

<template>
  <q-card :class="!Platform.is.mobile ? 'my-card relative-position bg-blue-12 text-white shadow-15' : 'on-mobile q-mb-lg relative-position bg-blue-12 text-white shadow-15'">
      <div class="absolute-top-right bg-teal-10 text-white q-mr-xs q-mt-xs" style="border-radius: 5px !important; padding: 5px 5px">
        {{ formatNumber(file_total_downloads) }}
      </div>
      <q-card-section style="height: 130px">
        <div :class="!Platform.is.mobile ? 'text-h6 text-capitalize' : 'text-subtitle1 text-capitalize'">{{ file_title }}</div>
        <div :class="!Platform.is.mobile ? 'text-subtitle2 text-capitalize' : 'text-body text-capitalize'">{{ author_fullname }}</div>
      </q-card-section>

      <q-card-section>
        <q-item-label lines="3">{{ wordCapitalizer(file_description) }}</q-item-label>
        <q-btn flat dense rounded icon="mdi-information-outline" @click="clickMore = !clickMore"/>
      </q-card-section>

      <q-separator dark />
      <q-card-actions style="height: 50px">
        <q-btn flat class="absolute-bottom q-my-sm self-center" :href="linkfile +'/'+ file_path">Download</q-btn>
      </q-card-actions>
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

const expanded = ref(false);
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
