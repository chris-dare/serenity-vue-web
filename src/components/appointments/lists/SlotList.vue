<template>
  <div v-if="noData">
    <p>No available slots</p>
  </div>
  <div v-else>
    <Search v-model="search" />
    <div
      v-for="(doctor, i) in filteredData"
      :key="i"
    >
      <SlotListItem
        v-model="localValue"
        :doctor="doctor"
      />
    </div>
    <cv-pagination
      :number-of-items="normalizedData.length"
      :page="page" 
      :backwards-button-disabled="page === 1"
      :forwards-button-disabled="false"
      :page-sizes="pagination.pageSizes"
      @change="actionOnPagination"
    />
  </div>
</template>

<script>
import SlotListItem from '@/components/appointments/lists/SlotListItem'
import modelMixin from '@/mixins/model'
import dataMixin from '@/mixins/data'

export default {
  name: 'SlotList',

  components: {SlotListItem},

  mixins: [modelMixin, dataMixin],

  props: {
    data: {
      type: Array,
      default: () => [],
    },

    dataLoading: {
      type: Boolean,
      default: false,
    }, 
  },

  created() {
    this.searchTerms = ['practitioner_name', 'slot', 'start', 'end']
    this.paginate= true
    this.pageLength = 5
    this.pageSizes = [5,10, 15, 20, 25]
  },
}
</script>
