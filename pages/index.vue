<template>
  <div class="container">
    <section class="landing-page">
      <div class="title">
        Crypto wallet
        <Table :cryptos="state.cryptos" />
      </div>
    </section>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from '@nuxtjs/composition-api'
import axios from 'axios'
import Table from '~/components/UI/Market/Table'
export default {
  data() {
    return {
      greater: {
        color: '#2E8B57',
      },
      less: {
        color: 'red',
      },
    }
  },
  components: { Table },
  setup() {
    const state = reactive({
      cryptos: [],
    })
    const getPriceAPI = async () => {
      axios
        .get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1&page=1&sparkline=false'
        )
        .then((response) => {
          console.log(response)
          response.data.forEach((element) => state.cryptos.push(element))
        })
    }
    onMounted(getPriceAPI)
    return { getPriceAPI, state }
  },
}
</script>

<style scoped>
.landing-page {
  color: white;
  min-height: 100vh;
  height: 100%;
}

.title {
  font-size: 3rem;
}

/* Keyframes */
@keyframes slideInIcons {
  from {
    transition: left 300ms linear;
  }
  to {
    transition: left 300ms linear;
  }
}
</style>
