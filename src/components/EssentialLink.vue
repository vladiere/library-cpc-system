<template>
  <q-item clickable @click="gotoRoute(link)">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" size="1.3rem" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}
withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});

const router = useRouter();

const gotoRoute = (link: string) => {
  if (link === 'logout') {
    router.push('/');
  } else if (link === 'profile') {
    router.push({ name: 'UserProfile', params: { account: 'vladiere' } })
  } else {
    router.push(link);
  }
};
</script>
