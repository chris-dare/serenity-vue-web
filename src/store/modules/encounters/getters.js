import isAfter from 'date-fns/isAfter'
import parseISO from 'date-fns/parseISO'

export default {
  hasActiveEncounter: (state,getters) => !!getters.onGoingEncounters,
  pastEncounters: state => {
    if (!state.encounters) return []
    return state.encounters.filter(encounter => encounter.end_time && isAfter(parseISO(encounter.end_time), Date.now()))
  },

  onGoingEncounters: state => {
    if (!state.encounters) return []
    return state.encounters.filter(encounter => !encounter.end_time && isAfter(Date.now(), parseISO(encounter.start_time)))
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
    return state.currentEncounter.encounter_diagnosis
  },
}
