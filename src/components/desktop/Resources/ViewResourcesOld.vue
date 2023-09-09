<template>
  <div class="">
    <q-table
      :rows="rows"
      row-key="name"
      flat
      bordered
      title="Records of Old Books"
      color="grey-5"
    />
  </div>
</template>

<script setup lang="ts">
  import { defineComponent, ref } from 'vue'

  defineComponent({
    name: 'ViewResourcesOld'
  })

interface LibraryStaff {
  id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  position: string;
}

const generateName = () => {
  const firstNames = ['Alice', 'Bob', 'Emily', 'John', 'Olivia', 'Michael', 'Sophia', 'William', 'Ava', 'Liam', 'Ella', 'James', 'Mia', 'Benjamin', 'Amelia'];
  const middleNames = ['Rose', 'James', 'Grace', 'David', 'Elizabeth', 'Lee', 'Marie', 'Thomas', 'Nicole', 'Alexander', 'Ann', 'Robert', 'Jane', 'William', 'Lynn'];
  const lastNames = ['Johnson', 'Smith', 'Davis', 'Anderson', 'Wilson', 'Taylor', 'Martinez', 'Brown', 'Jackson', 'Lee', 'Harris', 'Clark', 'Miller', 'White', 'Robinson'];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return { firstname: firstName, middlename: middleName, lastname: lastName };
};

const staffList = ref<LibraryStaff[]>([
  { id: 1, ...generateName(), position: 'Librarian' },
  { id: 2, ...generateName(), position: 'Assistant Librarian' },
  { id: 3, ...generateName(), position: 'Cataloger' },
  { id: 4, ...generateName(), position: 'Reference Librarian' },
  { id: 5, ...generateName(), position: 'Library Technician' },
  { id: 6, ...generateName(), position: 'Archivist' },
  { id: 7, ...generateName(), position: 'Library Aide' },
  { id: 8, ...generateName(), position: 'Media Specialist' },
  { id: 9, ...generateName(), position: 'Children\'s Librarian' },
  { id: 10, ...generateName(), position: 'Acquisitions Coordinator' },
  { id: 11, ...generateName(), position: 'Storytime Coordinator' },
  { id: 12, ...generateName(), position: 'Technology Specialist' },
  { id: 13, ...generateName(), position: 'Interlibrary Loan Specialist' },
  { id: 14, ...generateName(), position: 'Archival Assistant' },
  { id: 15, ...generateName(), position: 'Young Adult Librarian' }
]);

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
]
</script>
