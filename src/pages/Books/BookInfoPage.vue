<style lang="sass" scoped>
.q-mt-xl
  margin-top: 8em

.q-mt-lg-i
  margin-top: 3em

.left-container
  width: 100%
  max-width: 380px

  img
    width: 100%
    height: 420px
    border-radius: 5px

.text-underline
  text-decoration: underline
</style>

<template>
  <q-page padding class="q-mb-lg">
    <div class="row q-gutter-x-xl q-mt-xl q-ml-xl">
      <div class="col column q-gutter-y-md left-container">
        <img src="https://picsum.photos/1200/900" class="shadow-2"/>
        <div class="row q-gutter-x-md justify-center">
          <q-icon name="mdi-bookmark-plus" size="3em" color="blue-9"/>
          <q-btn label="Reserve" color="blue-9" padding="5px 20px"/>
          <q-icon name="mdi-plus-box" size="3em" color="blue-9"/>
        </div>
      </div>
      <div class="col column q-gutter-y-md">
        <span class="text-h4 text-capitalize text-blue-9 text-weight-light">The seven eleven warriors</span>
        <span class="text-h6 text-capitalize q-mt-lg text-weight-light">
          by
          <span class="text-underline">john doe</span>
        </span>
        <div class="column q-gutter-y-md q-mt-lg-i text-h6 text-weight-light">
          <div class="col row q-gutter-x-sm">
            <span>Edition:</span>
            <span>the rocks</span>
          </div>
          <div class="col row q-gutter-x-sm">
            <span>Publisher:</span>
            <span>the rocks</span>
          </div>
          <div class="col row q-gutter-x-sm items-center">
            <span>Copies:</span>
            <span>the rocks</span>
            <span class="text-blue-9 text-subtitle1">(Available)</span>
          </div>
          <div class="col row q-gutter-x-sm">
            <span>Value:</span>
            <span>the rocks</span>
          </div>
          <div class="col row q-gutter-x-sm text-h2">
            <span class="text-blue">Not Available</span>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Platform } from 'quasar';
import ThisAuthor from 'components/ThisAuthor.vue';

const ratingModel = ref(0);

</script>
