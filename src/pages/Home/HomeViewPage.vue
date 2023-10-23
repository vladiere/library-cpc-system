<template>
  <q-page>
    <div :class="Platform.is.mobile ? 'q-pa-sm q-mt-lg' : 'q-py-lg q-px-md q-mb-lg'">
      <HomeBooks/>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import HomeBooks from 'components/HomeBooks.vue';
import { Platform } from 'quasar';

defineComponent({
  name: 'HomeViewPage',
});

</script>
