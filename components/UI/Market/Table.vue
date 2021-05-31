<template>
  <table>
    <tr>
      <th>Ranking</th>
      <th>Name</th>
      <th>Price</th>
      <th>24h %</th>
      <th>7d %</th>
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
        {{ crypto.market_cap_change_percentage_24h.toFixed(2) }}%
      </td>
      <td
        class="7-day-percentage"
        :style="[
          crypto.market_cap_change_percentage_24h >= 0
            ? { color: '#00FF7F' }
            : { color: '#FF4500' },
        ]"
      >
        {{ crypto.price_change_percentage_7d_in_currency.toFixed(2) }}%
      </td>
      <td class="market-cap">{{ crypto.market_cap.toLocaleString() }}</td>
      <td class="chart">
        <ChartContainer :crypto="cryptos" />
      </td>
    </tr>
  </table>
</template>

<script>
import axios from 'axios'
import { onMounted, reactive, toRefs } from '@nuxtjs/composition-api'
import LineChart from './LineChart.vue'
import ChartContainer from './ChartContainer.vue'
export default {
  components: {
    LineChart,
    ChartContainer,
  },
  props: {
    cryptos: Array,
  },

  // return { state }
  // },
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