import EncountersAPI from '@/api/encounters'
import Vue from 'vue'
import Encounter from '@/models/Encounter'
import { SET_ENCOUNTERS, UPDATE_ENCOUNTER, SET_ENCOUNTER  } from './mutation-types'

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

  async getEncounter({ commit, rootState }) {
    try {
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.get(provider.id)
      commit(SET_ENCOUNTER, data)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async createEncounter({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const encounter = new Encounter(payload).getCreateView()
      const { data } = await EncountersAPI.create(provider.id, encounter)
      commit(UPDATE_ENCOUNTER, data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async updateEncounter({ commit }, payload) {
    try {
      delete payload.provider
      const { data } = await EncountersAPI.update(payload)
      commit(UPDATE_ENCOUNTER, data.data)
    } catch ({ response: { data: error } }) {
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

  async createNote({ commit, state, rootState }, payload) {
    try {
      let encounter = state.currentEncounter
      
      const provider = rootState.auth.provider
      encounter.encounter_patient_notes.push({...payload, encounter_practitioner_id: provider.id})
      const { data } = await EncountersAPI.update(provider.id, encounter)
      commit(SET_ENCOUNTER, data)
      commit(UPDATE_ENCOUNTER, data)
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

  async updateDiagnosis({ commit, state, rootState }, payload) {
    try {
      let encounter = state.currentEncounter
      encounter.encounter_diagnosis = encounter.encounter_diagnosis.map(a => {
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

  
}
