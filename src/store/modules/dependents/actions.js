import DependentsAPI from '@/api/dependents'
import Vue from 'vue'
import { SET_DEPENDENTS, DELETE_DEPENDENTS, UPDATE_DEPENDENTS } from './mutation-types'

export default {
  async getDependents({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      const { data } = await DependentsAPI.list(provider.id, id)
      commit(SET_DEPENDENTS, data.data)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async createDependent({ commit, rootState}, payload) {
    try {
      const provider = rootState.auth.provider
      const patient = rootState.patients.currentPatient
      const { data } = await DependentsAPI.create(provider.id, patient.user.id, payload)
      commit(UPDATE_DEPENDENTS, data.data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async updateDependent({ commit, rootState}, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await DependentsAPI.update(provider.id, payload)
      commit(UPDATE_DEPENDENTS, data.results)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async deleteDependent({ commit, rootState}, id) {
    try {
      const provider = rootState.auth.provider
      await DependentsAPI.delete(provider.id, id)
      commit(DELETE_DEPENDENTS, id)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },
}
