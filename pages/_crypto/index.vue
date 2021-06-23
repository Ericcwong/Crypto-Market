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
          <span class="ranking"
            >Market cap rank: #{{ state.crypto.market_cap_rank }}
          </span>
          <span
            >Market Cap: ${{
              state.crypto.market_data.market_cap.usd.toLocaleString()
            }}
          </span>
          <span class="ath"
            >ATH: ${{ state.crypto.market_data.ath.usd.toFixed(2) }}
          </span>
          <span class="24h-high"
            >24 Hour High: ${{ state.crypto.market_data.high_24h.usd }}
          </span>
          <span class="24h-low"
            >24 Hour Low: ${{ state.crypto.market_data.low_24h.usd }}
          </span>
          <span class="circulating-supply"
            >Circulating Supply:
            {{ state.crypto.market_data.circulating_supply }}</span
          >
        </div>
      </div>
      <div class="middle-card-container">
        <ChartContainer :cryptoName="state.cryptoName" />
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
    }

    onBeforeMount(getCryptoAPI)
    return { state }
  },
}
</script>

<style scoped>
.container {
  display: grid;

  height: 100vh;
  color: white;
}
.top-card-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.top-card-container > .crypto-information {
  grid-column: 1 / span 2;
}
span {
  padding: 16px;
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
.bottom-card-container {
  margin: 5% 15% 0 15%;
}
</style>
