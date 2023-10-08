<style lang="sass" scoped>
.example-item
  height: 235px
  width: 170px
</style>

<template>
  <q-page>
    <div v-if="!Platform.is.mobile" class="q-pa-xl">
      <BooksCard />
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
import BooksCard from 'components/BooksCard.vue';
import { Platform } from 'quasar';

defineComponent({
  name: 'RecentBooksPage',
});
</script>
