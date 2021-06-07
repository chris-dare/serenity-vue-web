/* eslint-disable no-unused-vars */
import AllergyAPI from '@/api/allergies'
import Observation from '@/models/Observation'
import Vue from 'vue'
import { SET_PATIENT_ALLERGIES, DELETE_PATIENT_ALLERGIES, UPDATE_PATIENT_ALLERGIES } from './mutation-types'

export default {
  async createAllergies({ commit, rootState }, { patient, payload }) {
    try {
      const provider = rootState.auth.provider
      const encounter = rootState.encounters.currentEncounter
      

      payload.forEach(async allergy => {
        const allergies = new Observation(allergy).getAllergiesView(encounter, patient)
        const { data } = await AllergyAPI.create(provider.id, allergies)
        commit(UPDATE_PATIENT_ALLERGIES, data)
      })
      
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async getAllergies({ commit, rootState}, id) {
    try {
      const provider = rootState.auth.provider
      const { data } = await AllergyAPI.list(provider.id, { patient: id })
      commit(SET_PATIENT_ALLERGIES, data)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async updateAllergy({ commit, rootState}, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await AllergyAPI.update(provider.id, payload)
      commit(UPDATE_PATIENT_ALLERGIES, data.results)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async deleteAllergy({ commit, rootState}, id) {
    try {
      const provider = rootState.auth.provider
      await AllergyAPI.delete(provider.id, id)
      commit(DELETE_PATIENT_ALLERGIES, id)
    } catch ({ response: { data: error } }) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },
}
