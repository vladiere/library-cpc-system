<template>
  <q-page padding>
    <!-- content -->
    <div class="text-h4 q-my-md text-weight-light">
      Your contributions
    </div>
    <q-virtual-scroll
      style="max-height: calc(100vh - 90px);"
      :items="contributionList"
      separator
      v-slot="{ item, index }"
    >
      <UserContributionComponent :key="index" v-bind="item"/>
    </q-virtual-scroll>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, defineAsyncComponent, ref } from 'vue';
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';
import jwt_decode from 'jwt-decode';
import { UserContributionProps } from 'components/Contribute/UserContributionComponent.vue';

defineComponent({
  name: 'ListContributionPage'
});

const UserContributionComponent = defineAsyncComponent({
  loader: () => import('components/Contribute/UserContributionComponent.vue'),
  delay: 500,
  suspensible: false
})

const contributionList = ref<UserContributionProps>([]);
const userStore = useUserStore();
const decoded = jwt_decode(userStore.token);

const getUserContributions = async () => {
  try {
    const response = await api.post('/user/book/contribute/list', { user_id: decoded.user_id }, {
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
})
</script>
