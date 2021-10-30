<template>
  <div class="space-y-4">
    <Search
      v-if="!hideSearch"
      v-model="search"
      placeholder="Search for patient, enter name or MR number"
    />
    <div
      v-if="hideSearch"
      class="my-4 flex items-center space-x-2"
    >
      <cv-button
        class="border-gray-800 bg-gray-800 text-white focus:bg-gray-700 hover:bg-gray-700 px-6"
        kind="tertiary"
        @click="$router.go(-1)"
      >
        Go Back
      </cv-button>
    </div>
    <FilterGroup
      v-model="search"
      :filters="filters"
    />
    <DataTable
      ref="table"
      :data="filteredData"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      @pagination="actionOnPagination"
    >
      <template #default="{ row }">
        <cv-data-table-cell>
          {{ row && row.code || '-' }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ $date.formatDate(row.effective_date_time, 'dd MMM, yyyy HH:mm a') || '-' }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ row.patient_detail.first_name + ' ' + row.patient_detail.lastname || '' }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ row.status || '' }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div
            class="flex items-center cursor-pointer"
            :disabled="!$userCan('diagnostic.reports.read')"
            @click="$trigger('diagnostic-report:open', row.id)"
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
    <LabTestModal />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DataMixin from '@/mixins/data'
import LabTestModal from '@/components/patients/reports/LabTestModal'


export default {
  name: 'LabsReports',

  components: { LabTestModal },

  mixins: [DataMixin],

  props: {
    hideSearch: {
      type: Boolean,
      default: false,
    },

    hideWalk: {
      type: Boolean,
      default: false,
    },

    id: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      search: '',
      selected: 'all',
      loading: false,
      columns: [
        'Report ID',
        'Date',
        'Patient',
        'Status',
        'Action',
      ],
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.diagnostic.diagnosticReports,
    }),

    filters() {
      return [
        { display: `All (${ this.dataCount })`, code: '' },
        { display: 'Partial', code: 'partial' },
        { display: 'Registered', code: 'registered' },
        { display: 'Preliminary', code: 'preliminary' },
        { display: 'Final', code: 'final' },
      ]
    },
  },

  watch: {
    search: {
      handler(val) {
        if (val) {
          this.loading = true
          this.getData({search: val}).finally(() =>  this.loading = false)
         
        }
      },
    },
  },


  created() {
    this.paginate = true
    this.searchTerms = ['code', 'specimen', 'status', 'patient_name']
    this.init()
  },

  methods: {
    ...mapActions({
      getData: 'diagnostic/getDiagnosticReports',
      refresh: 'patients/refreshCurrentPatient',
    }),
    async init() {
      this.loading = true
      let id = { patient: this.$route.params.id}
      this.getData(id ? id : null).then(() => this.loading = false).finally(() => this.loading = false)
    },
  },


}
</script>
