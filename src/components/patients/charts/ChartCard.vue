<template>
  <div class="bg-white">
    <div class="p-3 px-4">
      <p class=" mb-2">
        {{ chart.title }} <span class="text-gray-500">(8)</span>
      </p>
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
        <p class="text-xs font-bold">{{ $date.formatDate($faker().date.recent(), 'dd/MM/yyyy HH:mm a') }}</p>
      </div>
    </div>
    <div>
      <ccv-area-chart
        class="chart"
        :data="data"
        :options="options"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chart: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      data: [
        {
          group: 'Dataset 1',
          date: '2019-01-01T00:00:00.000Z',
          value: 0,
        },
        {
          group: 'Dataset 1',
          date: '2019-01-06T00:00:00.000Z',
          value: 300,
        },
        {
          group: 'Dataset 1',
          date: '2019-01-08T00:00:00.000Z',
          value: 400,
        },
        {
          group: 'Dataset 1',
          date: '2019-01-15T00:00:00.000Z',
          value: 100,
        },
      ],
    }
  },

  computed: {
    options() {
      return {
        axes: {
          bottom: {
            mapsTo: 'date',
            scaleType: 'time',
            visible: false,
            margins: 0,
          },
          left: {
            mapsTo: 'value',
            scaleType: 'linear',
            visible: false,
          },
        },
        grid: {
          x: { enabled: false },
          y: { enabled: false },
        },
        legend: {
          enabled: false,
        },
        curve: 'curveNatural',
        height: '8rem',
        getStrokeColor: function () {
          return '#0B6B74'
        },
        getFillColor: function () {
          return '#cee4e6'
        },
        color: {
          scale: {
            'Dataset 1': '#0B6B74',
          },
        },
      }
    },
  },
}
</script>
