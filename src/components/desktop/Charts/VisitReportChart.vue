<template>
  <div id="chart" class="column shadow-8 q-pa-xs text-capitalize" style="border-radius: 15px;">
    <span class="text-h6 text-grey-8 q-pl-md">Visit Reports</span>
    <apexchart type="bar" height="380" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script setup lang="ts">
  import { defineComponent, ref } from 'vue'
  import VueApexCharts from 'vue3-apexcharts';

  defineComponent({
    name: 'VisitReport'
  })

interface DataPoint {
  name: string;
  data: number[];
}

const series: DataPoint[] = [
  { name: 'Daily', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
  { name: 'Weekly', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
  { name: 'Monthly', data: [35, 41, 36, 26, 45, 48, 52, 53, 41] },
  { name: 'Yearly', data: [325, 441, 236, 626, 345, 148, 252, 353, 141] },
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
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  },
  yaxis: {
    title: {
      text: 'Visitors Count',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: (val: number) => `$ ${val} thousands`,
    },
  },
};
</script>
