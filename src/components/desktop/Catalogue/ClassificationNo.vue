<template>
  <div class="column q-pa-md">
    <div class="column q-gutter-md">
      <span class="text-h6">add new classification number</span>
      <div class="row q-gutter-x-md">
        <q-input label="Classification number" v-model="form.class_number" />
        <q-input label="Description" v-model="form.class_dest" />
      </div>
    </div>
    <div style="max-width: 450px" class="column q-gutter-y-md">
      <span class="text-h6 text-bold">Classification Numbers</span>
      <q-list bordered separator>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>Item with caption</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>Item with caption</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>Item with caption</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>Item with caption</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>Item with caption</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

defineComponent({
  name: 'ClassificationNumber',
});

const form = ref({
  class_number: 0,
  class_dest: '',
});
</script>
