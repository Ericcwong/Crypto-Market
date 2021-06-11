<template>
  <div class="container">
    <v-card elevation="2" v-if="state.crypto !== null">
      <div class="top-card-container">
        <v-card-title>
          <img :src="state.crypto.image.thumb" alt="Thumbnail" />
          {{ state.crypto.name }}
          <v-card-subtitle>{{
            state.crypto.symbol.toUpperCase()
          }}</v-card-subtitle>
        </v-card-title>
        <div v-if="state.crypto.market_data.current_price.usd > 0.01">
          ${{ state.crypto.market_data.current_price.usd.toFixed(2) }}
        </div>
        <div v-else>{{ state.crypto.market_data.current_price.usd }}</div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { reactive, onMounted, useRoute } from '@nuxtjs/composition-api'
import axios from 'axios'
export default {
  head(state) {
    return {
      title: `- ${state.state.cryptoName}`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description',
        },
      ],
    }
  },

  setup() {
    const route = useRoute()
    const state = reactive({
      crypto: null,
      cryptoName: null,
    })
    const getCryptoAPI = async () => {
      const cryptoName = route.value.params.crypto

      // console.log(state.cryptoName)
      await axios
        .get(`https://api.coingecko.com/api/v3/coins/${cryptoName}`)
        .then((res) => {
          console.log(res.data.name)
          state.crypto = res.data
          state.cryptoName = res.data.name
        })
    }
    onMounted(getCryptoAPI)
    return { state }
  },
}
</script>

<style scoped>
.container {
  color: white;
}
.top-card-container {
  display: flex;
  justify-content: space-between;
}
</style>
