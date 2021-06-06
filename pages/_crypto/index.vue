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
        <div>${{ state.crypto.tickers[0].last.toFixed(2) }}</div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { reactive, onMounted, useRoute } from '@nuxtjs/composition-api'
import axios from 'axios'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      crypto: null,
    })
    const getCryptoAPI = async () => {
      const cryptoName = route.value.params.crypto
      await axios
        .get(`https://api.coingecko.com/api/v3/coins/${cryptoName}`)
        .then((res) => {
          console.log(res.data)
          state.crypto = res.data
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