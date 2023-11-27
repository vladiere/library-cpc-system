<template>
  <div class="fullscreen flex flex-center bg-blue-1 column q-gutter-y-md">
    <div :class="Platform.is.mobile ? 'text-h4 text-blue-8 text-weight-bolder' : 'text-h2 text-blue-8 text-weight-bolder'">CPC Library</div>
    <q-img :src="bookGIF" width="150px"/>
    <q-spinner-hourglass
      color="primary"
      size="2em"
    />
  </div>
</template>
<script setup lang="ts">
  import { defineComponent } from 'vue';
  import { Platform } from 'quasar';
  import bookGIF from 'src/assets/lineal-book.gif';

  defineComponent({
    name: 'LoadingComponent'
  });
</script>
