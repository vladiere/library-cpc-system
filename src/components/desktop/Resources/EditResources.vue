<template>
  <div class="column text-capitalize q-pt-lg">
    <div class="col row">
      <q-btn flat dense label="Back" icon="arrow_left" to="/resources/manage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

defineComponent({
  name: 'EditResources',
});

interface DataPass {
  name: string;
  calories: string;
  fat: string;
  carbs: string;
  protein: string;
  sodium: string;
  calcium: string;
  iron: string;
}

const router = useRouter();

const queryData = router.currentRoute.value.query.dataJSON as string;
const parseData = JSON.parse(queryData) as DataPass;

const dataObject = ref<DataPass>(parseData);

onMounted(() => {
  console.log(dataObject.value);
});
</script>
