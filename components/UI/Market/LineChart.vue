<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: {
    data: {
      type: Array,
      default: null,
    },
    chartColor: {
      type: String,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  async mounted() {
    console.log(this.chartData)
    this.renderChart(
      {
        labels: this.data,
        datasets: [
          {
            data: this.data,
            borderColor: this.chartColor,
            fill: false,
          },
        ],
      },
      this.options
    )
  },
}
</script>
