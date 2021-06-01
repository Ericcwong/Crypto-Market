<template>
  <div class="container">
    <line-chart :chartData="state.dataCollections"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart.vue'
import { onMounted, reactive } from '@nuxtjs/composition-api'
import axios from 'axios'
export default {
  components: { LineChart },
  props: {
    crypto: String,
  },
  setup(props) {
    const state = reactive({
      loaded: false,
      dataCollections: [],
      data: [],
    })
    const loadDate = async () => {
      try {
        console.log(props.crypto)
        let get7Days = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${props.crypto}/market_chart?vs_currency=usd&days=7`
        )
        console.log(get7Days)
        const date = await get7Days.data.prices.forEach((el) =>
          state.dataCollections.labels.push(
            new Date(el[0]).toLocaleDateString('en-US')
          )
        )
        const prices = await get7Days.data.prices.map((element) => {
          state.data.push(element[1])
        })
        state.dataCollections.datasets.push({ data: state.data })
      } catch (error) {
        console.log(error)
      }
    }
    onMounted(loadDate)
    return { state }
  },
}
</script>

<style></style>
