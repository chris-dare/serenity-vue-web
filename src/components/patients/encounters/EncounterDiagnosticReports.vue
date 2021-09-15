<template>
  <div class="my-4">
    <DataTable
      ref="table"
      :columns="columns"
      :data="currentEncounterDiagnosticReports"
      class="small-table"
    >
      <template #default="{ row }">
        <cv-data-table-cell>
          <div class="py-2">
            {{ row.diagnostic_report_category[0].display }}
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.diagnostic_report_specimen[0].display }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.diagnostic_report_results[0].display }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ $date.formatDate(row.issued_date, 'dd MMM, yyyy HH:mm a') }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <Tag>{{ row.status }}</Tag>
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EncounterDiagnosticReports',

  data() {
    return {
      columns: [
        'Category',
        'Specimen',
        'Results',
        'Date',
        'Status',
      ],
    }
  },

  computed: {
    ...mapGetters({
      currentEncounterDiagnosticReports: 'encounters/currentEncounterDiagnosticReports',
    }),
  },
}
</script>
