<template>
  <div class="market-cap-container" v-if="state.market !== null">
    <span class="market-cap">
      Today's Cryptocurrency Market Cap is: {{ state.marketCap }}
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
    </span>
    <div class="market-cap-bottom-container">
      <span class="coins"
        >Total Coins: {{ state.market.active_cryptocurrencies }}</span
      >

      <span class="24h-volume">
        24h Vol: ${{
          parseFloat(state.market.total_volume.usd.toFixed(0)).toLocaleString()
        }}
      </span>

      <span class="bitcoin-dominance">
        BTC Dominance {{ state.market.market_cap_percentage.btc.toFixed(1) }}%
      </span>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from '@nuxtjs/composition-api'
import axios from 'axios'
export default {
  setup() {
    let state = reactive({
      market: null,
      marketCap: 0,
    })
    const getMarketData = async () => {
      const APIdata = await axios.get('https://api.coingecko.com/api/v3/global')
      state.market = await APIdata.data.data
      console.log(APIdata.data.data)
      let number = APIdata.data.data.total_market_cap.usd
      let trillions = String(number).charAt(0)
      let hundredBillions = String(number).charAt(1)
      let tenBillions = String(number).charAt(2)
      const marketCap = `${trillions}.${hundredBillions}${tenBillions} Trillion`
      state.marketCap = marketCap
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
.market-cap {
  font-size: 1.75rem;
}
.market-cap-container {
  border: 1px solid darkgray;
  border-radius: 5px;
  box-shadow: 10px 10px 5px #888;
  margin-bottom: 3%;
  padding: 3%;
}
.market-cap-bottom-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /* border-bottom: 1px solid darkgray; */
}
</style>
