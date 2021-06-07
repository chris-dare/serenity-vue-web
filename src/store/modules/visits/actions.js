/* eslint-disable no-unused-vars */
import VisitsAPI from '@/api/visits'
import { SET_VISITS, UPDATE_VISIT, DELETE_VISIT, ADD_VISIT_DATA, SET_VISIT_DATA, SET_MY_VISITS } from './mutation-types'

export default {
  async getVisits({ dispatch }) {
    try {
      await dispatch('getAllVisits')
      await dispatch('getMyVisits')
    } catch (error) {
      throw error.data || error
    }
  },

  async getAllVisits({ commit, rootState }, params = {}) {
    try {
      const provider = rootState.auth.provider
      const { data } = await VisitsAPI.list(provider.id, params)
      commit(SET_VISITS, data)
    } catch (error) {
      throw error.data || error
    }
  },

  async getMyVisits({ commit, rootState }, params = {}) {
    try {
      const provider = rootState.auth.provider
      const { data } = await VisitsAPI.list(provider.id, { assigned_to: provider.practitionerRoleId })
      commit(SET_MY_VISITS, data)
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
      await VisitsAPI
        .delete(provider.id, id)
      commit(DELETE_VISIT, id)
    } catch (error) {
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
