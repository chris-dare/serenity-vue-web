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

          <Pagination
            :value="page"
            :total="normalizedData.length"
            :page-size="5"
            @change="actionOnPagination"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PractionersListItem from '@/components/appointments/lists/PractitionersListItem'
import Pagination from '@/components/patients/Pagination'
import modelMixin from '@/mixins/model'
import dataMixin from '@/mixins/data'

export default {
  name: 'PractitionersList',

  components: { PractionersListItem, Pagination },

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
