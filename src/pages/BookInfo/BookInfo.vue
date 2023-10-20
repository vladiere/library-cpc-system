<template>
  <q-page padding class="q-mb-lg">
    <div
      :class="
        Platform.is.mobile
          ? 'fit column wrap q-pt-md'
          : 'fit row wrap  q-pa-xl'
      "
    >
      <div
        class="col-3 q-px-md column q-gutter-y-md items-center q-py-sm"
        style="border: 1px solid #455a64; border-radius: 5px"
      >
        <q-img
          src="https://www.picsum.photos/1200/900"
          style="height: 200px; max-width: 260px"
        />
        <q-rating
          v-model="ratingModel"
          size="1.7em"
          color="teal-10"
          icon="star_border"
          icon-selected="star"
        />
        <q-btn
          color="teal-7"
          text-color="blue-grey-10"
          label="Reserve"
          rounded
        />
        <div class="row">
          <q-btn
            icon="fa-regular fa-square-plus"
            flat
            text-color="blue-grey-10"
          >
            <q-tooltip class="bg-light-green-4 text-grey-10"
              >Add to List</q-tooltip
            >
          </q-btn>
          <q-btn icon="library_add" flat text-color="blue-grey-10">
            <q-tooltip class="bg-light-green-4 text-grey-10"
              >Add to Collection</q-tooltip
            >
          </q-btn>
        </div>
      </div>
      <div
        :class="
          Platform.is.mobile
            ? 'col-9 bordered column q-ml-sm'
            : 'col-9 bordered column q-pl-lg'
        "
      >
        <div :class="Platform.is.mobile ? 'text-h6' : 'text-h5'">
          Title:
          <span class="text-subtitle1">
            The Experience of God: Being, Consciousness, Bliss
          </span>
        </div>
        <div :class="Platform.is.mobile ? 'text-h6' : 'text-h5'">
          Author:
          <span class="text-subtitle1"> David Bentley Hart </span>
        </div>
        <div :class="Platform.is.mobile ? 'text-h6' : 'text-h5'">
          Publisher:
          <span class="text-subtitle1"> David Bentley Hart </span>
        </div>
        <div :class="Platform.is.mobile ? 'text-h6' : 'text-h5'">
          Date:
          <span class="text-subtitle1"> August 27, 2013 </span>
        </div>
        <div :class="Platform.is.mobile ? 'text-h6' : 'text-h5'">
          Value:
          <span class="text-subtitle1"> 980 </span>
        </div>
      </div>
    </div>
    <ThisAuthor class="q-mt-md" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Platform } from 'quasar';
import ThisAuthor from 'components/ThisAuthor.vue';
import { useRouter } from 'vue-router';


const ratingModel = ref(0);
const router = useRouter();

console.log(router)

</script>
