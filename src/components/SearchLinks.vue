<template>
  <q-item clickable :to="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

export interface SearchLinksProps {
  title: string;
  caption?: string;
  query?: string;
  icon?: string;
}
withDefaults(defineProps<SearchLinksProps>(), {
  caption: '',
  query: '#',
  icon: '',
});

const router = useRouter();

const gotoRoutes = (query: string) => {
  router.push(query);
};
</script>
