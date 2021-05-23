<template>
  <div>
    <div class="w-4/5 mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Patients ({{ patientsCount }})</p>
      </div>

      <PatientsTable route="VirtualCare:Patient" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PatientsTable from '@/components/patients/PatientsTable'
export default {
  name: 'VirtualCarePatients',

  components: {  PatientsTable },

  computed: {
    ...mapState({
      patientsCount: (state) => state.patients.patientsCount,
    }),
  },
}
</script>]
