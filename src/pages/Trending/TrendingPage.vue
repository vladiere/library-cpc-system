<style lang="sass" scoped>
.on-notmobile
  height: 335px
  width: 330px
.on-mobile
  height: 235px
  width: 170px
</style>

<template>
  <q-page>
    <div class="row justify-center q-gutter-sm q-pt-md">
      <q-intersection
        v-for="index in 20"
        :key="index"
        transition="scale"
        :class="!Platform.is.mobile ? 'on-notmobile' : 'on-mobile'"
      >
        <q-card flat bordered>
          <q-img src="https://cdn.quasar.dev/img/mountains.jpg" />

          <q-card-section>
            <div class="text-subtitle1">The book #{{ index }}</div>
            <div class="text-caption">by John Doe</div>
            <div class="row justify-between">
              <q-btn label="Reserve" color="primary" rounded />
              <q-btn
                flat
                icon="mdi-information-outline"
                color="dark"
                round
                to="/book"
              >
                <q-tooltip class="bg-grey-8 text-grey-3"
                  >Book Information</q-tooltip
                >
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </q-intersection>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import { Platform } from 'quasar';

defineComponent({
  name: 'TrendingPage',
});
</script>
