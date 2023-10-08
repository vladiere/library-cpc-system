<template>
  <q-page padding>
    <div class="q-px-xl q-py-lg q-gutter-y-sm">
      <span class="text-h5">All Subjects</span>
      <q-list>
        <q-item v-for="format in formats" :key="format.id">
          <q-item-section>
            {{ format.name }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
defineComponent({
  name: 'FormatsPage',
});

interface Format {
  id: number;
  name: string;
}

const formats = ref<Format[]>([
  { id: 1, name: 'Books' },
  { id: 2, name: 'Periodicals (journals, magazines, newspapers)' },
  {
    id: 3,
    name: 'Audiovisual materials (CDs, DVDs, Blu-rays, streaming media)',
  },
  { id: 4, name: 'E-books and electronic resources' },
  { id: 5, name: 'Microforms (microfilm, microfiche)' },
  { id: 6, name: 'Maps and atlases' },
  { id: 7, name: 'Manuscripts and archives' },
  {
    id: 8,
    name: 'Special collections (rare books, artist books, graphic novels)',
  },
  {
    id: 9,
    name: 'Reference materials (encyclopedias, dictionaries, handbooks)',
  },
  { id: 10, name: 'Government documents' },
  { id: 11, name: 'English' },
  { id: 12, name: 'Spanish' },
  { id: 13, name: 'French' },
  { id: 14, name: 'German' },
  { id: 15, name: 'Chinese' },
  { id: 16, name: 'Japanese' },
  { id: 17, name: 'Arabic' },
  { id: 18, name: 'Russian' },
  { id: 19, name: 'Latin' },
  {
    id: 20,
    name: 'Other languages (including regional or indigenous languages)',
  },
]);
</script>
