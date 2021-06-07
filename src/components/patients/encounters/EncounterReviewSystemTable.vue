<template>
  <div class="my-4">
    <DataTable
      ref="table"
      :columns="columns"
      :data="currentEncounterExamSystems"
      class="small-table"
    >
      <template #default="{ row }">
        <cv-data-table-cell>
          <div class="py-2">
            {{ row.unit }}
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.value }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ $date.formatDate(row.effective_date_time, 'yyyy/MM/dd HH:mm a') }}</p>
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EncounterReviewSystemTable',

  data() {
    return {
      columns: [
        'Unit',
        'Value',
        'Date',
      ],
    }
  },

  computed: {
    ...mapGetters({
      currentEncounterExamSystems: 'encounters/currentEncounterExamSystems',
    }),
    
  },
}
</script>
