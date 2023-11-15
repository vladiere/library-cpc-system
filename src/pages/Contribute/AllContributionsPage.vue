<template>
  <q-page padding>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, onBeforeUnmount, defineAsyncComponent, onMounted, ref } from 'vue'
import { useUserStore } from 'src/stores/user-store';
import { api } from 'src/boot/axios'
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
const userStore = useUserStore();

const getUserContributions = async () => {
  try {
    const response = await api.post('/user/book/contribute/list', { user_id: 0, limit: 0 }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });
    contributionList.value = response.data;
  } catch (error) {
    throw error;
  }
}

onMounted(async () => {
  await getUserContributions();
});

onBeforeUnmount(() => {
  contributionList.value = []
})
</script>
