<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>

<template>
  <q-card class="my-card relative-position bg-blue-12 text-white shadow-15">
      <div class="absolute-top-right bg-teal-10 text-white q-mr-xs q-mt-xs" style="border-radius: 5px !important; padding: 5px 5px">
        {{ formatNumber(file_total_downloads) }}
      </div>
      <q-card-section>
        <div class="text-h6">{{ wordCapitalizer(file_title) }}</div>
        <div class="text-subtitle2">{{ wordCapitalizer(author_fullname) }}</div>
      </q-card-section>

      <q-card-section>
        <q-item-label lines="3">{{ wordCapitalizer(file_description) }}</q-item-label>
      </q-card-section>

      <q-separator dark />

      <q-card-actions>
        <q-btn flat :href="linkfile +'/'+ file_path">Download</q-btn>
        <q-space />
         <q-btn
          color="dark"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        >
          <q-tooltip class="bg-grey-10 text-grey-2" :delay="200">
            Show more
          </q-tooltip>
        </q-btn>
      </q-card-actions>
      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subtitle2">
            {{ wordCapitalizer(file_description) }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { format } from 'quasar';
import { linkfile } from 'src/utils/links';

const expanded = ref(false);
const { capitalize } = format;

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
