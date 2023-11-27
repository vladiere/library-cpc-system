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
import { api } from 'boot/axios';
import { useUserStore } from 'stores/user-store';
import { socket } from 'src/utils/socket';
import { useBooksStore } from 'stores/books-store';
import { useMybookStore } from 'stores/mybooks-store'; import { useRecommendationStore } from 'stores/recommendation-store';
import { debounce } from 'quasar';
import { SpinnerFacebook } from 'src/utils/loading';

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
const bookStore = useBooksStore();
const mybooksStore = useMybookStore();
const recommendationStore = useRecommendationStore();

const userLogout = debounce(async() => {
  try {

    const response = await api.post('/user/logout', { refreshToken: userStore.refresh }, {
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    });

    if (response.status === 200) {
      socket.emit('user_logout', userStore.refresh)
      userStore.logoutUser();
      bookStore.clearAll();
      mybooksStore.clearTransactions();
      recommendationStore.clearAll();
      console.log('Logging out');

      router.push('/');
    } else {
      throw new Error(response);
    }
  } catch(error) {
    throw error;
  } finally {
    SpinnerFacebook(false);
  }
}, 1500);


const gotoRoute = (link: string) => {
  if (link === 'logout') {
    SpinnerFacebook(true, 'Loading...');
    userLogout();
  } else {
    router.push(link);
  }
};

</script>
