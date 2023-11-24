<template>
  <div class="bg-blue-1 text-dark column q-pa-md q-mt-xl q-gutter-y-md">
    <div class="self-center q-mb-xl">
      <q-toolbar-title>
        <q-avatar>
          <img :src="AppLogo" />
        </q-avatar>
        CPC Library
      </q-toolbar-title>
    </div>
    <div
      :class="
        Platform.is.mobile
          ? 'column q-gutter-y-md text-center content-center items-center'
          : 'row q-gutter-x-md'
      "
    >
      <div class="col column">
        <span>Providing Knowledge Since 2020</span>
        <span>Proudly Serving the CPC Community</span>
      </div>
      <div class="col column">
        <span>School CPC Founded in March 2005</span>
        <span>CPC Library Establish in July 2020</span>
      </div>
      <div class="col column">
        <div class="row q-gutter-x-sm q-mt-lg">
          <span class="text-bold">Address: </span>
          <span>Cordova, Poblacion, 6017, Cebu</span>
        </div>
        <div class="row q-gutter-x-sm">
          <span class="text-bold">Phone: </span>
          <span>(032) 494 1410</span>
        </div>
        <div class="row q-gutter-x-sm">
          <span class="text-bold">Email: </span>
          <span>cpc.library@gmail.com</span>
        </div>
      </div>
    </div>
    <div class="col self-center q-mt-xl">
      <span class="text-bold">© 2023 CPC Library. All Rights Reserved.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { Platform } from 'quasar';
import AppLogo from 'src/assets/applogo.png'

defineComponent({
  name: 'FooterComponent',
});
</script>
