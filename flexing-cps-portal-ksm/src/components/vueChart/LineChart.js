import { Line, mixins } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels'
const { reactiveProp } = mixins

// todo component 위치 변경 필요
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options', 'checkedEnable'],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.addPlugin(ChartDataLabels)
    this.renderChart(this.chartData, this.options)
  }
}
