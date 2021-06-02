<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  setup() {},
  extends: Line,
  mixins: [mixins.reactiveProp],
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
    this.renderChart(this.chartData, this.options)
  },
}
</script>