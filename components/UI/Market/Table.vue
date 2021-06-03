<template>
  <table class="sortable">
    <tr>
      <th>Ranking</th>
      <th>Name</th>
      <th>Price</th>
      <th>24h %</th>
      <th>7d %</th>
      <th>Market Cap</th>
      <th>Last 7 Days</th>
    </tr>
    <tr v-for="crypto in state.cryptos" :key="crypto.id">
      <td class="ranking">
        {{ crypto.market_cap_rank }}
      </td>
      <td class="name" style="text-transform: capitalize; text-align: left">
        <img class="icon" :src="crypto.image" :alt="crypto.id" />
        {{ crypto.id }}
        <span style="text-transform: uppercase">{{ crypto.symbol }}</span>
      </td>
      <td class="current-price">
        ${{ crypto.current_price.toLocaleString() }}
      </td>
      <td
        class="24h-price-change-%"
        :style="[
          crypto.price_change_percentage_24h >= 0
            ? { color: '#00FF7F' }
            : { color: '#FF4500' },
        ]"
      >
        {{ crypto.price_change_percentage_24h.toFixed(2) }}%
      </td>
      <td
        class="7-day-percentage"
        :style="[
          crypto.price_change_percentage_7d_in_currency >= 0
            ? { color: '#00FF7F' }
            : { color: '#FF4500' },
        ]"
      >
        {{ crypto.price_change_percentage_7d_in_currency.toFixed(2) }}%
      </td>
      <td class="market-cap">{{ crypto.market_cap.toLocaleString() }}</td>
      <td class="chart" style="margin: -1px">
        <ChartContainer
          :crypto="crypto.sparkline_in_7d.price"
          :chartColor="crypto.price_change_percentage_7d_in_currency.toFixed(2)"
        />
      </td>
    </tr>
  </table>
</template>

<script>
import axios from 'axios'
import { onBeforeMount, reactive, toRefs } from '@nuxtjs/composition-api'

export default {
  components: {
    ChartContainer: () => import('./ChartContainer'),
  },
  setup() {
    const state = reactive({
      cryptos: [],
    })
    const getPriceAPI = () => {
      axios
        .get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C7d'
        )
        .then((response) => {
          console.log(response)
          response.data.forEach((element) => state.cryptos.push(element))
        })
    }
    onBeforeMount(getPriceAPI)

    return { getPriceAPI, state }
  },
}
</script>

<style scoped>
table {
  width: 100%;
  border: 1px solid white;
  font-size: 1rem;
}

th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
td {
  border-bottom: 2px solid #dddddd;
  text-align: center;
}
td.chart {
  justify-content: center;
}
.icon {
  width: 2rem;
}
.chart {
  display: flex;
}
</style>
