<template>
  <div>
    <DataTable
      small
      :data="currentEncounterCarePlans"
      :columns="columns"
      no-data-label="No care plan is available"
    >
      <template #default="{row}">
        <cv-data-table-cell>
          <div>
            <p>{{ row.description }}</p>
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'CarePlanTable',

  data() {
    return {
      columns: ['Description'],
    }
  },

  computed: {
    ...mapState({
      carePlans: (state) => state.patients.patientCarePlans,
    }),

    ...mapGetters({
      currentEncounterCarePlans: 'encounters/currentEncounterCarePlans',
    }),
  },
}
</script>
