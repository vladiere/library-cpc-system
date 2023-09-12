<template>
  <div class="column q-gutter-y-md q-pt-lg">
    <div class="row justify-between">
      <span class="text-h5 text-bold">Renewal Records</span>
      <q-btn
        label="Accept All Renewal"
        no-caps
        color="teal-10"
        text-color="grey-4"
      />
    </div>
    <q-scroll-area
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      style="height: 500px; max-width: 100%"
    >
      <q-list bordered separator class="shadow-2">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar rounded>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            Dianna from BEED wants to renew | Book Title : The one two three |
            For : 3 day(s)
          </q-item-section>
          <q-item-section side>
            <div class="row q-gutter-x-xs">
              <q-btn flat dense icon="check_circle" color="teal">
                <q-tooltip
                  class="bg-teal-5 text-grey-12"
                  :delay="200"
                  transition-show="scale"
                  transition-hide="scale"
                  >Accept Renewal</q-tooltip
                >
              </q-btn>
              <q-btn flat dense icon="cancel" color="red-5">
                <q-tooltip
                  class="bg-red-7 text-grey-10"
                  :delay="200"
                  transition-show="scale"
                  transition-hide="scale"
                  >Cencel Renewal</q-tooltip
                >
              </q-btn>
            </div>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar rounded>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            Jake blue from BSIT want to renew | Book Title : The eleven seven |
            For : 1 day(s)
          </q-item-section>
          <q-item-section side>
            <div class="row q-gutter-x-xs">
              <q-btn flat dense icon="check_circle" color="teal">
                <q-tooltip
                  class="bg-teal-5 text-grey-12"
                  :delay="200"
                  transition-show="scale"
                  transition-hide="scale"
                  >Accept Renewal</q-tooltip
                >
              </q-btn>
              <q-btn flat dense icon="cancel" color="red-5">
                <q-tooltip
                  class="bg-red-7 text-grey-10"
                  :delay="200"
                  transition-show="scale"
                  transition-hide="scale"
                  >Cencel Renewal</q-tooltip
                >
              </q-btn>
            </div>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar rounded>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            zyphr from BSHM want to renew | Book Title : The eleven seven | For
            : 1 day(s)
          </q-item-section>
          <q-item-section side>
            <div class="row q-gutter-x-xs">
              <q-btn flat dense icon="check_circle" color="teal">
                <q-tooltip
                  class="bg-teal-5 text-grey-12"
                  :delay="200"
                  transition-show="scale"
                  transition-hide="scale"
                  >Accept Renewal</q-tooltip
                >
              </q-btn>
              <q-btn flat dense icon="cancel" color="red-5">
                <q-tooltip
                  class="bg-red-7 text-grey-10"
                  :delay="200"
                  transition-show="scale"
                  transition-hide="scale"
                  >Cencel Renewal</q-tooltip
                >
              </q-btn>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'RenewalRecords',
});

const thumbStyle = {
  right: '4px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '5px',
  opacity: 0.75,
};

const barStyle = {
  right: '2px',
  borderRadius: '9px',
  backgroundColor: '#027be3',
  width: '9px',
  opacity: 0.2,
};
</script>
