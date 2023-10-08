<template>
  <div class="column q-gutter-y-md q-px-md">
    <span class="text-caption cursor-pointer"  @click="gotoLink('/userbooks')">
      <q-icon name="arrow_back" size="1rem"/>
        My Books
    </span>
    <span class="text-h6 text-grey-9">Borrows History</span>
    <div v-if="borrowedHistoryBooks.length === 0" class="fit column items-center content-center q-pb-md" >
      <q-img :src="EmptyBox" style="width: 10rem;"/>
      <span class="text-h6 text-grey-9">You do not have any History records here</span>
    </div>
    <q-scroll-area v-else style="height: 300px; max-width: 100%;" >
      <q-list separator>
        <q-item v-ripple v-for="borrowedHistoryBook in borrowedHistoryBooks" :key="borrowedHistoryBook.id">
          <q-item-section>
            <q-item-label>{{ borrowedHistoryBook.title }}</q-item-label>
            <q-item-caption class="text-grey-9">Borrowed: {{ borrowedHistoryBook.dateBorrowed }}, Pickup: {{ borrowedHistoryBook.datePickup}}, Returned {{ borrowedHistoryBook.dateReturn}}</q-item-caption>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import EmptyBox from 'assets/empty-folder.png'

  defineComponent({
    name: 'BorrowsHistoryPages'
  })

  interface BorrowedHistoryBook {
    id: number;
    title: string;
    dateBorrowed: string;
    datePickup: string;
    dateReturn: string;
  }

  const router = useRouter()

  console.log(EmptyBox)

  const borrowedHistoryBooks = ref<BorrowedHistoryBook[]>([
    {
      id: 1,
      title: 'The Great Gatsby',
      dateBorrowed: '2023-06-15',
      datePickup: '2023-06-16',
      dateReturn: '2023-07-01',
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      dateBorrowed: '2023-06-20',
      datePickup: '2023-06-21',
      dateReturn: '2023-07-05',
    },
    {
      id: 3,
      title: '1984',
      dateBorrowed: '2023-06-25',
      datePickup: '2023-06-26',
      dateReturn: '2023-07-10',
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      dateBorrowed: '2023-06-30',
      datePickup: '2023-07-01',
      dateReturn: '2023-07-15',
    },
    {
      id: 5,
      title: 'The Hobbit',
      dateBorrowed: '2023-07-05',
      datePickup: '2023-07-06',
      dateReturn: '2023-07-20',
    },
    {
      id: 6,
      title: 'The Catcher in the Rye',
      dateBorrowed: '2023-07-05',
      datePickup: '2023-04-06',
      dateReturn: '2023-04-20',
    },
    {
      id: 7,
      title: 'Brave New World',
      dateBorrowed: '2023-07-05',
      datePickup: '2023-08-16',
      dateReturn: '2023-08-22',
    },
    {
      id: 8,
      title: 'Lord of the Flies',
      dateBorrowed: '2023-07-05',
      datePickup: '2023-02-11',
      dateReturn: '2023-02-14',
    },
    {
      id: 9,
      title: 'Animal Farm',
      dateBorrowed: '2023-07-05',
      datePickup: '2023-02-11',
      dateReturn: '2023-02-14',
    },
    {
      id: 10,
      title: 'The Alchemist',
      dateBorrowed: '2023-07-05',
      datePickup: '2023-02-11',
      dateReturn: '2023-02-14',
    },
  ])

  const gotoLink = (link : string) => {
    router.push(link)
  }
</script>
