<template>
  <q-page>
    <div :class="$q.platform.is.mobile ? '' : 'q-py-lg q-px-xl q-mb-lg'">
      <HomeBooks />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import HomeBooks from 'components/web/HomeBooks.vue';
import { useQuasar } from 'quasar';

defineComponent({
  name: 'HomeViewPage',
});

const $q = useQuasar();
</script>
