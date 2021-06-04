<template>
  <div class="relative">
    <cv-data-table-skeleton
      v-if="dataLoading"
      :columns="2"
      :rows="2"
    />
    <div v-else>
      <div
        v-if="hasSlotData"
        class="space-y-2"
      >
        <div v-if="!localValue.id">
          <p>No available doctor</p>
        </div>
        <div v-else>
          <PractionersListItem
            v-model="localValue"
            :doctor="localValue"
          />
        </div>

        <div class="flex justify-end">
          <SeButton @click="localValue = {}">Change doctor</SeButton>
        </div>
      </div>

      <div v-else>
        <div v-if="filteredData.length === 0">
          <p>No available doctor</p>
        </div>
        <div v-else>
          <Search v-model="search" />
          <div
            v-for="(doctor, i) in filteredData"
            :key="i"
          >
            <PractionersListItem
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
      </div>
    </div>
  </div>
</template>

<script>
import PractionersListItem from '@/components/appointments/lists/PractitionersListItem'
import modelMixin from '@/mixins/model'
import dataMixin from '@/mixins/data'

export default {
  name: 'PractitionersList',

  components: {PractionersListItem},

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

  

  computed: {
    hasSlotData() {
      return Object.keys(this.localValue).length !== 0
    },
  },

  created() {
    this.localValue = this.data[0] || {}
    this.searchTerms = ['practitioner_name', 'slot', 'start', 'end']
    this.paginate= true
    this.pageLength = 5
    this.pageSizes = [5,10, 15, 20, 25]
  },
}
</script>
