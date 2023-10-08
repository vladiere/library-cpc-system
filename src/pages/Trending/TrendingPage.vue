<style lang="sass" scoped>
.example-item
  height: 235px
  width: 170px
</style>

<template>
  <q-page>
    <div v-if="!$q.platform.is.mobile" class="q-pa-xl">
      <TrendingBooks :count="$q.platform.is.mobile ? 3 : 5" />
    </div>
    <div v-else class="row justify-center q-gutter-sm">
      <q-intersection
        v-for="index in 60"
        :key="index"
        transition="scale"
        class="example-item"
      >
        <q-card flat bordered>
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />

          <q-card-section>
            <div class="text-subtitle1">The book #{{ index }}</div>
            <div class="text-caption">by John Doe</div>
            <div class="column">
              <q-btn label="Reserve" />
            </div>
          </q-card-section>
        </q-card>
      </q-intersection>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import TrendingBooks from 'components/web/TrendingBooksCard.vue';
import { useQuasar } from 'quasar';

defineComponent({
  name: 'TrendingPage',
});

const $q = useQuasar();
</script>
