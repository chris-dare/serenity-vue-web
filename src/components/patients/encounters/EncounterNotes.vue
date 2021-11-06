<template>
  <div class="my-4">
    <DataTable
      ref="table"
      :columns="columns"
      :data="currentEncounterNotes"
      class="small-table"
    >
      <template #default="{ row }">
        <cv-data-table-cell>
          <div class="py-2">
            {{ $utils.formatName(getSinglePractitioner(row.encounter_practitioner_id).fullName) }}
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.display }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ $date.formatDate(row.modified_at, 'dd MMM, yyyy HH:mm a') }}</p>
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EncounterNotes',

  data() {
    return {
      columns: [
        'Practitioner',
        'Note',
        'Date',
      ],
    }
  },

  computed: {
    ...mapGetters({
      currentEncounterNotes: 'encounters/currentEncounterNotes',
      getSinglePractitioner: 'practitioners/getSinglePractitioner',
    }),
    
  },
}
</script>
