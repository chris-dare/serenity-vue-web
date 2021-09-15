<template>
  <div class="space-y-4">
    <Search
      v-if="!hideSearch"
      v-model="search"
      placeholder="Search for patient, enter name or MR number"
    />
    <FilterGroup
      v-model="search"
      :filters="filters"
    />
    <!-- <div>{{ filteredData }}</div> -->
    <DataTable
      ref="table"
      :data="filteredData || []"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      @pagination="actionOnPagination"
    >
      <template #default="{ row }">
        <cv-data-table-cell>
          {{ row.display }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ $date.formatDate(row.occurence, 'dd MMM, yyyy HH:mm a') || '-' }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ row.patient_name || '-' }}
        </cv-data-table-cell>
        <cv-data-table-cell class="text-center">
          {{ $utils.getFirstData(row.specimen, 'display' ) || '-' }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          <Tag
            :variant="row.status !== 'completed' ? 'primary' : row.status === 'cancelled' ? 'error' : 'success'"
            :label="row.status"
          />
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div
            class="flex items-center cursor-pointer"
            :disabled="!$userCan('diagnostic.requests.read')"
            @click="$trigger('diagnostic-order:add:open', {...row})"
          >
            View
            <div class="ml-2 w-5 h-5 rounded-full bg-gray-200 flex justify-center items-center">
              <img
                src="@/assets/img/view 1.svg"
                alt=""
              >
            </div>
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>
    <DiagnosticOrder />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DataMixin from '@/mixins/data'
import DiagnosticOrder from '@/components/diagnostic/modals/DiagnosticOrderModal'

export default {
  name: 'LabsOrders',

  components: { DiagnosticOrder },

  mixins: [DataMixin],

  props: {
    hideSearch: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      search: '',
      selected: 'all',
      loading: false,
      columns: [
        'Service',
        'Request time',
        'Patient',
        'Specimen',
        'Status',
        'Action',
      ],
    }
  },

  computed: {
    ...mapState({
      data: (state) => state.diagnostic.serviceRequests,
    }),

    filters() {
      return [
        { display: `All (${ this.dataCount })`, code: '' },
        { display: 'Active', code: 'active' },
        { display: 'Draft', code: 'draft' },
        { display: 'Completed', code: 'completed' },
      ]
    },
  },

  created() {
    this.paginate = true
    this.searchTerms = ['code', 'status', 'purpose', 'priority', 'patient_name']
    this.refresh()
  },

  methods: {
    ...mapActions({
      getData: 'diagnostic/getServiceRequests',
    }),
    async refresh() {
      this.loading = true
      await this.getData().then(() => this.loading = false).finally(() => this.loading = false)
    },
  },


}
</script>
