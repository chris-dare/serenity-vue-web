<template>
  <div class="my-4">
    <DataTable
      ref="table"
      :columns="columns"
      :data="currentEncounterServiceRequests"
      class="small-table"
    >
      <template #default="{ row }">
        <cv-data-table-cell>
          <div class="py-2">
            {{ row.priority }}
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.code }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.patient_instruction }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ $date.formatDate(row.authored_on, 'yyyy/MM/dd HH:mm a') }}</p>
          </div>
        </cv-data-table-cell>
        <!-- <cv-data-table-cell>
          <div>
            <Edit
              class="text-serenity-primary w-5 h-5"
              @click="$trigger('encounter:add:diagnosis:edit', row)"
            />
          </div>
        </cv-data-table-cell> -->
      </template>
    </DataTable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EncounterServiceRequests',

  data() {
    return {
      columns: [
        'Priority',
        'Code',
        'Patient Instruction',
        'Date',
      ],
    }
  },

  computed: {
    ...mapGetters({
      currentEncounterServiceRequests: 'encounters/currentEncounterServiceRequests',
    }),
  },
}
</script>
