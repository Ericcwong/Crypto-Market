<template>
  <div>
    <v-card
      class="desktop-layout"
      elevation="4"
      outlined
      tile
      v-for="(crypto, index) in cryptos"
      :key="index"
    >
      <div class="crypto-data">
        <div class="crypto-rank">
          <!-- <v-card-subtitle>Rank:</v-card-subtitle> -->
          <v-card-title>{{ crypto.market_cap_rank }}</v-card-title>
        </div>
        <div class="crypto-name">
          <v-card-title style="color: white">
            <img :src="crypto.image" :alt="crypto.id + ' icon'" />
            <Nuxt-link :to="crypto.id">
              {{ crypto.name }}
            </Nuxt-link>
          </v-card-title>
          <small> {{ crypto.symbol.toUpperCase() }}</small>
        </div>
        <div class="crypto-price">
          <!-- <v-card-subtitle>Price:</v-card-subtitle> -->
          <v-card-title v-if="crypto.current_price > 0.01"
            >${{ parseFloat(crypto.current_price.toFixed(3)).toLocaleString() }}
          </v-card-title>
          <v-card-title v-else>${{ crypto.current_price }}</v-card-title>
        </div>

        <div class="crypto-24h">
          <!-- <v-card-subtitle>24h %</v-card-subtitle> -->
          <v-card-title
            class="twenty-four-hour-percentage"
            :style="[
              crypto.price_change_percentage_24h >= 0.0
                ? { color: '#00FF7F' }
                : { color: '#FF4500' },
            ]"
            >{{ crypto.price_change_percentage_24h.toFixed(2) }}%
          </v-card-title>
        </div>
        <div class="crypto-7d">
          <!-- <v-card-subtitle>7d %</v-card-subtitle> -->
          <v-card-title
            class="seven-day-percentage"
            :style="[
              crypto.price_change_percentage_7d_in_currency >= 0.0
                ? { color: '#00FF7F' }
                : { color: '#FF4500' },
            ]"
            >{{ crypto.price_change_percentage_7d_in_currency.toFixed(2) }}%
          </v-card-title>
        </div>
        <div class="crypto-market-cap">
          <!-- <v-card-subtitle>Market Cap:</v-card-subtitle> -->
          <v-card-title>${{ crypto.market_cap.toLocaleString() }}</v-card-title>
        </div>
        <div class="crypto-chart">
          <!-- <v-card-subtitle>Last 7 days</v-card-subtitle> -->
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
  </div>
</template>

<script>
import { reactive } from '@nuxtjs/composition-api'
export default {
  props: {
    cryptos: Array,
  },
  setup(props) {
    const state = reactive({
      cryptos: props.cryptos,
    })
    // Chart color
    const redOrGreen = (data) => {
      if (data >= 0.0) {
        return '#00FF7F'
      } else {
        return '#FF4500'
      }
    }
    return { state, redOrGreen }
  },
}
</script>

<style scoped>
.crypto-data,
.titles {
  display: grid;
  grid-template-columns: 6% 22% 11% 12% 12% 14% 23%;
  grid-template-areas: 'rank name price 24h 7d market-cap chart';
  align-items: center;
}

.titles > span.crypto-rank,
span.crypto-name,
span.crypto-price,
span.crypto-market-cap,
span.crypto-chart {
  padding-left: 8%;
  text-align: left;
}
.v-card__title {
  font-size: 1rem;
}
.twenty-four-hour-percentage,
.seven-day-percentage {
  display: block;
  text-align: center;
}
.mobile-title,
.mobile {
  display: none;
}
a {
  color: white;
}
.crypto-rank {
  grid-area: rank;
}
.crypto-name {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-area: name;
}
img {
  margin-right: 0.5rem;
  width: 2rem;
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
  grid-area: chart;
}
</style>
