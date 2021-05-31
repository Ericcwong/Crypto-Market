<template>
  <table>
    <tr>
      <th>Ranking</th>
      <th>Name</th>
      <th>Price</th>
      <th>24h %</th>
      <th>Market Cap</th>
      <th>Last 7 Days</th>
    </tr>
    <tr v-for="crypto in cryptos" :key="crypto.id">
      <td class="ranking">
        {{ crypto.market_cap_rank }}
      </td>
      <td class="name">
        <img class="icon" :src="crypto.image" :alt="crypto.id" />
        {{ crypto.id }}
      </td>
      <td class="current-price">
        ${{ crypto.current_price.toLocaleString() }}
      </td>
      <td
        class="24h-price-change-%"
        :style="[
          crypto.market_cap_change_percentage_24h >= 0
            ? { color: '#00FF7F' }
            : { color: '#FF4500' },
        ]"
      >
        {{ crypto.market_cap_change_percentage_24h }}
      </td>
      <td class="market-cap">{{ crypto.market_cap.toLocaleString() }}</td>
      <td class="chart">
        <line-chart :chartdata="state.sevenDayChart"></line-chart>
      </td>
    </tr>
  </table>
</template>

<script>
import axios from 'axios'
import { onMounted, reactive } from '@nuxtjs/composition-api'
import LineChart from './LineChart.js'
export default {
  components: {
    LineChart,
  },
  props: {
    cryptos: Array,
  },
  setup() {
    const state = reactive({
      sevenDayChart: [],
    })
    const getSevenDayChart = async () => {
      const { data } = await axios.get(
        'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily'
      )
      const prices = data.prices
      console.log(prices)
      prices.forEach((el) => state.sevenDayChart.push(el))
    }
    onMounted(getSevenDayChart)
    return { state }
  },
}
</script>

<style scoped>
table {
  width: 100%;
  border: 1px solid white;
  font-size: 1rem;
}
td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
.icon {
  width: 2rem;
}
</style>