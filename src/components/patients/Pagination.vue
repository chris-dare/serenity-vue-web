<template>
  <div class="flex items-center justify-between border-t border-solid border-serenity-dark bg-tetiary h-10 divide-x divide-serenity-dark my-4">
    <div class="flex items-center bg-serenity-dark gap-x-px h-full">
      <div
        v-if="pageSizes"
        class="flex items-center space-x-2 bg-tetiary px-2 h-full"
      >
        <p class="text-xs">Items per page:</p>
        <MultiSelect
          v-model="pageSize"
          :options="pageSizes"
          :custom-label="customLabel"
          class="multiselect-borderless"
          :searchable="false"
          @select="onChangePageSize"
        />
      </div>
      <div
        v-if="total"
        class="flex items-center bg-tetiary px-2 h-full"
      >
        <p class="text-xs">Total: {{ $number(total, { precision: 0, separator: ',', symbol: ''}).format() }} items</p>
      </div>
    </div>
    <div class="grid grid-cols-4 bg-serenity-dark gap-x-px h-full">
      <div class="col-span-2 flex items-center bg-tetiary px-2 border-l border-serenity-dark">
        <MultiSelect
          v-model="localValue"
          :options="normalizedVisiblePages"
          :custom-label="customLabel"
          class="multiselect-borderless"
          :options-limit="4"
          @select="onChange"
        />
        <p class="text-xs">of {{ $number(numberOfPages, { precision: 0, separator: ',', symbol: ''}).format() }}</p>
      </div>
      <button
        :disabled="localValue === 1"
        role="button"
        class="flex items-center justify-center bg-tetiary px-2 h-full hover:bg-gray-200"
        :class="{'cursor-not-allowed': localValue === 1}"
        @click="onChange(localValue-1)"
      >
        <ChevronLeft />
      </button>
      <button
        :disabled="localValue === numberOfPages"
        role="button"
        class="flex items-center justify-center bg-tetiary px-2 h-full hover:bg-gray-200"
        :class="{'cursor-not-allowed': localValue === numberOfPages}"
        @click="onChange(localValue + 1)"
      >
        <ChevronRight />
      </button>
    </div>
  </div>
</template>

<script>
import modelMixin from '@/mixins/model'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/16'
import ChevronLeft from '@carbon/icons-vue/es/chevron--left/16'
import throttle from 'lodash/throttle'

export default {
  name: 'Pagination',

  // eslint-disable-next-line vue/no-unused-components
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
    pageSizes: {
      type: Array,
      default: () => [5, 10, 15,20,50],
    },
  },

  data() {
    return {
      visiblePagesCount: 10,
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

    staggerChange: throttle(function(value) {
      this.onChange(value)
    }, 300),

    onChangePageSize(value) {
      this.$emit('change', {
        page: this.localValue,
        page_size: value,
        length: value,
        start: this.pageStart,
      })
    },

    customLabel (value) {
      return value
    },
  },
}
</script>
