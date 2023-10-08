<template>
  <div class="fit column q-gutter-y-md q-px-xl">
    <q-input color="grey-10" outlined dense v-model="text" label="Title" />
    <q-input color="grey-10" outlined dense v-model="text" label="Author" />
    <q-input color="grey-10" outlined dense v-model="text" label="Category" />
    <q-input color="grey-10" outlined dense v-model="text" label="Publisher" />
    <div class="row">
      <q-btn label="Submit" class="btn-fixed-width" color="teal" text-color="grey-10"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineComponent } from 'vue'
  defineComponent({
    name: 'AdvanceSearch'
  })
</script>
