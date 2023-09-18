<template>
  <div class="column q-pt-lg q-pr-lg">
    <div class="row justify-between">
      <q-btn flat icon="arrow_left" label="Back" to="/resources/add" />
      <q-btn
        color="teal-3"
        text-color="grey-10"
        label="Add Records"
        @click="handleBtnAddRecords"
        v-if="tableConfig.rows.length !== 0"
        :loading="loading"
      />
    </div>
    <div
      v-if="tableConfig.rows.length === 0"
      class="row justify-center q-pt-lg"
    >
      <q-uploader
        color="blue"
        :url="getUrl"
        auto-upload
        label="Upload Excel file"
        field-name="exceldata"
        :headers="[
          { name: 'Authorization', value: `Bearer ${userStore.token}` },
        ]"
        accept=".xlsx, .xls"
        @rejected="onRejected"
        @uploaded="onFileUploaded"
      />
    </div>
    <div v-if="tableConfig.rows.length !== 0" class="q-pt-lg">
      <q-table
        flat
        bordered
        dense
        :pagination="{
          rowsPerPage: 20,
          sortBy: 'name',
        }"
        :filter="filter"
        :rows="tableConfig.rows"
        :columns="tableConfig.columns"
        :row-key="tableConfig.rowKey"
        style="width: 76vw !important"
      >
        <template v-slot:top>
          <span class="text-h6 text-bold">Accession Records</span>
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
            <template v-if="filter" v-slot:append>
              <q-icon
                name="close"
                color="red"
                @click.stop.prevent="filter = null"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
    <div v-else class="self-center q-pt-xl text-grey-6 text-h3 text-bold">
      No Bulk upload results
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, defineComponent, ref } from 'vue';
import { useUserStore } from 'src/stores/user';
import { api } from 'src/boot/axios';

defineComponent({
  name: 'BulkUploads',
});

const rows = ref<string[][]>([]);
const $q = useQuasar();
const userStore = useUserStore();
const filter = ref(null);
const dataToSend = ref(Object);
const loading = ref(false);

const onRejected = (rejectedEntries: any) => {
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
  });
};

const getUrl = () => {
  return 'http://localhost:1337/api/upload/excel';
};

const columns = ref([
  {
    name: 'Accession No',
    require: true,
    label: 'Accession No.',
    align: 'center',
    field: 'Accession No',
    sortable: true,
  },
  {
    name: 'Date Received',
    require: true,
    label: 'Date Received',
    align: 'center',
    field: 'Date Received',
    sortable: true,
  },
  {
    name: 'Author',
    require: true,
    label: 'Author',
    align: 'center',
    field: 'Author',
    sortable: true,
  },
  {
    name: 'Title of the Book',
    require: true,
    label: 'Title of the Book',
    align: 'center',
    field: 'Title of the Book',
    sortable: true,
  },
  {
    name: 'Edition',
    require: true,
    label: 'Edition',
    align: 'center',
    field: 'Edition',
    sortable: true,
  },
  {
    name: 'Volumes',
    require: true,
    label: 'Volumes',
    align: 'center',
    field: 'Volumes',
    sortable: true,
  },
  {
    name: 'Publisher',
    require: true,
    label: 'Publisher',
    align: 'center',
    field: 'Publisher',
    sortable: true,
  },
  {
    name: 'Cost Price',
    require: true,
    label: 'Cost Price',
    align: 'center',
    field: 'Cost Price',
    sortable: true,
  },
  {
    name: 'Copyright Yr',
    require: true,
    label: 'Copyright Yr.',
    align: 'center',
    field: 'Copyright Yr',
    sortable: true,
  },
  {
    name: 'Remarks',
    require: true,
    label: 'Remarks',
    align: 'center',
    field: 'Remarks',
    sortable: true,
  },
]);

const onFileUploaded = (res: any) => {
  const responseData = JSON.parse(res.xhr.response);
  const jsonData = responseData.jsonData;
  dataToSend.value = jsonData;

  // Initialize a variable to store the previous values of columns
  const previousValues: any = {};

  rows.value = jsonData.map((item: any) => {
    const row: any = {};

    columns.value.forEach((col, index) => {
      if (
        item.hasOwnProperty(col.field) &&
        item[col.field] !== null &&
        item[col.field] !== undefined
      ) {
        let cellValue = item[col.field];
        if (cellValue === '"') {
          cellValue = previousValues[col.field] || '';
        } else if (col.field === 'Date Received' && !isNaN(cellValue)) {
          const excelDate = parseInt(cellValue);
          const jsDate = new Date((excelDate - (25567 + 1)) * 86400 * 1000);
          cellValue = jsDate.toDateString();
        } else {
          cellValue = cellValue.toString();
        }
        row[col.field] = cellValue;

        previousValues[col.field] = cellValue;
      } else if (previousValues.hasOwnProperty(col.field)) {
        if (item[col.field] === '"') {
          row[col.field] = previousValues[col.field] || '';
        } else {
          row[col.field] = '';
        }
      } else {
        row[col.field] = '';
      }
    });

    return row;
  });
};

const tableConfig = computed(() => {
  return {
    rows: rows.value,
    columns: columns.value,
    rowKey: 'Accession No.',
  };
});

const convertToLowerCase = (obj: any) => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].toLowerCase();
    } else if (typeof obj[key] === 'object') {
      obj[key] = convertToLowerCase(obj[key]);
    }
  }
  return obj;
};

// Function to send a batch of data to the backend
const sendBatchToBackend = async (batch: any, token: string) => {
  loading.value = true;

  try {
    // Convert batch to lowercase
    const jsonData = convertToLowerCase(batch);

    const response = await api.post(
      'add/bulk/records',
      {
        jsonData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Response from the backend:', response.data);
    loading.value = false;
    return response.data;
  } catch (error) {
    console.error('Error sending JSON data to the backend:', error);
    throw error;
  }
};

// Handles button when click to add
const handleBtnAddRecords = async () => {
  try {
    const jsonData = rows.value;
    const token = userStore.token;

    const batchSize = 100; // Number of rows to send in each batch
    const totalRows = jsonData.length;

    // Split data into smaller batches
    const batches = [];
    for (let i = 0; i < totalRows; i += batchSize) {
      const start = i;
      const end = Math.min(i + batchSize, totalRows);
      batches.push(jsonData.slice(start, end));
    }

    // Send batches concurrently
    const promises = batches.map((batch) => sendBatchToBackend(batch, token));

    // Wait for all promises to resolve
    const responses = await Promise.all(promises);

    console.log(responses);
    // Handle the responses from the backend as needed
  } catch (error) {
    // Handle the error as needed
    console.error(error);
  }
};
</script>
