<template>
  <div class="space-y-4">
    <Search
      v-model="filter"
      placeholder="Search for orders"
    />
    <FilterGroup
      v-model="search"
      :filters="filters"
    />
    <div class="bg-white p-3">
      <div class="flex items-center justify-between mb-4">
        <p class=" text-gray-500">Orders</p>
        <div
          v-if="hasActiveEncounter"
          class="bg-serenity-light-gray w-8 h-8 rounded-full ml-6 flex items-center justify-center cursor-pointer"
        >
          <Add
            class="w-4 h-4 text-serenity-primary"
            @click="$trigger('service:request:open', 'laboratory-procedure')"
          />
        </div>
      </div>

      <DataTable
        ref="table"
        :columns="columns"
        :pagination="pagination"
        :data="filteredData"
        class="transparent-table"
        :no-data-label="noDataLabel('orders')"
        :loading="loading"
      >
        <template #default="{ row }">
          <cv-data-table-cell>
            <p>{{ $date.formatDate(row.authored_on, 'MMM dd, yyyy') }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ (row.practitioner_detail ? row.practitioner_detail.name : concatData(row.patient_detail, ['first_name', 'lastname'])) | capitalize }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ row.code }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ $utils.getFirstData(row.order_detail) }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p class="capitalize">{{ $utils.getFirstData(row.service_request_category) | removeDash }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div class="flex items-center">
              <Tag>{{ row.status }}</Tag>
            </div>
          </cv-data-table-cell>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import DataMixin from '@/mixins/data'
import debounce from 'lodash/debounce'

export default {
  name: 'PatientOrders',

  mixins: [DataMixin],

  props: {
    id: {
      type: [String, Number],
      default: null,
    },
  },

  data() {
    return {
      search: '',
      columns: [
        'Date',
        'Requester',
        'Code',
        'Order detail',
        'Category',
        'Status',
      ],
      order: {},
      searchTerms: ['code', 'priority', 'specimen', 'status'],
      filter:'',
    }
  },

  computed: {
    ...mapState({
      data: state => state.patients.patientServiceRequests,
    }),

    ...mapGetters({
      noDataLabel: 'patients/getCurrentPatientNoDataLabel',
      hasActiveEncounter: 'encounters/hasActiveEncounter',
    }),

    filters() {
      return [
        { display: `All (${ this.dataCount })`, code: '' },
        { display: 'Active', code: 'active' },
        { display: 'Draft', code: 'draft' },
        { display: 'Completed', code: 'completed' },
        { display: 'Rejected', code: 'rejected' },
      ]
    },
  },

  watch: {
    filter(search) {
      this.searchServiceRequests(search)
    },
  },

  created() {
    this.refresh({ patient: this.id })
  },

  methods: {
    ...mapActions({
      getData: 'patients/getPatientServiceRequests',
    }),
  
    showOrder(data) {
      this.order = data
      this.visible = true
    },

    searchServiceRequests: debounce(function(search) {
      if (!search) {
        search = null
      }
      this.getData({ patient: this.id, search })
    }, 300, false),
  },
}
</script>
