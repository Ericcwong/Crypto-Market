<template>
  <div class="crypto-container" v-if="state.cryptos !== null">
    <div class="titles">
      <span
        :class="title.class"
        v-for="title in state.titles"
        :key="title.name"
        >{{ title.title }}</span
      >
    </div>
    <div class="desktop-view">
      <Desktop-Table :cryptos="state.cryptos" />
    </div>
    <MobileTable class="mobile-view" :cryptos="state.cryptos" />
    <!-- Pagination -->
    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                @input="pagination"
                v-model="state.page"
                class="my-4"
                :length="11"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { onBeforeMount, reactive, watchEffect } from '@nuxtjs/composition-api'
import DesktopTable from '~/components/UI/Market/Table/Desktop-Table.vue'
import MobileTable from '~/components/UI/Market/Table/Mobile-Table.vue'
export default {
  components: {
    DesktopTable,
    MobileTable,
  },
  data() {
    return {
      show: false,
    }
  },
  setup() {
    const state = reactive({
      cryptos: null,
      loaded: 100,
      page: 1,
      titles: [
        { title: 'Rank', class: 'crypto-rank' },
        { title: 'Name', class: 'crypto-name' },
        { title: 'Price', class: 'crypto-price' },
        { title: '24h %', class: 'crypto-24h' },
        { title: '7d %', class: 'crypto-7d' },
        { title: 'Market Cap', class: 'crypto-market-cap' },
        { title: 'Last 7 days', class: 'crypto-chart' },
      ],
    })
    // Main API data call
    const getPriceAPI = async () => {
      let response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${state.loaded}&page=${state.page}&sparkline=true&price_change_percentage=1h%2C7d`
      )
      let unique = [...new Set(response.data)]
      console.log(unique)
      state.cryptos = unique
    }

    onBeforeMount(getPriceAPI)
    // const handleScrolledToBottom = (isVisible) => {
    //   if (!isVisible) {
    //     return
    //   } else if (state.loaded !== 100) {
    //     state.loaded += 20
    //     getPriceAPI()
    //   }
    // }
    const pagination = () => {
      getPriceAPI()
      window.scrollTo(0, 0)
    }
    return {
      getPriceAPI,
      state,
      pagination,
    }
  },
}
</script>

<style scoped>
.crypto-container {
  height: 100%;
  width: 100%;
}
.titles {
  display: grid;
  grid-template-columns: 6% 14% 11% 12% 12% 20% 25%;
  grid-template-areas: 'rank name price 24h 7d market-cap chart';
  align-items: center;
}

.titles > span.crypto-rank,
span.crypto-name,
span.crypto-price,
span.crypto-market-cap,
span.crypto-chart {
  padding-left: 8%;
  text-align: left;
}
.titles {
  /* font-size: 1.25rem; */
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 4;
  background: hsla(210, 10%, 23%, 1);
  color: white;
  text-align: center;
}
.twenty-four-hour-percentage,
.seven-day-percentage {
  display: block;
  text-align: center;
}
.mobile-view {
  display: none;
}
a {
  color: white;
}
.crypto-rank {
  grid-area: rank;
}
.crypto-name {
  grid-area: name;
}
.crypto-price {
  grid-area: price;
}
.crypto-24h {
  grid-area: 24h;
}
.crypto-7d {
  grid-area: 7d;
}
.crypto-market-cap {
  grid-area: market-cap;
}
.crypto-chart {
  grid-area: chart;
}

@media only screen and (max-width: 1080px) {
  .titles,
  .desktop-view {
    display: none;
  }
  .mobile-view {
    display: block;
  }
  .mobile {
    grid-area: expand;
  }
  .crypto-data {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 50% 50%;

    grid-template-areas:
      'rank name'
      'price market-cap '
      'expand expand'
      '24h 7d'
      'chart chart';
  }
}
</style>
