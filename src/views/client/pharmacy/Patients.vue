<template>
  <div>
    <div class="w-4/5 mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Find patient</p>
      </div>

      <PatientsTable />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PatientsTable from '@/components/pharmacy/PatientsTable'
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
