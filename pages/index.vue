<template>
  <div class="container">
    <section class="Home">
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
export default {
  components: { Table },
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
