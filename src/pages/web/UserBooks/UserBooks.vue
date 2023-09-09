<style lang="scss">
.span-cursor span {
  cursor: pointer;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #212121; /* Change this to your preferred color */
    bottom: -2px;
    left: 0;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.3s ease-in-out;
  }

  &:hover::before {
    transform: scaleX(1)
  }
}
  .see-all:hover {
    cursor: pointer;
    color: #212121;
  }
</style>

<template>
  <q-page padding>
    <div class="q-mx-xl q-px-lg q-py-md bg-blue-grey-13 text-capitalize" style="border-radius: 5px;">
      <div class="fit row">
        <div class="col-3 column text-subtitle1 q-mr-lg">
          <div class="column items-center content-center bg-blue-grey-4 text-subtitle2 text-grey-9 q-py-sm">
           Descartin, Lance Phillip B.
           <span class="text-caption">ID: 20200800</span>
          </div>
          <q-list dense padding>
            <q-item clickable v-ripple @click="gotoLink('/userbooks/collections')">
              <q-item-section class="row justify-between">
                My Collections
              </q-item-section>
              <q-item-section avatar>
                <q-icon name="arrow_forward"/>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="gotoLink('/userbooks/borrowshistory')">
              <q-item-section class="row justify-between">
                Borrows History
              </q-item-section>
              <q-item-section avatar>
                <q-icon name="arrow_forward"/>
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator color="grey-9" class="q-my-lg"/>
          <div class="row q-px-sm content-center justify-between bg-blue-grey-4 text-subtitle2 text-grey-9">
            <span>My List</span>
            <span class="text-caption see-all" @click="gotoLink('/userbooks/mylists')">See All <q-icon name="navigate_next" size="1rem"/></span>
          </div>
          <div v-if="lists.length === 0" class="column content-center q-mt-sm">
            <span class="text-subtitle1 text-grey-8">Empty List</span>
          </div>
          <div v-else class="column">
            <q-list dense padding separator class="q-x-sm">
              <q-item v-for="list in lists" :key="list.id" clickable :to="list.link">
                <q-item-section>
                  {{ list.title }}
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <q-separator vertical color="grey-9" class="q-mx-sm" />
        <div class="col-8">
          <router-view />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRouter } from 'vue-router'

  defineComponent({
    name: 'UserBooksPage'
  })

  interface List {
    id: number;
    title: string;
    link: string
  }

  const router = useRouter()

  const gotoLink = (link : string) => {
    router.push(link)
  }

  const lists = ref<List[]>([
    { id: 1, title: 'code complete', link: '/userbooks/mylists/lists' },
    { id: 2, title: 'clean code', link: '/userbooks/mylists/lists'}
  ])
</script>
