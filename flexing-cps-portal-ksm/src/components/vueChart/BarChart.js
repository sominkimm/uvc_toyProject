import { Bar, mixins } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.addPlugin(ChartDataLabels, this.options)
    this.renderChart(this.chartData, this.options)
  }
}
