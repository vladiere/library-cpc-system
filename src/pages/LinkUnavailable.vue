<template>
  <div class="fullscreen text-dark text-center column q-gutter-y-xl q-pa-md flex flex-center">
    <span class="text-h1 text-grey-7">404</span>
    <span class="text-grey-7 text-h4">Link expired or not found.</span>
    <router-link to="/">Go back</router-link>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'LinkUnavailable'
})
</script>
