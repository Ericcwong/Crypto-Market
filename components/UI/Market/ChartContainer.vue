<template>
  <div class="line-chart-container">
    <line-chart
      :chartData="state.chartData"
      :options="state.options"
    ></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart.vue'
import { toRefs, reactive } from '@nuxtjs/composition-api'
export default {
  components: { LineChart },
  props: {
    date: { type: Array },
    price: { type: Array },
    chartColor: { type: Number, default: null }, //Changes the chart color depending on the 7 day percentage number
  },

  setup(props) {
    let date = props.date
    let price = props.price
    const state = reactive({
      loaded: false,
      options: {
        //Display the name of the graph
        legend: {
          display: false,
        },
        //When user hover over the graph it will stick to the x-axis.
        tooltips: {
          intersect: false,
          mode: 'x-axis',
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 1,
          },
        },
        scales: {
          xAxes: [
            {
              display: false, //this will remove all the x-axis grid lines
            },
          ],
        },
      },
      chartData: {
        labels: date,
        datasets: [
          {
            label: 'Price: $',
            data: price,
            borderColor: 'lightblue',
            fill: false,
          },
        ],
      },
    })

    return { state }
  },
}
</script>

<style scoped>
/* @media only screen and (min-width: 1260px) {
  .line-chart-container {
    display: grid;
    justify-content: center;
    width: 90%;
    height: 10vh;
  }
} */
</style>
