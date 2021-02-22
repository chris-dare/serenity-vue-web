<template>
  <div
    class="w-40 min-w-32 flex flex-col items-center space-y-4"
  >
    <div class="relative flex items-center justify-center">
      <div class="h-96 w-0.5 bg-tetiary" />
      <div
        v-for="(type, typeIndex) in filteredTypes"
        :key="typeIndex"
        :style="`background:${type.color}; top: ${getHeight(type.time)}`"
        class="w-5 h-5 absolute z-10 hover:z-30 cursor-pointer"
        @click="$trigger('patient:medication:open', type)"
      />
    </div>
    <div>
      <p class="text-secondary text-sm">{{ $date.formatDate(line.date, 'MMM dd') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeLine',

  props: {
    line: {
      type: Object,
      default: () => {},
    },

    filter: {
      type: String,
      default: null,
    },
  },

  computed: {
    filteredTypes() {
      return this.line.types.filter(data => !this.filter || data.slug === this.filter)
    },
  },

  methods: {
    getHeight(type) {
      const time = parseInt(type.replace(':',''))

      return `${(time/2400) * 100}%`
    },
  },
}
</script>
