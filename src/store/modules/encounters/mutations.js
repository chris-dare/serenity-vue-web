import { SET_ENCOUNTERS, SET_ENCOUNTER, UPDATE_ENCOUNTER, DELETE_ENCOUNTER, SET_ENCOUNTER_STATE, SET_PATIENT_CURRENT_ENCOUNTER, SET_PATIENT_CURRENT_ENCOUNTER_OVERRIDE } from './mutation-types'

export default {
  [SET_ENCOUNTERS](state, encounters) {
    state.encounters = encounters
  },

  [SET_ENCOUNTER](state, encounter) {
    state.currentEncounter = encounter
  },
  // this is used at the patient encounters page
  [SET_PATIENT_CURRENT_ENCOUNTER](state, encounter) {
    state.currentPatientEncounter = encounter
  },

  [SET_ENCOUNTER_STATE](state, data) {
    state.encounterState = data
  },

  [SET_PATIENT_CURRENT_ENCOUNTER_OVERRIDE](state, data) {
    state.patientEncounterOverride = data
  },

  [UPDATE_ENCOUNTER](state, encounter) {
    const index = state.encounters.findIndex(a => a.id === encounter.id)
    if (index !== -1) {
      state.encounters = state.encounters.map(a => {
        if (a.id === encounter.id) return encounter
        return a
      })
    } else {
      state.encounters.push(encounter)
    }
  },

  [DELETE_ENCOUNTER](state, encounterId) {
    const index = state.encounters.findIndex(a => a.id === encounterId)
    if (index !== -1) {
      state.encounters.splice(index, 1)
    }
  },
}
