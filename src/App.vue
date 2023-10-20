<template>
  <router-view v-slot="{ Component }">
        <transition apper v-bind="fadeTransition">
          <component :is="Component" />
        </transition>
      </router-view>
</template>

<script setup lang="ts">
import { fadeTransition } from './utils/transitions.ts'
</script>
