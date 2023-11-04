<template>
    <div class="row q-gutter-md">
    <div class="column q-gutter-y-sm" v-for="index in 6" :key="index">
      <q-skeleton width="170px" height="210px" />
        <q-skeleton width="170px" height="20px" />
        <q-skeleton width="170px" height="20px" />
        <q-skeleton width="120px" height="10px" />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
