<template>
  <div class="row shadow-10 q-py-md justify-center" style="border-radius: 15px;">
    <div class="col-10">
      <q-input v-model="text" dense color="grey-10" label="ID/Lastname">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="col-1 column justify-center">
      <q-btn flat label="search" @click="findThisStaff"/>
    </div>
  </div>
</template>


<script setup lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRouter } from 'vue-router'

  defineComponent({
    name: 'SearchStaff'
  })

  const text = ref('')
  const router = useRouter()

  const findThisStaff = () => {
    router.push('/profile/staff')
  }
</script>
