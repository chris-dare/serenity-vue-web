import EncountersAPI from '@/api/encounters'
import Vue from 'vue'
import Encounter from '@/models/Encounter'
import { SET_ENCOUNTERS, UPDATE_ENCOUNTER, SET_ENCOUNTER, SET_ENCOUNTER_STATE } from './mutation-types'

export default {
  async getEncounters({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.list(provider.id, id)
      commit(SET_ENCOUNTERS, data)
      commit(SET_ENCOUNTER, data.find(encounter => encounter.status === 'in-progress') || data[0])
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  setCurrentEncounter({commit, state}, id) {
    commit(SET_ENCOUNTER, state.encounters.find(encounter => encounter.id === id))
  },

  async getEncounter({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.get(provider.id, id)
      commit(SET_ENCOUNTER, data)
      return
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  // eslint-disable-next-line no-unused-vars
  async createEncounter({ commit, rootState, rootGetters }, payload) {
    try {
      const provider = rootState.auth.provider
      // TODO
      let appointment = rootGetters['appointments/patientNextAppointment']
      let visit = rootGetters['patients/visitId']
      let user = rootState.auth.provider
      let location = rootState.global.location
      const encounter = new Encounter(payload).getCreateView(user,location,appointment)
      const { data } = await EncountersAPI.create(provider.id, { ... encounter, visit })
      commit(UPDATE_ENCOUNTER, data)
      commit(SET_ENCOUNTER, data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async updateEncounter({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.update(provider.id, payload)
      commit(SET_ENCOUNTER, data)
      commit(UPDATE_ENCOUNTER, data)
    } catch ({ response: { data: error } }) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async endEncounter({ commit, state, rootState }) {
    try {
      const encounter = new Encounter(state.currentEncounter).getEndView()
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.update(provider.id, encounter)
      commit(SET_ENCOUNTER, data)
      commit(UPDATE_ENCOUNTER, data)
      commit(SET_ENCOUNTER_STATE, 0)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async createDiagnosis({ commit, state, rootState }, payload) {
    try {
      let encounter = state.currentEncounter
      encounter.encounter_diagnosis.push(payload)
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.update(provider.id, encounter)
      commit(SET_ENCOUNTER, data)
      commit(UPDATE_ENCOUNTER, data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async createNote({ commit, state, rootState, dispatch }, payload) {
    try {
      let encounter = state.currentEncounter
      
      const provider = rootState.auth.provider
      encounter.encounter_patient_notes.push({ ...payload })
      const { data } = await EncountersAPI.update(provider.id, encounter)
      commit(SET_ENCOUNTER, data)
      commit(UPDATE_ENCOUNTER, data)
      dispatch('patients/getNotes', rootState.patients.currentPatient.uuid, { root:true })
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async updateNote({ commit, state, rootState }, payload) {
    try {
      let encounter = state.currentEncounter
      encounter.encounter_patient_notes = encounter.encounter_patient_notes.map(a => {
        if (a.id === payload.id) return payload
        return a
      })
  
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.update(provider.id, encounter)
      commit(SET_ENCOUNTER, data)

    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async removeNote({ commit, state, rootState }, id) {
    try {
      let encounter = state.currentEncounter
      encounter.encounter_patient_notes = encounter.encounter_patient_notes.filter((es) => es.id !== id)
  
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.update(provider.id, encounter)
      commit(SET_ENCOUNTER, data)

    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async createCarePlan({ commit, state, rootState }, payload) {
    try {
      let encounter = state.currentEncounter
      
      const provider = rootState.auth.provider
      encounter.encounter_care_plan.push(payload)
      const { data } = await EncountersAPI.update(provider.id, encounter)
      commit(SET_ENCOUNTER, data)
      commit(UPDATE_ENCOUNTER, data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async updateCarePlan({ commit, state, rootState }, payload) {
    try {
      let encounter = state.currentEncounter
      encounter.encounter_care_plan = encounter.encounter_care_plan.map(a => {
        if (a.id === payload.id) return payload
        return a
      })
  
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.update(provider.id, encounter)
      commit(SET_ENCOUNTER, data)

    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async deleteCarePlan({ commit, state, rootState}, id) {
    try {
      let encounter = state.currentEncounter
      encounter.encounter_care_plan = encounter.encounter_care_plan.filter((es) => es.id !== id)
  
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.update(provider.id, encounter)
      commit(SET_ENCOUNTER, data)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  

  async updateDiagnosis({ commit, state, rootState}, payload) {
    try {
      let encounter = state.currentEncounter
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.updateDiagnosis(provider.id, payload)
      const diagnostic = encounter.encounter_diagnosis.find(el => el.id == payload.id)
      diagnostic.role = data.role
      diagnostic.condition = data.condition
      commit(SET_ENCOUNTER, encounter)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },
  

  async deleteDiagnosis({ commit, state, rootState}, id) {
    try {
      let encounter = state.currentEncounter
      const provider = rootState.auth.provider
      await EncountersAPI.deleteDiagnosis(provider.id, id)
      const index = encounter.encounter_diagnosis.findIndex(el => el.id == id)
      encounter.encounter_diagnosis.splice(index, 1)
      commit(SET_ENCOUNTER, encounter)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  setCurrentEncounterState({ commit, state }) {
    commit(SET_ENCOUNTER_STATE, state.encounterState+1)
  },
  
}
