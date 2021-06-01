import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: {
    chartData: {
      type: Array,
      default: null,
    },
    date: {
      type: Array,
      default: null,
    },
    prices: {
      type: Array,
      default: null,
    },
  },
  mounted() {
    console.log(this.chartData)
    this.renderChart({
      datasets: [{}],
    })
  },
}
