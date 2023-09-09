<style lang="scss">
.hover-effect {
  span:hover {
    color: #212121;
  }
}
</style>

<template>
  <q-page padding>
    <div class="bg-blue-grey-4 q-ma-xl q-pa-lg" style="border-radius: 5px">
      <div class="fit column q-gutter-y-md">
        <span class="text-h4 text-grey-9 text-bold q-pl-md">Advance Search</span>
        <div class="text-grey-14 text-subtitle1 q-ml-lg q-mr-xl grow q-pb-sm hover-effect" style="border-bottom: 2px solid #546e7a" >
          <span class="cursor-pointer" @click="gotoSearch('/search/book')">Books</span>
          <span class="cursor-pointer q-px-xl" @click="gotoSearch('/search/author')">Author</span>
          <span class="cursor-pointer" @click="gotoSearch('/search/inside')">Search Inside</span>
          <span class="cursor-pointer q-pl-xl" @click="gotoSearch('/advancesearch')">Advance Search</span>
        </div>
      <router-view />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'

  defineComponent({
    name: 'AdvanceSearch'
  })

  const router = useRouter()

  const gotoSearch = (name: string) => {
    console.log(name)
    router.push(name)
  }

</script>
