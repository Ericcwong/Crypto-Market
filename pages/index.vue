<template>
  <div class="container">
    <section class="Home">
      <div class="title">Cryptocurrency Prices by Market Cap</div>
      <div class="crypto-table">
        <Table />
      </div>
    </section>
    <v-pagination v-model="state.page" :length="6"></v-pagination>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from '@nuxtjs/composition-api'
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
