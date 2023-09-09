<template>
  <div class="column text-capitalize q-gutter-y-md">
    <div
      class="col column q-px-md shadow-8 text-capitalize q-py-sm"
      style="border-radius: 15px"
    >
      <div class="col text-subtitle1">
        <span>overall books total</span>
        <q-separator color="grey-7" size="2px" />
      </div>
      <div class="col row">
        <div class="col column q-gutter-y-sm">
          <span class="text-h6">Library Books</span>
          <span>recent books</span>
          <span>old books</span>
        </div>
        <div class="col-2 column q-gutter-y-sm">
          <span class="text-h6">Total</span>
          <span>123</span>
          <span>321</span>
          <q-separator color="grey-7" size="2px" />
          <span>444 overall total</span>
        </div>
      </div>
    </div>
    <div class="col">
      <RecentBooks />
    </div>
    <div class="col">
      <OldBooks />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import RecentBooks from 'components/desktop/Resources/ViewResourcesRecent.vue';
import OldBooks from 'components/desktop/Resources/ViewResourcesOld.vue';

defineComponent({
  name: 'ViewResources',
});
</script>
