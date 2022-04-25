<template>
  <div class="space-y-4">
    <Search
      v-model="search"
      placeholder="Search for medication or date or condition"
    />
    <FilterGroup
      v-model="search"
      :filters="filters"
    />
    <div class="grid grid-cols-5 gap-4">
      <p
        v-if="!dataCount && !loading"
        class="col-span-5 text-center py-6 bg-white"
      >
        {{ noDataLabel('reports') }}
      </p>
      <Loading v-if="loading" />
      <div
        v-for="(report, index) in filteredData"
        :key="index"
      >
        <XrayCard
          v-if="report.specimen_types === 'image scan'"
          :report="report"
          :date="$date.formatDate(report.effective_date_time, 'dd MMM, yyyy')"
          @click="$trigger('lab:result:open', report.id)"
        />
        <ReportCard
          v-else
          :report="report"
          :date="$date.formatDate(report.effective_date_time, 'dd MMM, yyyy')"
          @click="$trigger('lab:result:open', report.id)"
        />
      </div>
    </div>
    <LabTestModal />
  </div>
</template>

<script>
import ReportCard from '@/components/patients/reports/ReportCard'
import XrayCard from '@/components/patients/reports/XrayCard'
import LabTestModal from '@/components/patients/reports/LabTestModal'
import dataMixin from '@/mixins/data'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'PatientReports',

  components: { ReportCard, XrayCard, LabTestModal },

  mixins: [dataMixin],

  data() {
    return {
      search: '',
      searchTerms: ['category'],
    }
  },

  computed: {
    ...mapState({
      data: state => state.diagnostic.diagnosticReports,
    }),

    ...mapGetters({
      noDataLabel: 'patients/getCurrentPatientNoDataLabel',
    }),

    filters() {
      return [
        { display: `All (${ this.dataCount })`, code: '' },
        { display: `Lab Reports (${ this.dataCount })`, code: 'laboratory' },
        { display: `X-ray (${ 0 })`, code: 'x-ray' },
        { display: `CT Scans (${ 0 })`, code: 'ct-scans' },
        { display: `MRI Scans (${ 0 })`, code: 'mri-scans' },
        { display: `Surgery Reports (${ 0 })`, code: 'surgery' },
        { display: `Discharge Reports (${ 0 })`, code: 'discharge' },
      ]
    },
  },

  created() {
    this.refresh({ patient: this.$route.params.id })
  },

  methods: {
    ...mapActions({
      getData: 'diagnostic/getDiagnosticReports',
    }),
  },
}
</script>
