<template>
  <div class="flex items-center justify-center space-x-1 py-4">
    <button
      :disabled="localValue === 1"
      role="button"
      class="bg-gray-200 rounded h-8 w-8 flex items-center justify-center"
      :class="{'cursor-not-allowed bg-opacity-40': localValue === 1}"
      @click="onChange(localValue-1)"
    >
      <ChevronLeft />
    </button>
    <p class="bg-gray-200 rounded h-8 w-8 flex items-center justify-center">{{ localValue }}</p>
    <button
      :disabled="localValue === numberOfPages"
      role="button"
      class="bg-gray-200 rounded h-8 w-8 flex items-center justify-center"
      :class="{'cursor-not-allowed bg-opacity-40': localValue === numberOfPages}"
      @click="onChange(localValue+1)"
    >
      <ChevronRight />
    </button>
  </div>
</template>

<script>
import modelMixin from '@/mixins/model'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/16'
import ChevronLeft from '@carbon/icons-vue/es/chevron--left/16'

export default {
  name: 'Pagination',

  components: { ChevronRight, ChevronLeft },

  mixins: [modelMixin],

  props: {
    total: {
      type: Number,
      default: 0,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 5,
    },
  },

  computed: {
    numberOfPages() {
      return Number(this.total) / Number(this.pageSize)
    },
  },

  methods: {
    onChange(value) {
      this.$emit('change', {
        page: value,
        page_size: this.pageSize,
      })
    },
  },
}
</script>
