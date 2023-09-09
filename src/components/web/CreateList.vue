<template>
  <div class="column q-gutter-y-md">
    <span class="text-caption cursor-pointer"  @click="gotoLink('/userbooks')">
      <q-icon name="arrow_back" size="1rem"/>
        My Books
    </span>
    <div class="column q-px-lg q-pt-xs q-pb-lg q-gutter-y-md">
      <span class="text-h6 text-grey-10">Create My List</span>
      <q-input dense square outlined color="grey-10" label="List Name"/>
      <q-input
          dense
          outlined
          square
          autogrow
          label="List Description"
          color="grey-10"
      />
        <span class="text-subtitle1 text-grey-9">Books available in your collection</span>
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="height: 32vh; max-width: 100%;"
      >
        <div class="row items-center content-center q-ml-md">
          <q-img
            v-for="image in images"
            :key="image.id"
            :src="image.link"
            spinner-color="white"
            style="height: 200px; max-width: 150px"
            class="q-ma-sm rounded-borders"
          >
          <div class="absolute-bottom text-subtitle1 text-center column">
            {{ image.title }}
            <q-btn flat dense size="sm" class="text-subtitle2 text-bold" icon="add">
              <q-tooltip class="bg-teal-5 text-grey-10">Add to list</q-tooltip>
            </q-btn>
          </div>
          </q-img>
        </div>
      </q-scroll-area>
      <div class="row">
        <q-btn label="Create" dense color="blue-grey-5" size="md" class="text-subtitle1 text-grey-10 q-px-md"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useQuasar } from 'quasar'

  defineComponent({
    name: 'CreateListComponent'
  })

  const router = useRouter()
  const $q = useQuasar()

  const gotoLink = (link : string) => {
    router.push(link)
  }

  interface Image {
    id: number;
    link: string;
  }

  const thumbStyle = ref({
    right: '4px',
    borderRadius: '5px',
    backgroundColor: '#027be3',
    width: '5px',
    opacity: 0.75
  })

  const barStyle = ref({
    right: '2px',
    borderRadius: '9px',
    backgroundColor: '#027be3',
    width: '9px',
    opacity: 0.2
  })

  const images = ref<Image[]>([
    { id: 1, link: 'https://picsum.photos/200/300?random=1', title: 'The one', status: 'pending'},
    { id: 2, link: 'https://picsum.photos/200/300?random=2', title: 'The two', status: 'should return'},
    { id: 3, link: 'https://picsum.photos/200/300?random=3', title: 'The three', status: 'pending'},
    { id: 4, link: 'https://picsum.photos/200/300?random=4', title: 'The four', status: 'should return'},
    { id: 5, link: 'https://picsum.photos/200/300?random=5', title: 'the five', status: 'pending'},
    { id: 5, link: 'https://picsum.photos/200/300?random=6', title: 'the six', status: 'should return'},
    { id: 5, link: 'https://picsum.photos/200/300?random=7', title: 'the seven', status: 'pending'},
    { id: 5, link: 'https://picsum.photos/200/300?random=8', title: 'the eight', status: 'should return'},
  ])


</script>
