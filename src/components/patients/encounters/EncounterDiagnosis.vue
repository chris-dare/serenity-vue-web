<template>
  <div class="my-4">
    <DataTable
      ref="table"
      :columns="columns"
      :data="currentEncounterDiagnosis"
      class="small-table"
    >
      <template #default="{ row }">
        <cv-data-table-cell>
          <div class="py-2">
            {{ row.performer_name }}
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.role | removeDash }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.condition }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ $date.formatDate(row.modified_at, 'yyyy/MM/dd HH:mm a') }}</p>
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
  name: 'EncounterDiagnosis',

  data() {
    return {
      columns: [
        'Performer name',
        'Role',
        'Condition',
        'Date',
      ],
    }
  },

  computed: {
    ...mapGetters({
      currentEncounterDiagnosis: 'encounters/currentEncounterDiagnosis',
    }),
  },
}
</script>
