<template>
  <div class="column q-gutter-y-md q-mt-xl">
    <div v-if="bookCollections.length === 0" class="fit column items-center content-center q-pb-md" >
      <q-img :src="ManNothing" style="width: 10rem;"/>
        <span class="text-h6 text-grey-9">You do not have any Book Collections here</span>
    </div>
    <div v-else class="fit column q-pb-md">
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import ManNothing from 'assets/man-nothing.png'

  defineComponent({
    name: 'CollectionsPages'
  })

  interface BookCollection {
    id: number;
    title: string;
  }

  const router = useRouter()

  const gotoLink = (link : string) => {
    router.push(link)
  }

  const bookCollections = ref<BookCollection[]>([])
</script>
