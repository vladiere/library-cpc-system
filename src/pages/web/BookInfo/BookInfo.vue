<template>
  <q-page>
    <div
      :class="
        $q.platform.is.mobile
          ? 'fit column wrap q-pa-non'
          : 'fit row wrap  q-pa-xl'
      "
    >
      <div
        class="col-2 q-px-md column q-gutter-y-md items-center q-py-sm"
        style="border: 1px solid #455a64; border-radius: 5px"
      >
        <q-img
          src="https://www.picsum.photos/200/900"
          style="height: 200px; max-width: 160px"
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
          $q.platform.is.mobile
            ? 'col-10 bordered column q-ml-sm'
            : 'col-10 bordered column q-pl-lg'
        "
      >
        <div :class="$q.platform.is.mobile ? 'text-h6' : 'text-h5'">
          Title:
          <span class="text-subtitle1">
            The Experience of God: Being, Consciousness, Bliss
          </span>
        </div>
        <div :class="$q.platform.is.mobile ? 'text-h6' : 'text-h5'">
          Author:
          <span class="text-subtitle1"> David Bentley Hart </span>
        </div>
        <div :class="$q.platform.is.mobile ? 'text-h6' : 'text-h5'">
          Publisher:
          <span class="text-subtitle1"> David Bentley Hart </span>
        </div>
        <div :class="$q.platform.is.mobile ? 'text-h6' : 'text-h5'">
          Date:
          <span class="text-subtitle1"> August 27, 2013 </span>
        </div>
        <div :class="$q.platform.is.mobile ? 'text-h6' : 'text-h5'">
          Value:
          <span class="text-subtitle1"> 980 </span>
        </div>
        <div class="text-caption q-pt-md text-italic">
          Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit
          enim labore culpa sint ad nisi Lorem pariatur mollit ex esse
          exercitation amet. Nisi anim cupidatat excepteur officia.
          Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
          voluptate dolor minim nulla est proident. Nostrud officia pariatur ut
          officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit
          commodo officia dolor Lorem duis laboris cupidatat officia voluptate.
          Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis
          officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis
          sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea
          consectetur et est culpa et culpa duis.
        </div>
      </div>
    </div>
    <ThisAuthor class="q-mt-md" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import ThisAuthor from 'components/web/ThisAuthor.vue';

const $q = useQuasar();

const ratingModel = ref(0);
</script>
