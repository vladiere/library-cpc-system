<template>
  <div class="column text-capitalize q-gutter-y-md q-pt-lg">
    <div class="row text-h5 self-center q-gutter-x-sm">
      add new resources
      <span class="text-caption"
        >We require a minimum set of fields to create a new record. These are
        those fields.</span
      >
    </div>
    <div class="row">
      <q-btn
        flat
        label="Bulk Upload"
        square
        icon="upload"
        :to="{ name: 'BulkUploads' }"
      >
        <q-tooltip class="bg-grey-7 text-grey-1" :delay="200"
          >Bulk Upload with your excel file</q-tooltip
        >
      </q-btn>
    </div>
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Accesion No."
      v-model="addBook.accesion_no"
      type="number"
      min="0"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      type="date"
      label="Date Received"
      v-model="addBook.date_received"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Author"
      v-model="addBook.author"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Book Title"
      v-model="addBook.title"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Edition"
      v-model="addBook.edition"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Volume Copy No."
      v-model="addBook.volumes"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Publisher"
      v-model="addBook.publisher"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Cost Price"
      v-model="addBook.cost_price"
      type="number"
      min="0"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Copyright Year"
      v-model="addBook.copyright_yr"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Remarks(Leave empty if no remarks)"
      autogrow
      v-model="addBook.remarks"
    />
    <q-input
      standout="bg-light-blue-10 text-grey-4"
      label="Descriptions"
      autogrow
      v-model="addBook.image"
    />
    <q-file
      standout="bg-light-blue-10 text-grey-4"
      bottom-slots
      v-model="forImage"
      label="Book Image(Just Leave it Default if there's no image)"
      counter
    >
      <template v-slot:prepend>
        <q-icon name="cloud_upload" @click.stop.prevent />
      </template>
      <template v-slot:append>
        <q-icon
          name="close"
          @click.stop.prevent="forImage = null"
          class="cursor-pointer"
        />
      </template>
    </q-file>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';

defineComponent({
  name: 'AddResources',
});

interface Books {
  id: number;
  image: string;
  accesion_no: number;
  date_received: string;
  author: string;
  title: string;
  edition: string;
  volumes: string;
  cost_price: number;
  publisher: string;
  copyright_yr: string;
  remarks: string;
  description: string;
}

const forImage = ref();

const addBook = ref<Books>({
  id: 0,
  image: '',
  accesion_no: 0,
  date_received: '',
  author: '',
  title: '',
  edition: '',
  volumes: '',
  cost_price: 0,
  publisher: '',
  copyright_yr: '',
  remarks: '',
  description: '',
});
</script>
