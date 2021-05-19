import isAfter from 'date-fns/isAfter'
import parseISO from 'date-fns/parseISO'

export default {
  hasActiveEncounter: (state,getters) => !!getters.onGoingEncounters.length,

  pastEncounters: state => {
    if (!state.encounters) return []
    return state.encounters.filter(encounter => encounter.end_time && isAfter(Date.now(), parseISO(encounter.end_time)))
  },

  onGoingEncounters: state => {
    if (!state.encounters) return []
    return state.encounters.filter(encounter => encounter.status !== 'finished' || (!encounter.end_time && isAfter(Date.now(), parseISO(encounter.start_time))))
  },

  currentEncounterLocations: state => {
    if (!state.currentEncounter) return []
    return state.currentEncounter.encounter_location
  },

  currentEncounterNotes: state => {
    if (!state.currentEncounter) return []
    return state.currentEncounter.encounter_patient_notes
  },

  currentEncounterDiagnosis: state => {
    if (!state.currentEncounter) return []
    return state.currentEncounter.encounter_diagnosis.filter(diag => diag.role.includes('diagnosis'))
  },

  currentEncounterComplaints: state => {
    if (!state.currentEncounter) return []
    return state.currentEncounter.encounter_diagnosis.filter(diag => diag.role.includes('complaint'))
  },

  currentEncounterPresentingComplaint: (state, getters) => {
    if (!getters.currentEncounterComplaints.length) return 'No complaint available'
    return getters.currentEncounterComplaints[0].condition
  },

  currentEncounterServiceRequests: (state, getters, rootState) => {
    if (!state.currentEncounter) return []
    return rootState.patients.patientServiceRequests.filter(service => service.encounter === state.currentEncounter.id)
  },

  currentEncounterDiagnosticReports: (state, getters, rootState) => {
    if (!state.currentEncounter) return []
    return rootState.patients.patientDiagnosticReports.filter(report => report.encounter === state.currentEncounter.id)
  },

  currentEncounterMedicationRequests: (state, getters, rootState) => {
    if (!state.currentEncounter) return []
    return rootState.patients.patientMedications.filter(medication => medication.encounter === state.currentEncounter.id)
  },

  currentEncounterObservations: (state, getters, rootState) => {
    if (!state.currentEncounter) return []
    return rootState.patients.patientObservations.filter(obs => obs.encounter === state.currentEncounter.id)
  },
}
