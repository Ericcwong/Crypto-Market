<template>
  <div class="container">
    <v-card elevation="2" v-if="state.crypto !== null">
      <div class="top-card-container">
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
        <ChartContainer :crypto="state.sparkline" />
      </div>
      <div class="bottom-card-container">
        <p class="description" v-html="state.cryptoDescription" v-linkified></p>
      </div>
    </v-card>
  </div>
</template>

<script>
import { reactive, onMounted, useRoute } from '@nuxtjs/composition-api'
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
      sparkline: [],
    })
    const getCryptoAPI = async () => {
      const cryptoName = route.value.params.crypto

      // console.log(state.cryptoName)
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${cryptoName}`
      )
      const sparklineData = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${cryptoName}/market_chart?vs_currency=usd&days=1`
      )
      state.crypto = response.data
      state.cryptoName = response.data.name
      state.cryptoDescription = response.data.description.en

      sparklineData.data.prices.map((element) => {
        state.sparkline.push(element[1])
      })
    }

    onMounted(getCryptoAPI)
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
