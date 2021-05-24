import Patient from '@/models/Patient'
export default {
  patients: state => {
    return state.patients.map(pat => {
      const patient = new Patient(pat).getNormalizedView()
      return patient
    })
  },

  patientMedications: state => {
    if (!state.currentPatient) {
      return []
    }
    return state.patientMedications.filter(medication => medication.patient === state.currentPatient.id)
  },

  patientLabRequests: state => {
    if (!state.currentPatient) {
      return []
    }
    return state.patientServiceRequests.filter(lab => lab.patient === state.currentPatient.id && lab.category === 'laboratory-proceedure')
  },

  patientObservations: state => {
    if (!state.currentPatient) {
      return []
    }
    return state.patientObservations.filter(lab => lab.patient === state.currentPatient.id)
  },
}
