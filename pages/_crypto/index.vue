<template>
  <div class="container">
    <v-card elevation="2" v-if="state.crypto !== null">
      <div class="top-card-container">
        <span class="ranking">Rank {{ state.crypto.coingecko_rank }}</span>
        <v-card-title>
          <img :src="state.crypto.image.thumb" alt="Thumbnail" />
          <span class="name">{{ state.crypto.name }}</span>
          <v-card-subtitle>{{
            state.crypto.symbol.toUpperCase()
          }}</v-card-subtitle>
        </v-card-title>
        <span
          class="price"
          v-if="state.crypto.market_data.current_price.usd > 0.01"
        >
          ${{ state.crypto.market_data.current_price.usd.toFixed(2) }}
        </span>
        <span class="price" v-else>{{
          state.crypto.market_data.current_price.usd
        }}</span>
      </div>
      <div class="middle-card-container">
        <span class="chart-title">{{ state.chartTitle }}</span>
        <ChartContainer
          v-if="state.dataLoaded"
          :date="state.sparklineDate"
          :price="state.sparklinePrice"
        />
        <v-card-text>
          <v-chip
            class="mr-2"
            ref="1d"
            @click="getSparklineDay({ day: 1, chartTitle: '1 Day' })"
          >
            <v-icon left>mdi-alarm-check </v-icon>
            1 Day
          </v-chip>
          <v-chip
            class="mr-2"
            ref="1d"
            @click="
              getSparklineDay({ day: 7, chartTitle: '7 Days' }),
                (state.chartTitle = '7 Days')
            "
          >
            <v-icon left>mdi-alarm-check </v-icon>
            7 Day
          </v-chip>
          <v-chip
            class="mr-2"
            ref="1d"
            @click="
              getSparklineDay({ day: 30, chartTitle: '30 Days' }),
                (state.chartTitle = '30 Days')
            "
          >
            <v-icon left>mdi-alarm-check </v-icon>
            1 Month
          </v-chip>
        </v-card-text>
      </div>
      <div class="bottom-card-container">
        <p class="description" v-html="state.cryptoDescription" v-linkified></p>
      </div>
    </v-card>
  </div>
</template>

<script>
import { reactive, onBeforeMount, useRoute } from '@nuxtjs/composition-api'
import axios from 'axios'
import ChartContainer from '~/components/UI/Market/ChartContainer.vue'
export default {
  components: {
    ChartContainer,
  },
  // head(): handles browser tab information
  head(state) {
    return {
      title: `- ${state.state.cryptoName}`,
      // meta: [
      //   // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      //   {
      //     hid: 'description',
      //     name: 'description',
      //     content: 'My custom description',
      //   },
      // ],
    }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      crypto: null,
      cryptoName: null,
      cryptoDescription: {},
      chartTitle: '',
      dataLoaded: false,
      sparklineDate: [],
      sparklinePrice: [],
    })
    // API data call when crypto is clicked on
    const getCryptoAPI = async () => {
      const cryptoName = route.value.params.crypto
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${cryptoName}`
      )
      state.crypto = response.data
      state.cryptoName = response.data.name
      state.cryptoDescription = response.data.description.en
      getSparklineDay({ day: 1, chartTitle: '1 Day' })
    }
    const dateConverter = (data) => {
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ]
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      const today = new Date(data)
      let hours = today.getHours()
      let minutes = today.getMinutes()
      let ampm = hours >= 12 ? 'pm' : 'am'
      hours = hours % 12
      hours = hours ? hours : 12 // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes
      let dayName = days[today.getDay()]
      let monthName = months[today.getMonth() + 1]
      let date = `
      ${dayName}${', '}${monthName} ${today.getDate()}th, ${today.getFullYear()} ${hours}:${minutes}${ampm} `
      let calendarDate = `${today.getDate()}.${monthName.substring(0, 3)}`
      return date
    }
    const getSparklineDay = async (data) => {
      state.sparklineDate = []
      state.sparklinePrice = []
      state.dataLoaded = false
      const sparklineData = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${state.cryptoName.toLowerCase()}/market_chart?vs_currency=usd&days=${
          data.day
        }`
      )
      switch (data.chartTitle) {
        case '1 Day':
          console.log('1 Day')
          sparklineData.data.prices.map((el) => {
            state.sparklineDate.push(dateConverter(el[0]))
            state.sparklinePrice.push(el[1])
          })
          console.log(state.sparklineDate)
          break
        case '7 Days':
          sparklineData.data.prices.map((el) => {
            state.sparklineDate.push(dateConverter(el[0]))
            state.sparklinePrice.push(el[1])
          })
          break
        case '30 Days':
          sparklineData.data.prices.map((el) => {
            state.sparklineDate.push(new Date(el[0]).toLocaleDateString())
            state.sparklinePrice.push(el[1])
          })
          break
      }

      // console.log(state.sparklinePrice)
      state.dataLoaded = true
    }
    onBeforeMount(getCryptoAPI)
    return { state, getSparklineDay }
  },
}
</script>

<style scoped>
.container {
  display: grid;

  height: 100vh;
  color: white;
}
.top-card-container {
  display: flex;
  justify-content: space-between;
}
.middle-card-container {
  /* height: 30vh; */
}
.name,
.price {
  font-size: 3rem;
}
</style>
