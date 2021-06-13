<template>
  <div>
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

      <PatientsTable :filters="filters" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import PatientsTable from '@/components/patients/PatientsTable'
import Male from '@carbon/icons-vue/es/gender--male/16'
import Female from '@carbon/icons-vue/es/gender--female/16'
export default {
  name: 'Patients',

  components: {  PatientsTable },

  computed: {
    ...mapState({
      patientsCount: (state) => state.patients.patientsCount,
    }),

    ...mapGetters({
      maleCount: 'patients/maleCount',
      femaleCount: 'patients/femaleCount',
    }),

    filters() {
      return [
        { display: `All (${ this.patientsCount })`, code: '' },
        { display: `In-patient (${ 0 })`, code: 'in-patient' },
        { display: `Male (${ this.maleCount })`, code: 'male', icon: Male },
        { display: `Female (${ this.femaleCount })`, code: 'female', icon: Female },
      ]
    },
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
