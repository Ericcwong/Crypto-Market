<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  setup() {},
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Array,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  async mounted() {
    console.log(this.chartData)
    this.renderChart(this.chartData, this.options)
  },
}
</script>