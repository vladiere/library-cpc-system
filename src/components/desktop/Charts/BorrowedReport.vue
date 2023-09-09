<template>
  <div id="chart" class="column shadow-8 q-pa-xs text-capitalize" style="border-radius: 15px;">
    <span class="text-h6 text-grey-8 q-pl-md">Borrowed Reports</span>
    <apexchart type="bar" height="380" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script setup lang="ts">
  import { defineComponent, ref } from 'vue'
  import VueApexCharts from 'vue3-apexcharts';

  defineComponent({
    name: 'BorrowedChart'
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
      text: 'Borrowed Books',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: (val: number) => `${val} Books Borrowed`,
    },
  },
};
</script>
