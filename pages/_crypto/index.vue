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
          <span class="ranking">Rank: {{ state.crypto.coingecko_rank }}</span>
        </div>
      </div>
      <div class="middle-card-container">
        <ChartContainer :cryptoName="state.cryptoName" />
      </div>
      <div class="bottom-card-container">
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
.top-card-container > .crypto-information,
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
</style>
