<template>
  <div>
    <div class="col row q-mt-lg q-gutter-x-md">
      <div class="col">
        <VisitReport />
      </div>
      <div class="col">
        <BorrowReport />
      </div>
    </div>
    <div
      class="col shadow-8 q-mt-lg q-pa-md bg-blue-grey-4"
      style="border-radius: 15px"
    >
      <q-scroll-area style="height: 230px; max-width: 100%" class="column">
        <div
          class="column justify-center content-center text-grey-10 text-h5 text-capitalize"
        >
          <span>staff activities</span>
        </div>
        <div class="col">
          Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit
          enim labore culpa sint ad nisi Lorem pariatur mollit ex esse
          exercitation amet. Nisi anim cupidatat excepteur officia.
          Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
          voluptate dolor minim nulla est proident. Nostrud officia pariatur ut
          officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit
          commodo officia dolor Lorem duis laboris cupidatat officia voluptate.
          Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis
          officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis
          sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea
          consectetur et est culpa et culpa duis. Lorem ipsum dolor sit amet,
          officia excepteur ex fugiat reprehenderit enim labore culpa sint ad
          nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim
          cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem
          est aliquip amet voluptate voluptate dolor minim nulla est proident.
          Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt
          ex occaecat reprehenderit commodo officia dolor Lorem duis laboris
          cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi
          laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit
          commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint
          cupidatat ullamco ut ea consectetur et est culpa et culpa duis. Lorem
          ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim
          labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation
          amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud
          nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim
          nulla est proident. Nostrud officia pariatur ut officia. Sit irure
          elit esse ea nulla sunt ex occaecat reprehenderit commodo officia
          dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident
          adipisicing id nulla nisi laboris ex in Lorem sunt duis officia
          eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit
          enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et
          est culpa et culpa duis. Lorem ipsum dolor sit amet, officia excepteur
          ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur
          mollit ex esse exercitation amet. Nisi anim cupidatat excepteur
          officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet
          voluptate voluptate dolor minim nulla est proident. Nostrud officia
          pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat
          reprehenderit commodo officia dolor Lorem duis laboris cupidatat
          officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex
          in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex
          non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat
          ullamco ut ea consectetur et est culpa et culpa duis. Lorem ipsum
          dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore
          culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet.
          Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud
          ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est
          proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea
          nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis
          laboris cupidatat officia voluptate. Culpa proident adipisicing id
          nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua
          reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate
          laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa
          duis.
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import VisitReport from 'components/desktop/Charts/VisitReportChart.vue';
import BorrowReport from 'components/desktop/Charts/BorrowedReport.vue';

defineComponent({
  name: 'ReportsAndActivities',
});
</script>
