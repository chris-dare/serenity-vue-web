import AdmissionsAPI from '@/api/admissions'
import Vue from 'vue'
import { SET_ADMISSIONS, DELETE_ADMISSIONS, UPDATE_ADMISSIONS } from './mutation-types'

export default {
  async getAdmissions({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      const { data } = await AdmissionsAPI.list(provider.id, id)
      commit(SET_ADMISSIONS, data.data)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async createAdmission({ commit, rootState}, payload) {
    try {
      const provider = rootState.auth.provider
      const patient = rootState.patients.currentPatient
      const { data } = await AdmissionsAPI.create(provider.id, patient.user.id, payload)
      commit(UPDATE_ADMISSIONS, data.data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async updateAdmission({ commit, rootState}, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await AdmissionsAPI.update(provider.id, payload)
      commit(UPDATE_ADMISSIONS, data.results)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async deleteAdmission({ commit, rootState}, id) {
    try {
      const provider = rootState.auth.provider
      await AdmissionsAPI.delete(provider.id, id)
      commit(DELETE_ADMISSIONS, id)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },
}
