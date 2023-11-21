<template>
  <q-page padding>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent, onMounted, ref } from 'vue'
import { AllContributionProps } from 'components/Contribute/AllContributionComponent.vue';

defineComponent({
  name: 'AllContributionsPage'
});

const AllContributionComponent = defineAsyncComponent({
  loader: () => import('components/Contribute/AllContributionComponent.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: false
});

const contributionList = ref<AllContributionProps>([])

onMounted(async () => {
  await getUserContributions();
});

</script>
