<template>
  <div class="mt-2 grid grid-cols-2 gap-2">
    <PatientGeneralInfoCard :patient="patient" />

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
import { mapState } from 'vuex'
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

    isSelected() {
      return (index) => this.initialSelected === index
    },
  
    emergencyFields() {
      return [
        { label: 'First name', value: this.patient.emergency_contact.first_name },
        { label: 'Last name', value: this.patient.emergency_contact.last_name },
        { label: 'Contact', value: this.patient.emergency_contact.telecom.value },
        { label: 'Address', value: this.patient.emergency_contact.address },
      ]
    },

    socialFields() {
      return [
        { label: 'Marital Status', value: this.patient.marital_status },
        { label: 'Religion', value: this.patient.religion },
        { label: 'Language', value: this.patient.language },
        { label: 'Occupation', value: this.patient.occupation },
        { label: 'Company/Employer', value: this.patient.employer},
        { label: 'Office Number', value: this.patient.office_phone_number },
      ]
    },
  
    summaryFields() {
      return [
        { label: 'Method', value: this.patient.payment_method.payment_type },
        { label: 'Payer', value: this.patient.payment_method.payer },
        { label: 'Payment Network', value: this.patient.payment_method.payment_details.payment_provider },
        { label: 'Phone Number', value: this.patient.payment_method.payment_details.msisdn },
      ]
    },
  },
}
</script>
