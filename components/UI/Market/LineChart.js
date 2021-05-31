import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: {
    name:{
      type: String
    },
    chartdata: {
      type: Array,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    /* Maps the day that is coming in from CoinGecko but the data has to be broken down to access the UNIX timestamp.
     * Then it is converted to UNIX time to normal calendar dates.
    */
    const date = this.chartdata.map((el)=> (new Date(el[0]).toLocaleDateString('en-US')) )
    const prices = this.chartdata.map(p => p.prices)
    this.renderChart({
      labels: date
    })
  },
}
