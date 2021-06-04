import Patient from '@/models/Patient'
export default {
  patients: state => {
    return state.patients.map(pat => {
      const patient = new Patient(pat).getNormalizedView()
      return patient
    })
  },

  patientIsDeceased: state => {
    if (!state.currentPatient) return false
    return state.currentPatient.is_deceased
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

  getCurrentPatientNoDataLabel: state => (field = 'data') => {
    let patient = state.currentPatient.fullName
    return `You have no ${field} available for this ${patient}`
  },

  patientHasVisit: (state, getters) => {
    if (!state.currentPatient) return false
    return !!getters.patientVisit
  },

  patientVisit: (state, getters, rootState) => {
    if (!state.currentPatient) return false
    return rootState.visits.visits.find(visit => visit.patient === state.currentPatient.id)
  },

  visitId: (state, getters) => {
    if (!getters.patientVisit) return null
    return getters.patientVisit.id
  },
}
