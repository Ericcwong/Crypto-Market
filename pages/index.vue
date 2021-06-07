<template>
  <div class="container">
    <section class="Home">
      <MarketCap />
      <div class="title">Cryptocurrency Prices by Market Cap</div>

      <div class="crypto-table">
        <Table />
      </div>
    </section>
  </div>
</template>

<script>
import { reactive } from '@nuxtjs/composition-api'
import axios from 'axios'
import Table from '~/components/UI/Market/Table'
import MarketCap from '~/components/UI/Market/MarketCap'
export default {
  components: { Table, MarketCap },
  setup() {
    const state = reactive({
      loading: true,
      page: 1,
    })

    return { state }
  },
}
</script>

<style scoped>
.container {
  color: white;
}
</style>
