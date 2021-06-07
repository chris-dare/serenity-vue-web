<template>
  <div class="overflow-x-scroll mt-4 py-8 series space-y-4">
    <div class="flex">
      <TimeLine
        v-for="(line, index) in series"
        :key="index"
        :line="line"
        :filter="filter"
      />
    </div>
    <div class="grid grid-cols-2">
      <p class="text-secondary text-center">2020</p>
      <p class="text-secondary text-center">2021</p>
    </div>
  </div>
</template>

<script>
import TimeLine from './TimeLine'
export default {
  name: 'TimeSeries',

  components: {
    TimeLine,
  },

  props: {
    series: {
      type: Array,
      required: true,
    },
    filter: {
      type: String,
      default: null,
    },
  },
}
</script>
