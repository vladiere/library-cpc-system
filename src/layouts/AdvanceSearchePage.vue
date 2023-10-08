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
          <span class="cursor-pointer" to="search_books">Books</span>
          <span class="cursor-pointer q-px-xl" to="search_authors">Authors</span>
          <span class="cursor-pointer" to="inside_search">Search Inside</span>
          <span class="cursor-pointer q-pl-xl" to="advancesearch">Advance Search</span>
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
    name: 'AdvanceSearchPage'
  })

  const router = useRouter()

  const searches = (name: string) => {
      router.push(name)
  }
</script>
