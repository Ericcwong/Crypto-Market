<template>
  <div>
    <v-card
      elevation="4"
      outlined
      tile
      v-for="(crypto, index) in state.cryptos"
      :key="index"
    >
      <div class="crypto-data">
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
        <div class="crypto-rank">
          <v-card-subtitle>Rank:</v-card-subtitle>
          <v-card-title>{{ crypto.market_cap_rank }}</v-card-title>
        </div>

        <div class="crypto-price">
          <v-card-subtitle>Price:</v-card-subtitle>
          <v-card-title v-if="crypto.current_price > 0.01"
            >${{ parseFloat(crypto.current_price.toFixed(3)).toLocaleString() }}
          </v-card-title>
          <v-card-title v-else>${{ crypto.current_price }}</v-card-title>
        </div>
        <v-card-actions class="expand">
          <v-btn color="primary lighten-2" text> Explore </v-btn>

          <v-spacer></v-spacer>

          <v-btn icon @click="state.show = !state.show">
            <v-icon>{{
              state.show ? 'mdi-chevron-up' : 'mdi-chevron-down'
            }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="state.show">
            <div class="crypto-24h">
              <v-card-subtitle>24h %</v-card-subtitle>
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
              <v-card-subtitle>7d %</v-card-subtitle>
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
              <v-card-subtitle>Market Cap:</v-card-subtitle>
              <v-card-title
                >${{ crypto.market_cap.toLocaleString() }}</v-card-title
              >
            </div>
            <div class="crypto-chart">
              <v-card-subtitle>Last 7 days</v-card-subtitle>
              <v-sparkline
                :value="crypto.sparkline_in_7d.price"
                :color="
                  redOrGreen(crypto.price_change_percentage_7d_in_currency)
                "
                :auto-draw-duration="3000"
                line-width="2"
                auto-draw
              ></v-sparkline>
            </div>
          </div>
        </v-expand-transition>
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
      show: false,
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
  grid-area: chart;
}

@media only screen and (max-width: 1080px) {
  .mobile-view {
    display: block;
  }
  .expand {
    grid-area: expand;
  }
  .crypto-data {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 50% 50%;

    grid-template-areas:
      'rank name'
      'price market-cap '
      'expand expand'
      '24h 7d'
      'chart chart';
  }
}
</style>

