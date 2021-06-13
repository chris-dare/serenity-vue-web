<template>
  <div>
    <div class="w-4/5 mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Find patient</p>
      </div>

      <PatientsTable
        :filters="filters"
        route="Pharmacy:PatientPrescriptions"
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
        { display: 'Active (0)', code: 'active' },
      ]
    },
  },
}
</script>]
