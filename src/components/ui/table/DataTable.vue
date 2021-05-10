<template>
  <div>
    <cv-data-table-skeleton
      v-if="loading"
      :columns="columns"
      :rows="5"
    />
    <cv-data-table
      v-else
      ref="table"
      :data="[]"
      :columns="columns"
      :pagination="paginationDetails"
      @pagination="$emit('pagination', $event)"
    >
      <template slot="data">
        <cv-data-table-row
          v-for="(row, rowIndex) in data"
          :key="`${rowIndex}`"
          :value="`${rowIndex}`"
        >
          <slot :row="row" />
        </cv-data-table-row>
      </template>
    </cv-data-table>
    <slot
      v-if="noData && !loading"
      class="text-center w-full py-6"
      name="no-data"
    >
      <p class="text-center w-full py-6">
        {{ noDataLabel }}
      </p>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'DataTable',

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

    pagination: {
      type: Object,
      default: null,
    },
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
}
</script>
