<template>
  <div class="q-px-xl">
    <q-input outlined v-model="text" dense label="Search Author" color="grey-10" />
    <q-btn label="Search" dense class="q-mt-sm text-subtitle1 q-px-md" rounded  color="teal-10"/>
  </div>
</template>

<script setup lang="ts">
  import { defineComponent } from 'vue'

  defineComponent({
    name: 'AuthorsSearch'
  })
</script>
