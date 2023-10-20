<template>
  <q-item clickable @click="gotoRoute(link)">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" size="1.3rem" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';

export interface EssentialLinkProps {
  title: string;
  link?: string;
  icon?: string;
}
withDefaults(defineProps<EssentialLinkProps>(), {
  link: '#',
  icon: '',
});

const router = useRouter();
const userStore = useUserStore();

const gotoRoute = async (link: string) => {
  if (link === 'logout') {
    try {
      await api.post('/user/logout', {refreshToken: userStore.refresh as string}, {
        headers: {
          Authorization: `Bearer ${userStore.token as string}`
        }
      });

      userStore.logoutUser();

      router.push('/');
    } catch(error:any) {
      throw new Error(error);
    }
  } else if (link === 'profile') {
    router.push({ name: 'UserProfile', params: { account: 'vladiere' } });
  } else {
    router.push(link);
  }
};
</script>
