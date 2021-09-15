<template>
  <div class="mt-2 grid grid-cols-2 gap-2">
    <PatientGeneralInfoCard
      :patient="patient"
      :vitals="vitals"
    />

    <PatientSummaryCard
      title="Emergency Contact"
      :fields="emergencyFields"
    />
    <PatientSummaryCard
      title="Social Information"
      :fields="socialFields"
    />

    <PatientSummaryCard
      title="Payment Method"
      :fields="summaryFields"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import PatientGeneralInfoCard from '@/components/patients/PatientGeneralInfoCard'
import PatientSummaryCard from '@/components/patients/PatientSummaryCard'

export default {
  name: 'PatientSummary',

  components: {
    PatientGeneralInfoCard,
    PatientSummaryCard,
  },

  computed: {
    ...mapState({
      patient: (state) => state.patients.currentPatient,
    }),

    ...mapGetters({
      vitals: 'encounters/currentEncounterLatestVitals',
    }),

    isSelected() {
      return (index) => this.initialSelected === index
    },

    emergencyFields() {
      if(!this.patient.emergency_contact)return []
      return [
        { label: 'First name', value: this.patient.emergency_contact.first_name },
        { label: 'Last name', value: this.patient.emergency_contact.last_name },
        { label: 'Mobile', value: this.patient.emergency_contact.mobile },
        { label: 'Email', value: this.patient.emergency_contact.email },
        { label: 'Address', value: this.patient.emergency_contact.line_address },
      ]
    },

    socialFields() {
      if(!this.patient)return []
      return [
        { label: 'Marital Status', value: this.patient.marital_status },
        { label: 'Religion', value: this.patient.religious_affiliation },
        { label: 'Language', value: this.patient.language },
        { label: 'Occupation', value: this.patient.occupation },
        { label: 'Company/Employer', value: this.patient.employer},
      ]
    },

    summaryFields() {
      if(!this.patient.payment_method)return []
      return [
        { label: 'Description', value: this.patient.payment_method.description },
        { label: 'Balance', value: this.$currency(this.patient.payment_method.balance, this.patient.payment_method.currency).format() },
        { label: 'Limit', value: this.$currency(this.patient.payment_method.limit, this.patient.payment_method.currency).format() },
        { label: 'Status', value: this.patient.payment_method.status },
      ]
    },
  },
}
</script>
