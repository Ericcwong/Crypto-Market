<template>
  <div class="container">
    <line-chart
      style="width: 100%; height: 10vh"
      :data="crypto"
      :chartColor="colorChoice"
      :options="state.options"
    ></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart.vue'
import { onMounted, reactive } from '@nuxtjs/composition-api'
export default {
  components: { LineChart },
  props: {
    crypto: { type: Array, default: null },
    chartColor: { type: String, default: null }, //Changes the chart color depending on the 7 day percentage number
  },
  setup(props) {
    const state = reactive({
      loaded: false,
      options: {
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        showTooltips: false,
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          xAxes: [
            {
              display: false, //this will remove all the x-axis grid lines
            },
          ],
          yAxes: [
            {
              display: false, //this will remove all the y-axis grid lines
            },
          ],
        },
      },
    })
    console.log(props.chartColor)
    const colorChoice = parseInt(props.chartColor) >= 0 ? '#00FF7F' : '#FF4500'
    console.log(colorChoice)
    return { state, colorChoice }
  },
}
</script>

<style scoped>
.container {
  height: 100%;
}
</style>
