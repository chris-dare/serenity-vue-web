<template>
  <ProtectedPage
    permission="patient.read"
  >
    <div class="w-4/5 mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Patients ({{ patientsCount }})</p>
        <SeButton
          v-if="$userCan('patient.write')"
          @click="goTo"
        >
          Add new patient <Add class="ml-4 w-5 h-5 text-white" />
        </SeButton>
      </div>

      <PatientsTable />
    </div>
  </ProtectedPage>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PatientsTable from '@/components/patients/PatientsTable'
export default {
  name: 'Patients',

  components: {  PatientsTable },

  computed: {
    ...mapState({
      patientsCount: (state) => state.patients.patientsCount,
    }),
  },

  methods: {
    ...mapActions({
      refreshCurrentPatient: 'patients/refreshCurrentPatient',
    }),

    goTo() {
      this.refreshCurrentPatient()
      this.$router.push({ name: 'Biodata' })
    },
  },
}
</script>]
