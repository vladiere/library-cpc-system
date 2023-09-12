<template>
  <div class="column text-capitalize q-pt-lg">
    <div class="row q-gutter-x-md q-pl-md">
      <q-btn
        class="glossy"
        icon-right="send"
        @click="handleRouteClick"
        :label="theLabel"
      />
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

defineComponent({
  name: 'ReservationHolds',
});

const router = useRouter();
const theRoute = ref();
const theLabel = ref('see holds records');

const handleRouteClick = () => {
  if (theRoute.value === 'ReservationsView' || undefined) {
    theLabel.value = 'see reservations records';
    router.replace('/reservations-holds/holds');
  } else {
    theLabel.value = 'see holds records';
    router.replace('/reservations-holds');
  }
};

watchEffect(() => {
  theRoute.value = router.currentRoute.value.name ?? undefined;
});
</script>
