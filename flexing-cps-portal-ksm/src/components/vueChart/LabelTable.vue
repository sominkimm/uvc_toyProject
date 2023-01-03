<template>
  <b-card
    :style="{
      backgroundColor: rect.chartColor,
      opacity: `${rect.opacity}%`
    }"
    class="text-center"
  >
    <div>
      <!-- - {{ chartData.datasets[0].label }} -->
      <span class="text-white">{{ formatTitle(chartCardTitle) }}</span>
    </div>
    <div
      class="d-inline-block"
      style="position: relative; top:20%;"
    >
      <h3 class="heading display-3 text-white t-font-boldest">
        {{ formatLabel(labelChartData) }}
        <span
          class="text-white"
          style="font-size: xx-large"
        >
          {{ rect.labelPostfix }}
        </span>
      </h3>
    </div>
  </b-card>
</template>
<script>
export default {
  name: 'LabelTable',
  props: {
    chartData: {
      type: Object,
      default: () => {}
    },
    rect: {
      type: Object,
      default: () => {}
    },
    labelChartData: {
      type: Number,
      default: null
    },
    chartCardTitle: {
      type: String,
      default: null
    }
  },
  methods: {
    formatTitle (val) {
      let reData
      if (val === null || val === undefined) {
        reData = '-'
      } else {
        reData = val
      }
      return reData
    },
    formatLabel (val) {
      const labelChartFilter = this.rect.labelChartFilter
      let reData = null
      for (const key in labelChartFilter) {
        if (labelChartFilter[key].oriName === val) {
          reData = labelChartFilter[key].chaName
        } else {
          reData = val
        }
      }

      reData = this.rect.labelChartFilter.filter(x => x.oriName === String(val))
      if (reData.length === 0) {
        reData = val
      } else {
        reData = reData[0].chaName
      }

      return reData
    }
  }
}
</script>

<style scoped>

</style>
