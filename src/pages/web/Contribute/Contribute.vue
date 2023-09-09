<template>
  <q-page padding>
    <span class="text-h4 text-grey-10 text-bold q-pl-lg">Contribute</span>
    <div class="q-py-lg q-px-md q-ma-xl row content-center q-gutter-x-lg" style="border: 1px solid #212121; border-radius: 5px">
      <div class="col-6 column q-gutter-y-lg">
        <q-input color="grey-10" outlined dense v-model="text" label="Title" />
        <q-input color="grey-10" outlined dense v-model="text" label="Author" />
        <q-input color="grey-10" outlined dense v-model="text" label="Category" />
        <q-input color="grey-10" outlined dense v-model="text" label="Publisher" />
      </div>
      <div class="col-4 column q-gutter-y-lg">
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
        <div class="row q-gutter-x-lg">
          <q-btn label="Add" dense class="text-subtitle1 q-px-md" rounded color="grey-9"/>
          <q-btn label="Recommend" dense class="text-subtitle1 q-px-md" rounded color="teal-9"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { defineComponent, ref } from 'vue'
  defineComponent({
    name: 'ContributePage'
  })

  const model = ref()
</script>
