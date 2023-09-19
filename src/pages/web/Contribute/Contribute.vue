<template>
  <q-page padding>
    <span class="text-h4 text-grey-10 text-bold q-pl-lg">Contribute</span>
    <div
      :class="
        $q.platform.is.mobile
          ? ''
          : 'q-py-lg q-px-md q-ma-xl row content-center q-gutter-x-lg'
      "
      :style="
        $q.platform.is.mobile
          ? ''
          : 'border: 1px solid #212121; border-radius: 5px'
      "
    >
      <div class="col-6 column q-gutter-y-lg">
        <q-input
          color="grey-10"
          outlined
          dense
          v-model="books.title"
          label="Title"
        />
        <q-input
          color="grey-10"
          outlined
          dense
          v-model="books.author"
          label="Author"
        />
        <q-input
          color="grey-10"
          outlined
          dense
          v-model="books.category"
          label="Category"
        />
        <q-input
          color="grey-10"
          outlined
          dense
          v-model="books.publisher"
          label="Publisher"
        />
      </div>
      <div
        :class="
          $q.platform.is.mobile
            ? 'col-4 column q-mt-sm q-gutter-y-md'
            : 'col-4 column q-gutter-y-lg'
        "
      >
        <q-file
          outlined
          v-model="model"
          label="Attach File"
          dense
          color="grey-10"
          capture
          use-chips
        >
          <template v-slot:append>
            <q-icon name="attach_file" />
          </template>
        </q-file>
        <div
          :class="
            $q.platform.is.mobile ? 'column q-gutter-y-md' : 'row q-gutter-x-lg'
          "
        >
          <q-btn
            label="Add"
            dense
            class="text-subtitle1 q-px-md"
            rounded
            color="grey-9"
          />
          <q-btn
            label="Recommend"
            dense
            class="text-subtitle1 q-px-md"
            rounded
            color="teal-9"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';
defineComponent({
  name: 'ContributePage',
});

interface Book {
  title: string;
  author: string;
  category: string;
  publisher: string;
}

const $q = useQuasar();
const model = ref(null);
const books = ref<Book>({
  title: '',
  author: '',
  category: '',
  publisher: '',
});
</script>
