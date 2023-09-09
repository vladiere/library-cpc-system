<template>
  <div class="column text-capitalize q-mt-sm text-grey-8 q-py-xl text-grey-8 q-pl-xl q-pr-md q-gutter-y-md float-right" style="width: 82vw;">
    <div class="col q-px-xl">
     <SearchStaff />
    </div>
    <div class="col">
      <router-view />
    </div>
  </div>
</template>


<script setup lang="ts">
  import { defineComponent } from 'vue'
  import SearchStaff from 'components/desktop/Staff/SearchStaff.vue'

  defineComponent({
    name: 'StaffProfile'
  })
</script>
