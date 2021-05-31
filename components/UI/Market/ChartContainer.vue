<template>
  <div class="container">
    <line-chart v-if="state.loaded" :prices="state.prices" :date="state.date" />
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
  },
  setup(props) {
    const state = reactive({
      loaded: false,
      prices: null,
      date: null,
    })
    const loadDate = async () => {
      state.loaded = false
      try {
        // console.log(
        props.crypto.forEach((el) => console.log(el.name))
        //   props.crypto.forEach((el) => {
        //     el.name
        //   })
        // )
        // let { get7Days } = await axios.get(
        //   `https://api.coingecko.com/api/v3/coins/${props.crypto.name.toLowerCase()}/market_chart?vs_currency=usd&days=7&interval=daily`
        // )
        // const date = await get7Days.data.prices.map((el) =>
        //   new Date(el[0]).toLocaleDateString('en-US')
        // )
        // const prices = await get7Days.data.prices.map((el) =>
        //   parseInt(el[1].toFixed(2))
        // )
        // state.date = date
        // state.prices = prices
        // state.loaded = true
      } catch (error) {
        console.log(error)
      }
    }
    onMounted(loadDate)
    return { state }
  },
}
</script>

<style>
</style>