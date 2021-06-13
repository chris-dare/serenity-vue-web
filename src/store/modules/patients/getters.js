import Patient from '@/models/Patient'
export default {
  patients: state => {
    return state.patients.map(pat => {
      const patient = new Patient(pat).getNormalizedView()
      return patient
    })
  },

  maleCount: state => state.patients.filter((p) => p.gender == 'MALE').length,

  femaleCount: state => state.patients.filter((p) => p.gender == 'FEMALE').length,

  patientIsDeceased: state => {
    if (!state.currentPatient) return false
    return state.currentPatient.is_deceased
  },

  patientMedications: state => {
    if (!state.currentPatient) {
      return []
    }
    return state.patientMedications.filter(medication => medication.patient === state.currentPatient.id)
      .sort((el1, el2) => Date.parse(el2.created_at) - Date.parse(el1.created_at))
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

  patientPastMedications: (state, getters) => {
    if (!getters.patientObservations) return []
    return getters.patientObservations.filter(obs => obs.unit === 'PREVIOUS_MEDICATION' && obs.value)
  },

  patientPreviousHospitalization: (state, getters) => {
    if (!getters.patientObservations) return []
    return getters.patientObservations.filter(obs => obs.unit === 'PREVIOUS_HOSPITALIZATION')
  },

  patientPreviousIllness: (state, getters) => {
    if (!getters.patientObservations) return []
    return getters.patientObservations.filter(obs => obs.unit === 'PREVIOUS_ILLNESS')
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
