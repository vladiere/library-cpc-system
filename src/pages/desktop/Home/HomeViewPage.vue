<template>
  <div class="column q-py-xl q-pl-xl q-pr-md q-mt-sm float-right" style="width: 82vw;">
    <div class="col column bg-orange-3 q-px-md q-pt-md q-pb-md shadow-8" style="border-radius: 15px;">
      <div class="row">
        <div class="col-1">
          <q-btn flat dense no-caps icon="account_circle"/>
        </div>
        <div class="col-11 row reverse">
          <q-btn icon="logout" label="Logout" class="q-ml-lg" no-caps flat dense />
          <q-btn icon="settings" flat dense no-caps />
          <q-btn icon="notifications" dense flat no-caps/>
        </div>
      </div>
      <q-separator color="grey-14" class="q-my-md" size="2px"/>
      <div class="fit row q-px-sm q-gutter-x-md">
        <div class="col row justify-between cursor-pointer bg-blue-grey-2 q-pa-md content-center shadow-5" style="border-radius: 15px;">
          <div class="column text-uppercase">
            <span class="text-subtitle2 text-grey-8">trend books</span>
            <span class="text-subtitle1 text-grey-10">20</span>
          </div>
          <q-img :src="TrendingBook" fit style="width: 30%;" avatar/>
        </div>
        <div class="col row justify-between cursor-pointer bg-blue-grey-2 q-pa-md content-center shadow-5" style="border-radius: 15px;">
          <div class="column text-uppercase">
            <span class="text-subtitle2 text-grey-8">online </span>
            <span class="text-subtitle1 text-grey-10">105</span>
          </div>
          <q-img :src="Online" fit style="width: 30%;" avatar/>
        </div>
        <div class="col row justify-between cursor-pointer bg-blue-grey-2 q-pa-md content-center shadow-5" style="border-radius: 15px;">
          <div class="column text-uppercase">
            <span class="text-subtitle2 text-grey-8">new register</span>
            <span class="text-subtitle1 text-grey-10">9</span>
          </div>
          <q-img :src="NewRegister" fit style="width: 30%;" avatar/>
        </div>
        <div class="col row justify-between cursor-pointer bg-blue-grey-2 q-pa-md content-center shadow-5" style="border-radius: 15px;">
          <div class="column text-uppercase">
            <span class="text-subtitle2 text-grey-8">recent visit</span>
            <span class="text-subtitle1 text-grey-10">120</span>
          </div>
          <q-img :src="MostVisit" fit style="width: 30%;" avatar/>
        </div>
      </div>
    </div>
    <div class="col row q-mt-lg q-gutter-x-md ">
      <div class="col">
        <VisitReport />
      </div>
      <div class="col">
        <BorrowReport />
      </div>
    </div>
    <div class="col shadow-8 q-mt-lg q-pa-md bg-blue-grey-4" style="border-radius: 15px;">
      <q-scroll-area style="height: 230px; max-width: 100%;" class="column">
        <div class="column justify-center content-center text-grey-10 text-h5 text-capitalize">
          <span>staff activities</span>
        </div>
        <div class="col">
        Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
        Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
        Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
        Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
        Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import TrendingBook from 'assets/desktop/trending.png'
import MostVisit from 'assets/desktop/most-visit.png'
import Online from 'assets/desktop/online.png'
import NewRegister from 'assets/desktop/new-register.png'
import VisitReport from 'components/desktop/Charts/VisitReportChart.vue'
import BorrowReport from 'components/desktop/Charts/BorrowedReport.vue'

defineComponent({
  name: 'HomeViewPage',
});
</script>
