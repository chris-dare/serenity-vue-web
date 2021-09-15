<template>
  <div
    ref="chart"
    class="bg-white"
    @mouseenter="show = true"
    @mouseleave="show = false"
  >
    <div class="p-3 px-4">
      <p class="capitalize mb-2">
        {{ chart.title | removeUnderscore }} <span class="text-gray-500">({{ chart.data.length }})</span>
      </p>
      <div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <p class="text-lg font-bold">{{ chart.value }}</p>
            <p class="ml-4 text-xs font-light text-gray-500">{{ chart.per }}</p>
          </div>
          <p
            class=""
            :class="[
              chart.status_color === 'success'
                ? 'text-green-500'
                : 'text-danger',
            ]"
          >
            {{ chart.status }}
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <p class="text-xs font-light text-gray-500">as at:</p>
          <p class="text-xs font-bold">{{ $date.formatDate(chart.date, 'dd/MM/yyyy HH:mm a') }}</p>
        </div>
      </div>
    </div>
    <div>
      <la-cartesian
        :width="width"
        :height="150"
        :data="chart.data"
        :padding="[20, 0, 0, 0]"
        autoresize
      >
        <la-area
          animated
          prop="value"
          color="#0C7882"
          fill-color="#cee4e6"
          curve
          :width="3"
          continued
          dot
        />
        <la-area
          v-if="includesSecondValue"
          animated
          prop="value2"
          color="#0C7882"
          fill-color="#cee4e6"
          curve
          :width="3"
          continued
          dot
        />
        <la-tooltip
          v-if="show"
          ref="tooltip"
        >
          <div
            slot-scope="props"
            class="tooltip"
          >
            <div>
              <div class="flex items-center justify-between">
                <span>Time</span>
                <span>{{ chart.data[props.index] ? $date.formatDate(chart.data[props.index].date) : '' }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span>Value</span>
                <span>{{ chart.data[props.index] ? chart.data[props.index].value : '' }}</span>
              </div>
            </div>
          </div>
        </la-tooltip>
      </la-cartesian>
    </div>
  </div>
</template>

<script>
import { Cartesian, Area, Tooltip } from 'laue'

export default {
  components: {
    LaCartesian: Cartesian,
    LaArea: Area,
    LaTooltip: Tooltip,
  },
  props: {
    chart: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      show: false,
    }
  },

  computed: {
    width() {
      return this.$refs.chart ? this.$refs.chart.clientWidth : 200
    },

    includesSecondValue() {
      return !!this.chart.data.find(v => v.value2)
    },
  },
}
</script>

<style lang="scss" scoped>
.tooltip {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  color: white;
  width: 200px;
  padding: 0.5em;
}
</style>
