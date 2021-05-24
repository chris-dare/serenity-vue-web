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
    if (!state.currentEncounter || !state.currentEncounter.encounter_diagnosis) return []
    return state.currentEncounter.encounter_diagnosis
  },

  currentEncounterComplaints: state => {
    if (!state.currentEncounter || !state.currentEncounter.encounter_diagnosis) return []
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

  currentEncounterLatestVitals: (state, getters, rootState) => {
    if (!getters.currentEncounterObservations) return {}
    const options = rootState.resources.vitalsUnitTypes.map(vital => vital.code)
    let vitals = {}
  
    const sortedVitals = sortByDate(getters.currentEncounterObservations, 'issued')
    options.forEach(option => {
      const observation = sortedVitals.find(obs => obs.code === option)
      vitals[option] = observation ? observation.value : null
    })

    return vitals
  },

  currentPatientSocialHistory: (state, getters, rootState, rootGetters) => {
    const observations = rootGetters['patients/patientObservations']
    if (!observations) return {}

    const history = rootState.resources.socialUnitTypes.map(social => social.code)
    let vitals = {}

    const sortedObservations = sortByDate(observations, 'issued')
  
    history.forEach(option => {
      const observation = sortedObservations.find(obs => obs.unit === option)
      vitals[option] = observation ? observation.value : ''
    })

    return vitals
  },

  currentPatientExamSystems: (state, getters, rootState, rootGetters) => {
    const observations = rootGetters['patients/patientObservations']
    if (!observations) return {}

    return observations.filter(obs => obs.observation_category[0].display === 'exam' && obs.value)
  },
}


const sortByDate = (data, field) => {
  if (!data.length) return data

  return data.sort((a, b) => {
    const dateA = new Date(a[field || 'date'])
    const dateB = new Date(b[field || 'date'])
    return dateA < dateB ? 1 : dateA > dateB ? -1 : 0
  })
}
