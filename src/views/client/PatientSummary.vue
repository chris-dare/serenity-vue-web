<template>
  <div class="mt-2 grid grid-cols-2 gap-2">
    <PatientGeneralInfoCard :patient="patient" />
    <PatientEmergencyContactCard :patient="patient" />
    <PatientSocialInfoCard :patient="patient" />
    <PatientSummaryCard title="Payment Method" :fields="summaryFields" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PatientGeneralInfoCard from '@/components/patients/PatientGeneralInfoCard'
import PatientEmergencyContactCard from '@/components/patients/PatientEmergencyContactCard'
import PatientSummaryCard from '@/components/patients/PatientSummaryCard'
import PatientSocialInfoCard from '@/components/patients/PatientSocialInfoCard'
// import { createPatient } from '@/components/patients'
export default {
  name: 'PatientSummary',

  components: {
    PatientGeneralInfoCard,
    PatientEmergencyContactCard,
    PatientSummaryCard,
    PatientSocialInfoCard,
  },

  computed: {
    ...mapState({
      patients: (state) => state.patients.patients,
    }),
    patient() {
      return this.patients[0]
    },
    isSelected() {
      return (index) => this.initialSelected === index
    },
    summaryFields() {
      return [
        { label: 'Method', value: this.$faker().lorem.word() },
        { label: 'Payment Network', value: this.$faker().lorem.word() },
        { label: 'Phone Number', value: this.$faker().lorem.word() },
        { label: 'Name on Account', value: this.$faker().lorem.word() },
        { label: 'Secondary Method', value: this.$faker().lorem.word() },
      ]
    },
  },
}
</script>
