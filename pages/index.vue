<template>
  <div class="container">
    <section class="Home">
      <v-fab-transition>
        <v-btn
          v-scroll="onScroll"
          v-show="state.fab"
          fab
          dark
          fixed
          bottom
          right
          color="primary"
          @click="toTop"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-fab-transition>
      <MarketCap />
      <h1 class="title">Cryptocurrency Ranked by Market Cap</h1>
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
      fab: false,
    })
    function onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      state.fab = top > 20
    }

    function toTop() {
      this.$vuetify.goTo(0)
    }
    return { state, onScroll, toTop }
  },
}
</script>

<style scoped>
.container {
  color: white;
  width: 80%;
}
.title {
  font-size: 1.5rem !important;
}
</style>
