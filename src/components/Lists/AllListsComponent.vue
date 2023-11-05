<template>
  <q-item :key="list_id">
    <q-item-section>
      <q-item-label>{{ list_name }}</q-item-label>
      <q-item-label caption lines="2">{{ list_desc }}</q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-item-label caption>{{ created_at }}</q-item-label>
      <div>
        <q-btn flat no-caps dense round color="red-6" icon="mdi-delete-empty-outline">
          <q-tooltip class="bg-grey-10 text-grey-2" :delay="300">Delete List</q-tooltip>
        </q-btn>
        <q-btn flat no-caps dense round color="green-14" icon="mdi-square-edit-outline">
          <q-tooltip class="bg-grey-10 text-grey-2" :delay="300">Edit list</q-tooltip>
        </q-btn>
        <q-btn flat no-caps dense round color="teal-10" icon="mdi-dots-vertical" @click="gotoListName(list_id)" >
          <q-tooltip class="bg-grey-10 text-grey-2" :delay="300">See list contents</q-tooltip>
        </q-btn>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface AllListProps {
  list_id: number;
  list_name: string;
  created_at: string;
  list_status: number;
  list_desc: string;
}
withDefaults(defineProps<AllListProps>(), {
  list_id: 0,
  list_name: '',
  created_at: '',
  list_status: 0,
  list_desc: ''
})

const gotoListName = (list_id: number) => {
  console.log(list_id);
}
</script>
