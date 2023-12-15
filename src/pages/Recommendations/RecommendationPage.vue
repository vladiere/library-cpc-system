<template>
  <q-page padding>
    <!-- content -->
    <RecommendationInstructor v-if="decode.privilege === 'instructor' || 'faculty staff'" />
    <RecommendationPersonalize v-if="decode.privilege === 'student'" />
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { jwtDecode } from 'jwt-decode';
import { useUserStore } from 'stores/user-store';

defineComponent({
  name: 'RecommendationPage'
});

const userStore = useUserStore();
const decode = jwtDecode(userStore.token);

const RecommendationInstructor = defineAsyncComponent({
  loader: () => import('components/Recommendations/RecommendationInstructor.vue'),
  delay: 300,
  timeout: 5000,
  suspensible: true
});

const RecommendationPersonalize = defineAsyncComponent({
  loader: () => import('components/Recommendations/RecommendationPersonalize.vue'),
  delay: 300,
  timeout: 5000,
  suspensible: true
});
</script>
