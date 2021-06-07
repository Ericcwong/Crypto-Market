<template>
  <div class="market-cap-container" v-if="state.market !== null">
    <div class="market-cap">
      Today's Cryptocurrency Market Price is: $
      {{
        parseFloat(
          state.market.total_market_cap.usd.toFixed(2)
        ).toLocaleString()
      }}
      <span
        class="market-up"
        v-if="state.market.market_cap_change_percentage_24h_usd > 0.0"
        >up {{ state.market.market_cap_change_percentage_24h_usd.toFixed(2) }}%
      </span>
      <span class="market-down" v-else
        >down
        {{ state.market.market_cap_change_percentage_24h_usd.toFixed(2) }}%
      </span>
      over the last day.
    </div>
    <div class="coins">Coins: {{ state.market.active_cryptocurrencies }}</div>
    <div class="24h-volume">
      <span>
        24h Vol: ${{
          parseFloat(state.market.total_volume.usd.toFixed(0)).toLocaleString()
        }}
      </span>
    </div>
    <span class="bitcoin-dominance">
      Dominance BTC {{ state.market.market_cap_percentage.btc.toFixed(1) }}%
    </span>
  </div>
</template>

<script>
import { onMounted, reactive } from '@nuxtjs/composition-api'
import axios from 'axios'
export default {
  setup() {
    let state = reactive({
      market: null,
    })
    const getMarketData = async () => {
      const APIdata = await axios.get('https://api.coingecko.com/api/v3/global')
      state.market = await APIdata.data.data
      console.log(APIdata.data.data)
    }
    onMounted(getMarketData)
    return { state }
  },
}
</script>

<style scoped>
.market-up {
  color: #00ff7f;
}
.market-down {
  color: #ff4500;
}
</style>