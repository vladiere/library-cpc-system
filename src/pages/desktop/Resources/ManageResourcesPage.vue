<template>
  <div class="column text-capitalize q-pt-lg">
    <div class="row self-center">
      <span class="text-h5 text-bold">Manage library Resources</span>
    </div>
    <DisplayResource />
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import DisplayResource from 'components/desktop/Resources/ManageResources.vue';

defineComponent({
  name: 'ManageResourcesPage',
});
</script>
