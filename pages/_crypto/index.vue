<template>
  <div class="container">
    <v-card elevation="2" v-if="state.crypto !== null">
      <div class="top-card-container">
        <v-card-title class="crypto">
          <img :src="state.crypto.image.thumb" alt="Thumbnail" />
          <span class="name">{{ state.crypto.name }}</span>
          <v-card-subtitle>{{
            state.crypto.symbol.toUpperCase()
          }}</v-card-subtitle>
        </v-card-title>
        <span
          class="price"
          v-if="state.crypto.market_data.current_price.usd > 0.01"
        >
          ${{ state.crypto.market_data.current_price.usd.toFixed(2) }}
        </span>
        <span class="price" v-else>{{
          state.crypto.market_data.current_price.usd
        }}</span>
        <div class="crypto-information">
          <div class="current-results">
            <span class="ranking"
              >Market cap rank: #{{ state.crypto.market_cap_rank }}
            </span>
            <span
              >Market Cap: ${{
                state.crypto.market_data.market_cap.usd.toLocaleString()
              }}
            </span>
            <span class="24h-high"
              >24 Hour <span class="day-high-color">High</span> : ${{
                state.crypto.market_data.high_24h.usd
              }}
            </span>
            <span class="24h-low"
              >24 Hour <span class="day-low-color">Low</span> : ${{
                state.crypto.market_data.low_24h.usd
              }}
            </span>
            <span class="circulating-supply"
              >Circulating Supply:
              {{
                state.crypto.market_data.circulating_supply.toLocaleString()
              }}</span
            >
          </div>
          <div class="historic-data">
            <span class="ath"
              >ATH: ${{ state.crypto.market_data.ath.usd.toFixed(2) }}
            </span>
          </div>
          <div class="links">testing</div>
        </div>
      </div>
      <div class="middle-card-container">
        <v-progress-circular
          v-if="!state.chartLoaded"
          indeterminate
          color="primary"
        ></v-progress-circular>
        <ChartContainer v-else :cryptoName="state.cryptoName" />
      </div>
      <div class="bottom-card-container">
        <h4>Description:</h4>
        <p class="description" v-html="state.cryptoDescription" v-linkified></p>
      </div>
    </v-card>
  </div>
</template>

<script>
import { reactive, onBeforeMount, useRoute } from '@nuxtjs/composition-api'
import axios from 'axios'
import ChartContainer from '~/components/UI/Market/ChartContainer.vue'
export default {
  components: {
    ChartContainer,
  },
  // head(): handles browser tab information
  head(state) {
    return {
      title: `- ${state.state.cryptoName}`,
      // meta: [
      //   // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      //   {
      //     hid: 'description',
      //     name: 'description',
      //     content: 'My custom description',
      //   },
      // ],
    }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      crypto: null,
      cryptoName: null,
      cryptoDescription: {},
      chartLoaded: false,
    })
    // API data call when crypto is clicked on
    const getCryptoAPI = async () => {
      const cryptoName = route.value.params.crypto
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${cryptoName}`
      )
      state.crypto = response.data
      state.cryptoName = response.data.id
      state.cryptoDescription = response.data.description.en
      console.log(response.data)
      state.chartLoaded = true
    }

    onBeforeMount(getCryptoAPI)
    return { state }
  },
}
</script>

<style scoped>
.container {
  display: grid;
  height: 100%;
  width: 80%;
  color: white;
}
/* Header: Name and price */
.top-card-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.top-card-container > .crypto-information {
  grid-column: 1 / span 2;
}
.crypto-information {
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  /* grid-template-columns: 1fr 1fr 1fr; */
  /* text-align: center; */
}
span {
  /* padding: 16px; */
}
.middle-card-container {
  /* height: 30vh; */
}
.name,
.price {
  font-size: 3rem;
}
.price {
  text-align: right;
}
.current-results {
  display: grid;
  grid-auto-flow: row;
}

.day-high-color {
  color: rgb(70, 253, 95);
}
.day-low-color {
  color: rgb(253, 70, 70);
}
.bottom-card-container {
  margin: 0% 15% 0 15%;
}
</style>
