<template>
  <div class="column q-pr-lg">
    <div class="column q-my-md q-pa-md shadow-2">
      <span class="text-h5 q-mb-md">Add New Book subject</span>
      <div class="row q-mb-md">
        <q-input
          square
          class="q-mr-md"
          dense
          color="blue-10"
          outlined
          v-model="book.subject"
          label="Subject"
        />
        <q-input
          square
          dense
          outlined
          color="blue-10"
          v-model="book.ddc"
          label="DDC"
          type="number"
          min="0"
        />
      </div>
      <div class="row">
        <q-btn label="Add" color="blue-7" padding="5px 15px" />
      </div>
    </div>
    <q-table
      bordered
      :rows="rows"
      :columns="columns"
      row-key="name"
      :loading="loading"
      :pagination="{
        rowsPerPage: 7,
        sortBy: 'name',
      }"
      :filter="filter"
    >
      <template v-slot:top>
        <span class="text-h6 text-bold">Book Subjects</span>
        <q-space />
        <q-input
          square
          outlined
          dense
          debounce="300"
          color="primary"
          v-model="filter"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-button="{ row }">
        <q-td key="button">
          <q-btn
            icon="remove"
            size="md"
            color="red-9"
            flat
            dense
            @click="handleButtonClick('disable', row)"
          >
            <q-tooltip class="bg-red-14 text-grey-2" :delay="200"
              >Remove</q-tooltip
            >
          </q-btn>
          <q-btn
            icon="edit_attributes"
            size="md"
            color="amber-5"
            flat
            dense
            @click="handleButtonClick('banned', row)"
          >
            <q-tooltip class="bg-amber-11 text-grey-10" :delay="200"
              >Edit</q-tooltip
            >
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

defineComponent({
  name: 'BookSubject',
});

interface BookSubject {
  subject: string;
  ddc: number;
}

const book = ref<BookSubject>({
  subject: '',
  ddc: 0,
});

const loading = ref(false);
const filter = ref('');
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: (row: any) => row.name,
    format: (val: any) => `${val}`,
    sortable: true,
  },
  {
    name: 'calories',
    align: 'center',
    label: 'Calories',
    field: 'calories',
    sortable: true,
  },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  {
    name: 'calcium',
    label: 'Calcium (%)',
    field: 'calcium',
    sortable: true,
    sort: (a: any, b: any) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: 'iron',
    label: 'Iron (%)',
    field: 'iron',
    sortable: true,
    sort: (a: any, b: any) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: 'button',
    align: 'right',
    label: 'Action (act)',
  },
];

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%',
  },
];

const handleButtonClick = (act: string, row: object) => {
  console.log(act, row);
};
</script>
