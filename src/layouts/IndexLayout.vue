<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-green-1 text-black">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img :src="Logo" />
          </q-avatar>
          CPC Library
        </q-toolbar-title>
        <q-spacer />
        <div class="row q-gutter-md">
          <span>About</span>
          <span>Contact Us</span>
          <router-link to="/login">Login</router-link>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import Logo from 'src/assets/logo.png';

defineComponent({
  name: 'IndexLayout',
});
</script>
