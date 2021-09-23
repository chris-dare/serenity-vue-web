/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VisitsAPI from '@/api/visits'
import { SET_VISITS, UPDATE_VISIT, SET_VISITS_TOTAL, SET_MY_VISITS_TOTAL, ADD_VISIT_DATA, SET_VISIT_DATA, SET_MY_VISITS } from './mutation-types'

export default {
  async getVisits({ dispatch }, params = {}) {
    await dispatch('getAllVisits', params)
    await dispatch('getMyVisits', params)
  },

  async getAllVisits({ commit, rootState }, params = {}) {
    try {
      const provider = rootState.auth.provider
      const { data } = await VisitsAPI.list(provider.id, params)
      commit(SET_VISITS, data.results)
      commit(SET_VISITS_TOTAL, data.meta.total)
    } catch (error) {
      throw error.data || error
    }
  },

  async getPatientCurrentVisits({ rootState, dispatch }, params = {}) {
    try {
      const provider = rootState.auth.provider
      const { data } = await VisitsAPI.list(provider.id, params)
      if (data.results.length) {
        dispatch('setCurrentVisit', data.results[0])
      }
    } catch (error) {
      throw error.data || error
    }
  },

  async getMyVisits({ commit, rootState }, params = {}) {
    try {
      const provider = rootState.auth.provider
      const { data } = await VisitsAPI.list(provider.id, { assigned_to: provider.practitionerRoleId, ...params })
      commit(SET_MY_VISITS, data.results)
      commit(SET_MY_VISITS_TOTAL, data.meta.total)
    } catch (error) {
      throw error.data || error
    }
  },

  async getVisit({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      const { data } = await VisitsAPI.get(provider.id, id)
      commit(SET_VISIT_DATA, data.data)
    } catch (error) {
      throw error.data || error
    }
  },

  async createVisit({ commit, rootState, dispatch }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await VisitsAPI
        .create(provider.id,payload)
      commit(UPDATE_VISIT, data)
      dispatch('getVisits')
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async createDiagnosticVisit({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await VisitsAPI
        .create(provider.id,payload)
      commit(UPDATE_VISIT, data)
      return data
    } catch (error) {
      throw error.data || error
    }
  },

  async updateVisit({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await VisitsAPI
        .update(provider.id,payload)
      commit(UPDATE_VISIT, data.data)
    } catch (error) {
      throw error.data || error
    }
  },

  async deleteVisit({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      // const { data } = await VisitsAPI.update(provider.id, { id, status: 'finished' })
      const { data } = await VisitsAPI
        .delete(provider.id, id)
      commit(UPDATE_VISIT, data)
      commit(SET_VISIT_DATA, {})
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  addToCurrentVisit({ commit }, data) {
    commit(ADD_VISIT_DATA, data)
  },

  refreshCurrentVisit({ commit }) {
    commit(SET_VISIT_DATA, {})
  },

  setCurrentVisit({ commit }, data) {
    commit(SET_VISIT_DATA, data)
  },
}
