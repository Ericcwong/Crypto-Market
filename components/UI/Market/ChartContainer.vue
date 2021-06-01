<template>
  <div class="container">
    <line-chart :chartData="state.dataCollections"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart'
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
    })
    const loadDate = async () => {
      try {
        console.log(props.crypto)
        let get7Days = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${props.crypto}/market_chart?vs_currency=usd&days=7&interval=daily`
        )
        console.log(get7Days)
        const date = await get7Days.data.prices.map((el) =>
          state.dataCollections.push(
            new Date(el[0]).toLocaleDateString('en-US')
          )
        )
        console.log(date)
        const prices = await get7Days.data.prices.map((el) =>
          state.dataCollections.push(parseInt(el[1]))
        )
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
