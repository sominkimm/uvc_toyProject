<template>
  <div
    :style="`height:${chartHeight}px; padding: 10px;`"
  >
    <div style="display: flex;">
      <h5 class="heading">
        chartCardTitle - {{ chartHeight }}
        <small class="text-mute">device node</small>
      </h5>
      <label
        class="switch switch-primary switch-sm mr-3"
        style="margin-left: auto"
      >
        <span>Chart Value</span>
        <input
          v-model="checkedEnable"
          type="checkbox"
        >
        <span class="slider" />
      </label>
    </div>
    <line-chart
      v-if="chartType === 'Line'"
      :chart-data="chartData"
      :options="options"
      :checked-enable="checkedEnable"
      :style="`height:${chartHeight - 40}px; `"
    />
    <bar-chart
      v-else-if="chartType === 'Bar'"
      :chart-data="chartData"
      :options="options"
      :style="`height:${chartHeight}px;`"
    />
  </div>
</template>

<script>
import LineChart from '@/components/vueChart/LineChart'
import BarChart from '@/components/vueChart/BarChart'

export default {
  components: {
    LineChart,
    BarChart
  },
  props: {
    chartType: {
      type: String
    },
    chartData: {
      type: Object
    },
    options: {
      type: Object
    },
    chartHeight: {
      type: Number
    }
  },
  data () {
    return {
      checkedEnable: true
    }
  }
}
</script>
