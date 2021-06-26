<template>
  <div class="crypto-container" v-if="state.cryptos !== null">
    <v-card
      elevation="4"
      outlined
      tile
      v-for="(crypto, index) in state.cryptos"
      :key="index"
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
          <v-sparkline
            :value="crypto.sparkline_in_7d.price"
            :color="redOrGreen(crypto.price_change_percentage_7d_in_currency)"
            :auto-draw-duration="3000"
            line-width="2"
            auto-draw
          ></v-sparkline>
        </div>
      </div>
    </v-card>
    <!-- <div
      class="bottom-detector"
      v-if="state.cryptos.length"
      v-observe-visibility="{
        callback: handleScrolledToBottom,
      }"
    ></div> -->
    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                @input="pagination"
                v-model="state.page"
                class="my-4"
                :length="11"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { onBeforeMount, reactive, watchEffect } from '@nuxtjs/composition-api'
export default {
  setup() {
    const state = reactive({
      cryptos: null,
      loaded: 100,
      page: 1,
    })
    // Main API data call
    const getPriceAPI = async () => {
      let response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${state.loaded}&page=${state.page}&sparkline=true&price_change_percentage=1h%2C7d`
      )
      let unique = [...new Set(response.data)]
      console.log(unique)
      state.cryptos = unique
    }

    // Chart color
    const redOrGreen = (data) => {
      if (data >= 0.0) {
        return '#00FF7F'
      } else {
        return '#FF4500'
      }
    }
    onBeforeMount(getPriceAPI)
    const handleScrolledToBottom = (isVisible) => {
      if (!isVisible) {
        return
      } else if (state.loaded !== 100) {
        state.loaded += 20
        getPriceAPI()
      }
    }
    const pagination = () => {
      getPriceAPI()
      window.scrollTo(0, 0)
    }
    return {
      getPriceAPI,
      state,
      handleScrolledToBottom,
      redOrGreen,
      pagination,
    }
  },
}
</script>

<style scoped>
.crypto-container {
  height: 100%;
}
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
.bottom-detector {
  margin-top: -60%;
  border: 3px dotted yellow;
  height: 200px;
  position: absolute;
  z-index: -1;
}
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
