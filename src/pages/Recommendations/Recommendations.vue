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
    <div class="row justify-center q-gutter-sm q-mt-lg">
      <q-intersection
        v-for="item in recommendationInstructor"
        :key="item.recomendation_id"
        transition="scale"
        :class="!Platform.is.mobile ? 'on-notmobile q-mb-md' : 'on-mobile'"
      >
        <q-card flat bordered>
          <q-img :src="`https://picsum.photos/1200/800?random=${index}`" spinner-color="primary" />

          <q-card-section>
            <q-item-label lines="2" class="text-subtitle1 text-capitalize">{{ item.title }}</q-item-label>
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
import { defineComponent, onMounted, ref } from 'vue';
import { Platform } from 'quasar';
import { jwtDecode } from 'jwt-decode';
import { useUserStore } from 'stores/user-store';
import recommendations from 'src/utils/Books/recommendation';
import { IRecommendedInstructor, IRecommendPersonal } from 'src/utils/recommendation';
import { useRecommendationStore } from 'stores/recommendation-store';


defineComponent({
  name: 'RecommendationPage',
});

const userStore = useUserStore();
const recommendationStore = useRecommendationStore();
const decoded = jwtDecode(userStore.token);
const recommendationInstructor = ref<IRecommendedInstructor>([]);
const recommendationPersonal = ref<IRecommendPersonal>([]);

onMounted(async() => {
  if (recommendationInstructor.value.length === 0 || recommendationPersonal.value.lenght === 0) {
    await recommendations.getAllRecommendations();
  }

  if (decoded.privilege === 'instructor') {
    recommendationInstructor.value = await recommendationStore.getRecommendations;
  } else if (decoded.privilege === 'student') {
    recommendationPersonal.value = await recommendationStore.getRecommendations;
  }
});
</script>
