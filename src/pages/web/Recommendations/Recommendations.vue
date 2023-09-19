<template>
  <q-page padding>
    <div :class="$q.platform.is.mobile ? '' : 'q-pa-xl'">
      <RecommendBook />
      <RecommendByInstructor />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import RecommendBook from 'components/web/Recommend.vue';
import RecommendByInstructor from 'src/components/web/RecommendByInstructor.vue';
import { useQuasar } from 'quasar';

defineComponent({
  name: 'RecommendationsPage',
});

const $q = useQuasar();
</script>
