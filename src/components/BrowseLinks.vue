<template>
  <q-item clickable :to="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" size="1.3rem"/>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'BrowseLinks'
})

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

</script>
