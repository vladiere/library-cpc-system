<template>
  <div class="column">
    <div class="fit column q-gutter-y-md q-mt-md">
      <div class="row">
        <q-btn
          flat
          label="Create New List"
          icon="add"
          text-color="grey-10"
          @click="prompt = !prompt"
        >
          <q-tooltip class="bg-grey-14">Create your list</q-tooltip>
        </q-btn>
      </div>
      <q-list class="q-px-md text-capitalize">
        <q-virtual-scroll
          :items="lists"
          style="height: calc(100vh - 210px)"
          v-slot="{ item, index }"
        >
        <q-item
          :key="index"
          clickable
          @click="gotoListContent(item.list_name, item.list_id)"
         >
          <q-item-section>
            {{ item.list_name }}
          </q-item-section>
        </q-item>
        <q-separator />
        </q-virtual-scroll>
      </q-list>
    </div>
  </div>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Your new list name</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="newList" autofocus @keyup.enter="addNewList" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add list" @click="addNewList" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
const prompt = ref(false);
const newList = ref('');

const lists = ref<List>([]);

const addNewList = () => {
  const tempId = Math.floor(Math.random() * 10000);
  lists.value.push({
    list_id: tempId,
    list_name: newList.value
  });
  newList.value = '';
  prompt.value = false;
}

const gotoLink = (link: string) => {
  router.push(link);
};

const gotoListContent = (list_name: string, list_id: number) => {
  router.push({ path: `/userbooks/mylists/${list_name.replace(/\s+/g, '+')}`, query: { list_id: list_id }})
}

</script>
