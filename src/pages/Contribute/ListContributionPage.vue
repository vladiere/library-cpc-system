<template>
  <q-page padding>
    <!-- content -->
    <div v-if="contributionList.length === 0 && !isLoading" class="text-h3 text-grey-9 text-weight-light q-mt-xl column q-gutter-y-lg items-center">
      No contribution found, Contribute now!
      <q-btn flat dense rounded no-caps label="Contribute Now!" to="/contribute" size="lg" color="primary" class="self-center"/>
    </div>
    <div class="text-h4 q-my-md text-weight-light" v-if="contributionList.length !== 0">
      Your contributions
    </div>
    <q-virtual-scroll
      style="max-height: calc(100vh - 90px);"
      :items="contributionList"
      separator
      v-slot="{ item, index }"
    >
      <UserContributionComponent v-if="item.user_status === 'active'" :key="index" v-bind="item" @isEdited="edited"/>
    </q-virtual-scroll>

    <div v-if="isLoading" class="q-mt-xl column items-center">
      <q-spinner-ios size="5em" color="primary"/>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, defineAsyncComponent, ref } from 'vue';
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';
import { jwtDecode } from 'jwt-decode';
import { UserContributionProps } from 'components/Contribute/UserContributionComponent.vue';
import { debounce } from 'quasar';

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
const decoded = jwtDecode(userStore.token);
const isLoading = ref(false);

const getUserContributions = debounce(async () => {
  try {
    const response = await api.post('/user/book/contribute/list', { user_id: decoded.user_id }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });
    contributionList.value = response.data;
  } catch (error) {
    throw error;
  } finally {
    isLoading.value = false;
  }
}, 1500);

const edited = async () => {
  isLoading.value = true;
  contributionList.value = [];
  await getUserContributions();
}

onMounted(async () => {
  isLoading.value = true;
  await getUserContributions();
  console.log(contributionList.value)
})
</script>
