<template>
  <div class="column q-py-xl text-grey-8 q-pl-xl q-pr-md q-gutter-y-md float-right" style="width: 82vw;">
    <div class="col column q-px-md shadow-8 text-capitalize q-py-sm" style="border-radius: 15px;">
      <div class="col text-subtitle1">
        <span>overall year total</span>
        <q-separator color="grey-7" size="2px" />
      </div>
      <div class="col row">
        <div class="col column q-gutter-y-sm">
          <span class="text-h6">Departments</span>
          <span>Bachelor of Science in Information Technology</span>
          <span>Bachelor of Science in Hospitality Management</span>
          <span>Bachelor of Elementary Education</span>
          <span>bachelor of science in secondary education</span>
        </div>
        <div class="col-2 column q-gutter-y-sm">
          <span class="text-h6">Total</span>
          <span>123</span>
          <span>321</span>
          <span>124</span>
          <span>412</span>
          <q-separator color="grey-7" size="2px" />
          <span>980 overall total</span>
        </div>
      </div>
    </div>
    <div id="chart" class="col column shadow-8 q-pa-xs text-capitalize" style="border-radius: 15px;">
      <span class="text-h6 q-pl-md">Yearly Reports</span>
      <apexchart type="bar" height="380" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineComponent, ref } from 'vue'
  import VueApexCharts from 'vue3-apexcharts';

  defineComponent({
    name: 'YearlyReport'
  })

interface DataPoint {
  name: string;
  data: number[];
}

const series: DataPoint[] = [
  { name: 'BSIT', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
  { name: 'BSED', data: [35, 41, 36, 26, 45, 48, 52, 53, 41] },
  { name: 'BEED', data: [35, 41, 36, 26, 45, 48, 52, 53, 41] },
  { name: 'BSHM', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
];

const chartOptions = {
  chart: {
    type: 'bar',
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  yaxis: {
    title: {
      text: 'Yearly Visit Report',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: (val: number) => `${val} Total Visit(s)`,
    },
  },
};
</script>
