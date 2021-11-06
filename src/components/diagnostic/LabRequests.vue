<template>
  <div class="space-y-4">
    <div class="my-4 flex items-center space-x-2">
      <cv-button
        class="border-gray-800 bg-gray-800 text-white focus:bg-gray-700 hover:bg-gray-700 px-6"
        kind="tertiary"
        @click="$router.go(-1)"
      >
        Go Back
      </cv-button>
    </div>
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
          {{ row.code }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ $utils.formatName(row.patient_detail.first_name + ' ' + row.patient_detail.lastname) || '' }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ row.status || '' }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div
            class="flex items-center cursor-pointer"
            :disabled="!$userCan('diagnostic.reports.read')"
            @click="$trigger('diagnostic-report:open', { ...row })"
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
    <DiagnosticReport />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DiagnosticReport from '@/components/diagnostic/modals/DiagnosticReportModal'
import DataMixin from '@/mixins/data'
export default {
  name: 'LabsRequest',

  components: { DiagnosticReport },

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
  },

  data() {
    return {
      search: '',
      selected: 'all',
      loading: false,
      columns: [
        'Report ID',
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
        { display: 'Final', code: 'final' },
      ]
    },
  },

  mounted() {
    this.paginate = true
    this.searchTerms = ['code', 'specimen', 'status']
  },

  created(){
    this.init()
  },

  methods: {
    ...mapActions({
      getData: 'diagnostic/getPatientReports',
      refresh: 'patients/refreshCurrentPatient',
    }),

    init() {
      this.loading = true
      let id = { patient: this.$route.params.id}
      this.getData(id).finally(() => this.loading = false )
    },
  },

}
</script>
