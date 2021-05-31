<script>
import { Line } from 'vue-chartjs'
import axios from 'axios'
export default {
  extends: Line,
  props: {
    name: {
      type: String,
    },
    date: {
      type: Array,
      default: null,
    },
    prices: {
      type: Array,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  async mounted() {
    this.renderChart(
      {
        labels: date,
        datasets: [
          {
            data: prices,
            borderColor: '#f39c12',
            fill: false,
          },
        ],
      },
      this.options
    )
  },
}
</script>
