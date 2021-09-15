<template>
  <div>
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Patients</p>
      </div>
      <PatientsTable
        route="Diagnostic:Patient"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PatientsTable from '@/components/diagnostic/PatientsTable'

export default {
  name: 'DiagnosticPatients',

  components: { PatientsTable },

  computed: {
    ...mapState({
      patientsCount: (state) => state.patients.patientsCount,
    }),

    filters() {
      return [
        { display: `All (${ this.patientsCount })`, code: '' },
        { display: 'Active', code: 'active' },
        { display: 'Sample Request', code: 'sample' },
        { display: 'Walk-in patients', code: 'walk-in' },
      ]
    },
  },
}
</script>]
