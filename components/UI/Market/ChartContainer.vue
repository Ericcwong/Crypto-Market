<template>
  <div class="line-chart-container">
    <div class="top-container">
      <span class="chart-timeline">{{ state.chartTimeOption }} Chart</span>
    </div>
    <div v-if="state.dataLoaded !== false">
      <line-chart
        :chartData="state.chartData"
        :options="state.options"
      ></line-chart>
    </div>

    <v-card-text>
      <h6>Chart Options:</h6>
      <v-chip
        v-for="button in state.buttonOptions"
        :key="button.day"
        class="mr-2"
        ref="1d"
        @click="
          getSparklineDay({
            day: button.day,
            chartTimeOption: button.chartTimeOption,
          })
        "
      >
        <v-icon left>mdi-calendar </v-icon>
        {{ button.chartDescription }}
      </v-chip>
    </v-card-text>
  </div>
</template>

<script>
import LineChart from './LineChart.vue'
import { toRefs, reactive, onMounted } from '@nuxtjs/composition-api'
import axios from 'axios'
export default {
  components: { LineChart },
  props: {
    cryptoName: { type: String },
  },

  setup(props) {
    //Assigning props
    let cryptoName = props.cryptoName
    // Handles the mouse hover over the graph. Formatting the date information to U.S. Standards.
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
      return date
    }
    const getSparklineDay = async (data) => {
      state.chartData.labels = []
      state.chartData.datasets[0].data = []
      state.dataLoaded = false
      const sparklineData = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${cryptoName.toLowerCase()}/market_chart?vs_currency=usd&days=${
          data.day
        }`
      )

      switch (data.chartTimeOption) {
        case '1 Day':
          state.chartTimeOption = data.chartTimeOption
          sparklineData.data.prices.map((el) => {
            state.chartData.labels.push(dateConverter(el[0]))
            if (el[1] > 1) {
              state.chartData.datasets[0].data.push(el[1].toFixed(2))
            } else {
              state.chartData.datasets[0].data.push(el[1].toFixed(3))
            }
          })
          break
        case '7 Days':
          state.chartTimeOption = data.chartTimeOption
          sparklineData.data.prices.map((el) => {
            state.chartData.labels.push(dateConverter(el[0]))
            if (el[1] > 1) {
              state.chartData.datasets[0].data.push(el[1].toFixed(2))
            } else {
              state.chartData.datasets[0].data.push(el[1].toFixed(3))
            }
          })
          break
        case '30 Days':
          state.chartTimeOption = data.chartTimeOption
          sparklineData.data.prices.map((el) => {
            state.chartData.labels.push(new Date(el[0]).toLocaleDateString())
            if (el[1] > 1) {
              state.chartData.datasets[0].data.push(el[1].toFixed(2))
            } else {
              state.chartData.datasets[0].data.push(el[1].toFixed(3))
            }
          })
          break
      }
      state.dataLoaded = true
    }
    const state = reactive({
      dataLoaded: false,
      chartTimeOption: '',
      buttonOptions: [
        { day: 1, chartTimeOption: '1 Day', chartDescription: '1 Day' },
        { day: 7, chartTimeOption: '7 Days', chartDescription: '7 Days' },
        { day: 30, chartTimeOption: '30 Days', chartDescription: '30 Days' },
        { day: 183, chartTimeOption: '30 Days', chartDescription: '6 Months' },
        { day: 365, chartTimeOption: '30 Days', chartDescription: '1 Year' },
        {
          day: 'max',
          chartTimeOption: '30 Days',
          chartDescription: 'All time',
        },
      ],
      // Chart Options
      options: {
        //Display the name of the graph
        legend: {
          display: false,
        },
        //When user hover over the graph it will stick to the x-axis.
        tooltips: {
          intersect: false,
          mode: 'x-axis',
        },
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 1,
          },
        },
        scales: {
          xAxes: [
            {
              title: {
                text: 'hello there',
              },
              display: false,
            },
          ],
        },
      },
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Price: $',
            data: [],
            borderColor: 'lightblue',
            fill: false,
          },
        ],
      },
    })
    onMounted(() => {
      getSparklineDay({ day: 1, chartTimeOption: '1 Day' })
    })
    return { state, getSparklineDay }
  },
}
</script>

<style scoped>
.top-container {
  margin-bottom: 5%;
  text-align: center;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
}
.chart-detail {
}
.v-card__text {
  margin-top: 5%;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
}
</style>
