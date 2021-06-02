<template>
  <div class="container">
    <line-chart
      :chartData="state.dataCollections"
      :options="state.options"
    ></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart.vue'
import { onMounted, reactive } from '@nuxtjs/composition-api'
import axios from 'axios'
export default {
  components: { LineChart },
  props: {
    crypto: Array,
    default: null,
  },
  setup(props) {
    const state = reactive({
      loaded: false,
      dataCollections: [],
      data: [],
      // options: {
      //   plugins: {
      //     legend: {
      //       display: false,
      //       labels: {
      //         color: 'rgb(255, 99, 132)',
      //       },
      //       title: { display: false },
      // },
      // },
      // },
    })
    const loadDate = async () => {
      let prices = props.crypto
      console.log(prices)
      state.dataCollection = prices
    }
    onMounted(loadDate)
    return { state }
  },
}
</script>

<style></style>
