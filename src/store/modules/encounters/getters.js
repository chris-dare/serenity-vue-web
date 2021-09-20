import isAfter from 'date-fns/isAfter'
import parseISO from 'date-fns/parseISO'
import isEmpty from 'lodash/isEmpty'

export default {
  // hasActiveEncounter: (state,getters) => !!getters.onGoingEncounters.length,
  hasActiveEncounter: (state,getters) => getters.currentEncounterStatus === 'planned' || getters.currentEncounterStatus === 'in progress',

  hasEncounterBegan: (state,getters) => getters.currentEncounterStatus === 'in progress',

  pastEncounters: state => {
    if (!state.encounters) return []
    return sortByDate(state.encounters.filter(encounter => encounter.status === 'finished' || (encounter.end_time && isAfter(Date.now(), parseISO(encounter.end_time)))), 'end_time')
  },

  onGoingEncounters: state => {
    if (!state.encounters) return []
    return state.encounters.filter(encounter => encounter.status === 'in-progress' || (!encounter.end_time && isAfter(Date.now(), parseISO(encounter.start_time))))
  },

  currentEncounterCannotBeFinished: (state, getters) => {
    if (!state.currentEncounter) return false
    return !state.currentEncounter.chief_complaint || !state.currentEncounter.history_of_presenting_illness || isEmpty(getters.currentEncounterVitals)
  },

  currentEncounterPractitioner: (state) => {
    if (!state.currentEncounter) return {}
    return state.currentEncounter?.encounter_participant[0]?.practitioner_detail || {}
  },

  currentEncounterVitals: (state, getters, rootState) => {
    if (!getters.currentEncounterObservations) return []
    const options = rootState.resources.vitalsUnitTypes.map(vital => vital.code)
    return getters.currentEncounterObservations.filter(vital => options.includes(vital.unit))
  },

  currentEncounterStatus: state => {
    if (isEmpty(state.currentEncounter?.status)) return ''
    return state.currentEncounter.status.split('-').join(' ')
  },

  currentEncounterLocations: state => {
    if (!state.currentEncounter) return []
    return state.currentEncounter.encounter_location
  },

  currentEncounterNotes: state => {
    if (!state.currentEncounter) return []
    return state.currentEncounter.encounter_patient_notes
  },

  currentEncounterCarePlans: state => {
    if (!state.currentEncounter || !state.currentEncounter.encounter_care_plan) return []
    return state.currentEncounter.encounter_care_plan
  },

  currentEncounterReferrals: (state, getters, rootState ) => {
    if (!rootState.patients.patientReferrals || !state.currentEncounter) return []
    return rootState.patients.patientReferrals.filter(ref => ref.encounter === state.currentEncounter.id)
  },

  currentEncounterDiagnosis: state => {
    if (!state.currentEncounter || !state.currentEncounter.encounter_diagnosis) return []
    return state.currentEncounter.encounter_diagnosis
  },

  currentEncounterComplaints: state => {
    if (!state.currentEncounter || !state.currentEncounter.encounter_diagnosis) return []
    return state.currentEncounter.encounter_diagnosis.filter(diag => diag.role.includes('complaint'))
  },

  currentEncounterPresentingComplaint: (state) => {
    if (!state.currentEncounter) return 'No complaint available'
    return state.currentEncounter.chief_complaint
  },

  currentEncounterHistoryComplaint: (state) => {
    if (!state.currentEncounter) return 'No complaint available'
    return state.currentEncounter.history_of_presenting_illness
  },

  currentEncounterServiceRequests: (state, getters, rootState) => {
    if (!state.currentEncounter) return []
    return rootState.patients.patientServiceRequests.filter(service => service.encounter === state.currentEncounter.id)
  },

  currentPatientServiceRequests: (state, getters, rootState) => {
    if (!state.currentEncounter) return []
    return rootState.patients.patientServiceRequests
  },

  currentEncounterDiagnosticReports: (state, getters, rootState) => {
    if (!state.currentEncounter) return []
    return rootState.diagnostic.diagnosticReports.filter(report => report.encounter === state.currentEncounter.id)
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
      const observation = sortedVitals.find(obs => obs.unit === option)
      vitals[option] = observation ? observation.value : null
    })

    return vitals
  },

  currentPatientVitals: (state, getters, rootState) => {
    if (!rootState.patients.patientObservations) return []
    const options = rootState.resources.vitalsUnitTypes
    let vitals = []

    const sortedVitals = sortByDate(rootState.patients.patientObservations, 'issued', 'asc')
    options.forEach(option => {
      const observations = sortedVitals.filter(obs => obs.unit === option.code).map(obs => {
        return {
          group: 'Dataset 1',
          date: getters.getLatestVitalsDate(obs.unit),
          value: obs.value ? obs.value.split('/')[0] : 1,
          value2: option.code === 'BLOOD_PRESSURE' && obs.value.split('/').length > 1 ? obs.value.split('/')[1] : null,
        }
      })

      vitals.push({
        per: option.display,
        title: option.code,
        data: observations,
        value: observations.length ? observations[0].value : '-',
        date: observations.length ? observations[0].date : null,
        status: 'Normal',
        status_color: 'success',
      })
    })

    return vitals
  },

  sortedObservations: (state, getters, rootState) => {
    if (!rootState.patients.patientObservations.length) return []
    return sortByDate(rootState.patients.patientObservations, 'issued', 'desc')
  },

  getLatestVitalsDate: (state, getters) => (unit) => {
    return getters.sortedObservations.find(v => unit === v.unit)?.issued
  },

  latestVitalsDate: (state, getters) => {
    if (!getters.currentPatientVitals.length) return ''
    return getters.currentPatientVitals.find(v => v.date)?.date
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

  currentEncounterSocialHistory: (state, getters, rootState, rootGetters) => {
    const observations = rootGetters['patients/patientObservations']
    if (!observations) return {}

    const currentEncounterObservations = observations.filter(enc => enc.encounter === state.currentEncounter.id)

    const history = rootState.resources.socialUnitTypes.map(social => social.code)
    let vitals = {}

    const sortedObservations = sortByDate(currentEncounterObservations, 'issued')

    history.forEach(option => {
      const observation = sortedObservations.find(obs => obs.unit === option)
      vitals[option] = observation ? observation.value : ''
    })

    return vitals
  },

  currentPatientExamSystems: (state, getters, rootState, rootGetters) => {
    const observations = rootGetters['patients/patientObservations']
    if (!observations) return {}

    return observations.filter(obs => obs.observation_category[0]?.display === 'exam' && obs.value)
  },

  currentEncounterExamSystems: (state, getters, rootState, rootGetters) => {
    const observations = rootGetters['patients/patientObservations']
    if (!observations) return {}

    return observations.filter(obs => obs.observation_category[0]?.display === 'exam' && obs.value && obs.encounter === state.currentEncounter.id)
  },
}


const sortByDate = (data, field, order = 'desc') => {
  if (!data.length) return data

  return data.sort((a, b) => {
    const dateA = new Date(a[field || 'date'])
    const dateB = new Date(b[field || 'date'])
    if (order === 'desc') {
      return dateA < dateB ? 1 : dateA > dateB ? -1 : 0
    } else {
      return dateA < dateB ? -1 : dateA > dateB ? 1 : 0
    }
  })
}
