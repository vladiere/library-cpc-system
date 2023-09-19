<template>
  <q-page padding>
    <div :class="$q.platform.is.mobile ? '' : 'q-pa-xl'">
      <TrendingBooks :count="$q.platform.is.mobile ? 3 : 5" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import TrendingBooks from 'components/web/TrendingBooksCard.vue';
import { useQuasar } from 'quasar';

defineComponent({
  name: 'TrendingPage',
});

const $q = useQuasar();
</script>
