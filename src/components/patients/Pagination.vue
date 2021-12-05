<template>
  <div class="flex items-center justify-between">
    <div v-if="total">
      <p>Total: {{ $number(total, { precision: 0, separator: ',', symbol: ''}).format() }}</p>
    </div>
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
      <button
        v-for="(visiblePage, index) in normalizedVisiblePages"
        :key="index"
        role="button"
        class="bg-gray-200 rounded h-8 w-auto min-w-8 px-2 flex items-center justify-center"
        :class="{ 'text-serenity-primary font-bold': visiblePage === localValue }"
        @click="onChange(visiblePage)"
      >
        {{ visiblePage }}
      </button>
      <button
        :disabled="localValue === numberOfPages"
        role="button"
        class="bg-gray-200 rounded h-8 w-8 flex items-center justify-center"
        :class="{'cursor-not-allowed bg-opacity-40': localValue === numberOfPages}"
        @click="onChange(localValue + 1)"
      >
        <ChevronRight />
      </button>
    </div>

    <div class="flex items-center">
      <p>Go to:</p>
      <FormInput
        :value="localValue"
        type="number"
        class="w-20"
        :max="numberOfPages"
        @input="staggerChange"
      />
    </div>
  </div>
</template>

<script>
import modelMixin from '@/mixins/model'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/16'
import ChevronLeft from '@carbon/icons-vue/es/chevron--left/16'
import debounce from 'lodash/debounce'

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

  data() {
    return {
      visiblePagesCount: 5,
    }
  },

  computed: {
    numberOfPages() {
      return Math.round(Number(this.total) / Number(this.pageSize))
    },

    pageStart() {
      const start = ((this.localValue - 1) * this.pageSize) + 1
      return start < this.total ? start : 1
    },

    normalizedVisiblePages() {
      return this.numberOfPages > this.visiblePagesCount ? this.visiblePages : this.visiblePages.slice(0, this.numberOfPages)
    },

    visiblePages() {
      const currentPage = this.localValue
      const pageCount = this.numberOfPages
      const visiblePagesCount = this.visiblePagesCount
      const visiblePagesThreshold = (visiblePagesCount - 1) / 2
      const pagintationTriggersArray = Array(this.visiblePagesCount - 1).fill(0)

      if (currentPage <= visiblePagesThreshold + 1) {
        pagintationTriggersArray[0] = 1
        const pagintationTriggers = pagintationTriggersArray.map((paginationTrigger, index) => {
          return pagintationTriggersArray[0] + index
        },
        )
        pagintationTriggers.push(pageCount)
        return pagintationTriggers
      }


      if (currentPage >= pageCount - visiblePagesThreshold + 1) {
        const pagintationTriggers = pagintationTriggersArray.map((paginationTrigger, index) => {
          return pageCount - index
        },
        )
        pagintationTriggers.reverse().unshift(1)
        return pagintationTriggers
      }


      pagintationTriggersArray[0] = currentPage - visiblePagesThreshold + 1 
      const pagintationTriggers = pagintationTriggersArray.map((paginationTrigger, index) => {
        return pagintationTriggersArray[0] + index
      })
      pagintationTriggers.unshift(1)
      pagintationTriggers[pagintationTriggers.length - 1] = pageCount
      return pagintationTriggers
    },
  },

  methods: {
    onChange(value) {
      if (value > this.numberOfPages) return
      this.$emit('change', {
        page: value,
        page_size: this.pageSize,
        length: this.pageSize,
        start: this.pageStart,
      })
    },

    staggerChange: debounce(function(value) {
      this.onChange(value)
    }, 300),
  },
}
</script>
