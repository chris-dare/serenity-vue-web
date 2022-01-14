<template>
  <div>
    <cv-data-table-skeleton
      v-if="loading"
      :columns="columns"
      :rows="5"
    />
    <cv-data-table
      v-show="!loading && !noData"
      ref="table"
      :data="[]"
      :columns="columns"
      :class="{'small-table': small}"
    >
      <template slot="data">
        <cv-data-table-row
          v-for="(row, rowIndex) in data"
          :key="`${rowIndex}`"
          :value="`${rowIndex}`"
        >
          <slot :row="row" />
          <template slot="expandedContent">
            <slot
              :row="row"
              name="expand"
            />
          </template>
        </cv-data-table-row>
      </template>
    </cv-data-table>
    <slot
      v-if="noData && !loading"
      class="text-center w-full"
      name="no-data"
    >
      <p class="text-center w-full py-6 bg-white">
        {{ noDataLabel }}
      </p>
    </slot>
    <Pagination
      v-if="paginationDetails"
      :value="paginationDetails.page"
      :total="paginationDetails.numberOfItems"
      :page-size="paginationDetails.itemsPerPage"
      @change="onPageChange"
    />
  </div>
</template>

<script>
import Pagination from '@/components/patients/Pagination'
export default {
  name: 'DataTable',

  components: {Pagination},

  props: {
    columns: {
      type: Array,
      default: () => [],
    },

    data: {
      type: Array,
      default: () => [],
    },

    noDataLabel: {
      type: String,
      default: 'No data is available',
    },

    loading: {
      type: Boolean,
      default: false,
    },

    small: {
      type: Boolean,
      default: false,
    },

    pagination: {
      type: Object,
      default: null,
    },
  },


  data() {
    return {
      isFirstCall: true,
    }
  },

  computed: {
    noData() {
      return this.data.length === 0
    },

    paginationDetails() {
      if (this.noData) {
        return null
      }

      return this.pagination
    },
  },

  methods: {
    onPageChange(event) {
      // if (this.isFirstCall) {
      //   this.isFirstCall = false
      //   return
      // }
      this.$emit('pagination', event)
    },
  },
}
</script>
