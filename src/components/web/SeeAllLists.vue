<template>
  <div class="column">
    <div class="row q-gutter-x-sm">
      <span
        class="text-caption cursor-pointer"
        @click="gotoLink('/userbooks', 1)"
      >
        <q-icon name="arrow_back" size="1rem" />
        My Books
      </span>
    </div>
    <div class="fit column q-gutter-y-md">
      <div class="row">
        <q-btn
          flat
          label="Create New List"
          icon="add"
          text-color="grey-10"
          @click="gotoLink('/userbooks/mylists/add', 1)"
        >
          <q-tooltip class="bg-grey-14">Create your list</q-tooltip>
        </q-btn>
      </div>
      <q-list separator class="q-px-md">
        <q-item
          v-for="list in lists"
          :key="list.id"
          clickable
          :to="(list.link, list.id)"
        >
          <q-item-section>
            {{ list.title }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

defineComponent({
  name: 'SeeAllLists',
});

interface List {
  id: number;
  title: string;
  link: string;
}

const router = useRouter();

const lists = ref<List[]>([
  { id: 1, title: 'code complete', link: 'ListsName' },
  { id: 2, title: 'clean code', link: 'ListsName' },
]);

const gotoLink = (link: string, id: number) => {
  router.push({ name: link, params: { list_id: id } });
};
</script>
