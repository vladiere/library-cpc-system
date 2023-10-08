<template>
  <q-page padding>
    <div
      :class="$q.platform.is.mobile ? '' : 'row q-px-xl x-py-md q-gutter-x-md'"
    >
      <span class="text-h5 text-bold">Categories </span>
      <span class="text-caption">Dewey Decimal Classification</span>
    </div>
    <q-list separator :class="$q.platform.is.mobile ? '' : 'q-pa-xl'">
      <q-item
        clickable
        v-for="category in categories"
        :key="category.id"
        :to="category.link"
      >
        <q-item-section>
          {{ category.name }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';

defineComponent({
  name: 'CategoryPage',
});

interface Subject {
  id: number;
  name: string;
  link: string;
}

const $q = useQuasar();

const categories = ref<Subject[]>([
  {
    id: 1,
    name: '001-099 Generalities',
    link: 'search/category?q=generalities',
  },
  { id: 2, name: '100-199 Philosophy', link: 'search/category?q=philosophy' },
  { id: 3, name: '200-299 Religion', link: 'search/category?q=religion' },
  {
    id: 4,
    name: '300-399 Social Science',
    link: 'search/category?q=social_science',
  },
  { id: 5, name: '400-499 Languages', link: 'search/category?q=languages' },
  {
    id: 6,
    name: '500-599 Natural Science',
    link: 'search/category?q=natural_science',
  },
  {
    id: 7,
    name: '600-699 Applied Science',
    link: 'search/category?q=applied_science',
  },
  {
    id: 8,
    name: '700-799 Arts And Recreation',
    link: 'search/category?q=arts_and_recreation',
  },
  { id: 9, name: '800-899 Literature', link: 'search/category?q=literature' },
  {
    id: 10,
    name: '900-999 Geography And History',
    link: 'search/category?q=geography_and_history',
  },
  {
    id: 11,
    name: '92-920 Biography And Collective Biography',
    link: 'search/category?q=biography_and_collective_biography',
  },
  {
    id: 12,
    name: 'eBooks',
    link: 'search/category?q=e_books',
  },
]);
</script>
