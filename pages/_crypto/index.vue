<template>
  <div class="container">
    <v-card elevation="2" v-if="state.crypto !== null">
      <div class="top-card-container">
        <span class="ranking">Rank {{ state.crypto.coingecko_rank }}</span>
        <v-card-title>
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
      </div>
      <div class="middle-card-container">
        <ChartContainer
          v-if="state.dataLoaded"
          :date="state.sparklineDate"
          :price="state.sparklinePrice"
        />
        <v-card-text>
          <v-chip class="mr-2" ref="1d" @click="getSparklineDay(1)">
            <v-icon left>mdi-alarm-check </v-icon>
            1 Day
          </v-chip>
          <v-chip class="mr-2" ref="1d" @click="getSparklineDay(7)">
            <v-icon left>mdi-alarm-check </v-icon>
            7 Day
          </v-chip>
          <v-chip class="mr-2" ref="1d" @click="getSparklineDay(30)">
            <v-icon left>mdi-alarm-check </v-icon>
            1 Month
          </v-chip>
        </v-card-text>
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
      dataLoaded: false,
      sparklineDate: [],
      sparklinePrice: [],
    })
    // API data call when crypto is clicked on
    const getCryptoAPI = async () => {
      const cryptoName = route.value.params.crypto
      // console.log(state.cryptoName)
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${cryptoName}`
      )
      state.crypto = response.data
      state.cryptoName = response.data.name
      state.cryptoDescription = response.data.description.en
      getSparklineDay(1)
    }
    const getSparklineDay = async (data) => {
      state.sparklineDate = []
      state.sparklinePrice = []
      state.dataLoaded = false
      const sparklineData = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${state.cryptoName.toLowerCase()}/market_chart?vs_currency=usd&days=${data}`
      )
      sparklineData.data.prices.map((el) => {
        state.sparklineDate.push(new Date(el[0]).toLocaleDateString())
        state.sparklinePrice.push(el[1])
      })
      // console.log(state.sparklinePrice)
      state.dataLoaded = true
    }
    onBeforeMount(getCryptoAPI)
    return { state, getSparklineDay }
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
  display: flex;
  justify-content: space-between;
}
.middle-card-container {
  /* height: 30vh; */
}
.name,
.price {
  font-size: 3rem;
}
</style>
