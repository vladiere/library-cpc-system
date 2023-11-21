<style lang="sass" scoped>
.on-notmobile
  height: 335px
  width: 300px
.on-mobile
  height: 235px
  width: 170px
</style>

<template>
  <q-page>
    <div class="column justify-center text-h6 text-weight-light q-my-md q-ml-lg">
      Note: if you are an intructor, your recommendations will be shown publicly to the others.
    </div>
    <div class="row justify-center q-gutter-sm q-mt-lg">
      <q-intersection
        v-for="index in 10"
        :key="index"
        transition="scale"
        :class="!Platform.is.mobile ? 'on-notmobile q-mb-md' : 'on-mobile'"
      >
        <q-card flat bordered>
          <q-img :src="`https://picsum.photos/1200/800?random=${index}`" spinner-color="primary" />

          <q-card-section>
            <div class="text-subtitle1">The book #{{ index }}</div>
            <div class="text-caption">by John Doe</div>
            <div class="row ">
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
import { jwtDecode } from 'jwt-decode';
import { useUserStore } from 'stores/user-store';

defineComponent({
  name: 'RecommendationPage',
});

const userStore = useUserStore();
const decoded = jwtDecode(userStore.token);

console.log(decoded)
</script>
