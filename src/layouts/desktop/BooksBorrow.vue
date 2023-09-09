<template>
  <div
    class="column text-capitalize q-gutter-x-md q-mt-lg text-grey-10 q-py-xl text-grey-8 q-pl-xl q-pr-xl q-gutter-y-md float-right"
    style="width: 82vw"
  >
    <span class="text-h5 text-bold">Borrow</span>
    <div class="row q-gutter-x">
      <q-btn-dropdown color="grey-10" label="Folders" flat dense>
        <q-list>
          <q-item clickable v-close-popup @click="handleShow('all')">
            <q-item-section avatar>
              <q-avatar icon="folder" color="primary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Photos</q-item-label>
              <q-item-label caption>February 22, 2016</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info" color="amber" />
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="handleShow('recent')">
            <q-item-section avatar>
              <q-avatar
                icon="assignment"
                color="secondary"
                text-color="white"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>Vacation</q-item-label>
              <q-item-label caption>February 22, 2016</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info" color="amber" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <Borrow v-if="showBorrow" />
    <div v-if="showTesting" class="row">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate eos
      dolorem molestias deserunt commodi? Corrupti, similique natus inventore
      soluta ullam eum necessitatibus, tempore deleniti quam, aliquam iusto
      eligendi recusandae id!
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import Borrow from 'src/components/desktop/Circulation/Borrow.vue';

defineComponent({
  name: 'BooksBorrow',
});

const showBorrow = ref(false);
const showTesting = ref(true);
const handleShow = (action: string) => {
  if (action === 'all') {
    showTesting.value = false;
    showBorrow.value = true;
  } else if (action === 'recent') {
    showBorrow.value = false;
    showTesting.value = true;
  }
};
</script>
