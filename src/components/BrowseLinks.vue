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
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export interface BrowseLinksProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}
withDefaults(defineProps<BrowseLinksProps>(), {
  caption: '',
  link: '#',
  icon: '',
});

const router = useRouter();

const gotoRoute = async (link: string) => {
  if (link === 'instructor_recommend') {
    await router.push({ name: 'InstructorRecommendations', query: { q: 'all' } });
  } else {
    await router.push(link);
  }
};
</script>
