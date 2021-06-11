<template>
  <div>
    <v-card
      elevation="4"
      outlined
      tile
      v-for="crypto in state.cryptos"
      :key="crypto.id"
    >
      <div class="crypto-data">
        <div class="crypto-rank">
          <v-card-subtitle>Rank:</v-card-subtitle>
          <v-card-title>{{ crypto.market_cap_rank }}</v-card-title>
        </div>
        <div class="crypto-name">
          <v-card-subtitle>Name:</v-card-subtitle>
          <Nuxt-link :to="crypto.id">
            <v-card-title style="color: white">
              <img
                style="width: 2rem"
                :src="crypto.image"
                :alt="crypto.id + ' icon'"
              />&nbsp; {{ crypto.name }} &nbsp;
              <small> {{ crypto.symbol.toUpperCase() }}</small>
            </v-card-title>
          </Nuxt-link>
        </div>
        <div class="crypto-price">
          <v-card-subtitle>Price:</v-card-subtitle>
          <v-card-title v-if="crypto.current_price > 0.01"
            >${{ parseFloat(crypto.current_price.toFixed(3)).toLocaleString() }}
          </v-card-title>
          <v-card-title v-else>${{ crypto.current_price }}</v-card-title>
        </div>
        <div class="crypto-24h">
          <v-card-subtitle>24h %</v-card-subtitle>
          <v-card-title
            :style="[
              crypto.price_change_percentage_24h >= 0.0
                ? { color: '#00FF7F' }
                : { color: '#FF4500' },
            ]"
            >{{ crypto.price_change_percentage_24h.toFixed(2) }}%
          </v-card-title>
        </div>
        <div class="crypto-7d">
          <v-card-subtitle>7d %</v-card-subtitle>
          <v-card-title
            :style="[
              crypto.price_change_percentage_7d_in_currency >= 0.0
                ? { color: '#00FF7F' }
                : { color: '#FF4500' },
            ]"
            >{{ crypto.price_change_percentage_7d_in_currency.toFixed(2) }}
          </v-card-title>
        </div>
        <div class="crypto-market-cap">
          <v-card-subtitle>Market Cap:</v-card-subtitle>
          <v-card-title>${{ crypto.market_cap.toLocaleString() }}</v-card-title>
        </div>
        <div class="crypto-chart">
          <v-card-subtitle>Last 7 days</v-card-subtitle>
          <!-- <v-card-title> -->
          <ChartContainer
            :crypto="crypto.sparkline_in_7d.price"
            :chartColor="crypto.price_change_percentage_7d_in_currency"
          />
          <!-- </v-card-title> -->
        </div>
        <div
          v-if="state.cryptos.length"
          v-observe-visibility="handleScrolledToBottom"
        ></div>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import { onBeforeMount, reactive } from '@nuxtjs/composition-api'
import ChartContainer from './ChartContainer'
export default {
  components: {
    ChartContainer,
  },
  setup() {
    const state = reactive({
      cryptos: [],
      loaded: 20,
      page: 1,
    })
    const getPriceAPI = async () => {
      let response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${state.loaded}&page=${state.page}&sparkline=true&price_change_percentage=1h%2C7d`
      )
      let data = await response.data
      let uniqueCrypto = await [...new Set(response.data)]
      console.log(uniqueCrypto)
      state.cryptos = []
      state.cryptos.push(...uniqueCrypto)
    }
    onBeforeMount(getPriceAPI)
    function handleScrolledToBottom(isVisible) {
      if (!isVisible) {
        return
      }
      if (state.loaded !== 100) {
        state.loaded = state.loaded + 20
        getPriceAPI()
      } else {
        return
      }
    }
    return { getPriceAPI, state, handleScrolledToBottom }
  },
}
</script>

<style scoped>
.crypto-data {
  display: grid;
  grid-template-columns: 10% 15% 15% 10% 10% 15% 25%;
  grid-template-areas: 'rank name price 24h 7d market-cap chart';
}
a {
  color: white;
}
.crypto-rank {
  grid-area: rank;
}
.crypto-name {
  grid-area: name;
}
.crypto-price {
  grid-area: price;
}
.crypto-24h {
  grid-area: 24h;
}
.crypto-7d {
  grid-area: 7d;
}
.crypto-market-cap {
  grid-area: market-cap;
}
.crypto-chart {
  /* width: 100%; */
  grid-area: chart;
}
/* @media only screen and (max-width: 1260px) {
  .crypto-data {
    display: grid;
    grid-template-rows: auto;
    grid-template-areas:
      'rank name price'
      '24h 7d market-cap'
      'chart chart chart';
  }
} */
@media only screen and (max-width: 630px) {
  .crypto-data {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 50% 50%;

    grid-template-areas:
      'name rank'
      'price market-cap '
      '24h 7d'
      'chart chart';
  }
}
</style>
