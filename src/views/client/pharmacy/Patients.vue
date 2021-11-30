<template>
  <div>
    <div class="max-w-7xl mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Patients</p>
      </div>

      <PatientsTable
        :filters="filters"
        route="Pharmacy:PatientPrescriptions"
        :query="{ type: 'existing' }"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PatientsTable from '@/components/patients/PatientsTable'

export default {
  name: 'Patients',

  components: {  PatientsTable },

  computed: {
    ...mapState({
      patientsCount: (state) => state.patients.patientsCount,
    }),

    filters() {
      return [
        { display: `All (${ this.patientsCount })`, code: '' },
        { display: 'Active', code: 'active' },
      ]
    },
  },
}
</script>]
