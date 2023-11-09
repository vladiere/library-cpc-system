<template>
  <q-item clickable @click="gotoRoute(props.link)">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="props.icon" size="1.3rem" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user-store';
import { socket } from 'src/utils/socket';

export interface EssentialLinkProps {
  title: string;
  link?: string;
  icon?: string;
}
const props = withDefaults(defineProps<EssentialLinkProps>(), {
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

      socket.emit("user_logout", userStore.refresh)
      userStore.logoutUser();

      router.push('/');
    } catch(error:any) {
      throw new Error(error);
    }
  } else {
    router.push(link);
  }
};

</script>
