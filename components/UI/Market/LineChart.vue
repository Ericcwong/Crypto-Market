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
    //Handles the vertical line that appears when the user hovers over the graph
    this.$refs.canvas.getContext('2d')
    // new Chart(ctx, config);
    var originalLineDraw = Chart.controllers.line.prototype.draw
    Chart.helpers.extend(Chart.controllers.line.prototype, {
      draw: function () {
        originalLineDraw.apply(this, arguments)

        var chart = this.chart
        var ctx = chart.chart.ctx

        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
          var activePoint = this.chart.tooltip._active[0]
          var ctx = this.chart.ctx
          var x = activePoint.tooltipPosition().x
          var topY = this.chart.scales['y-axis-0'].top
          var bottomY = this.chart.scales['y-axis-0'].bottom

          // draw line
          ctx.save()
          ctx.beginPath()
          ctx.moveTo(x, topY)
          ctx.lineTo(x, bottomY)
          ctx.lineWidth = 0.5
          ctx.strokeStyle = '#eeeeee'
          ctx.stroke()
          ctx.restore()
        }
      },
    })
    this.renderChart(
      {
        labels: this.data,
        datasets: [
          {
            data: this.data,
            borderColor: 'lightblue',
            fill: false,
          },
        ],
      },
      this.options
    )
  },
}
</script>
