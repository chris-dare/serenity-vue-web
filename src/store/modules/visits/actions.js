/* eslint-disable no-unused-vars */
import VisitsAPI from '@/api/visits'
import { SET_VISITS, UPDATE_VISIT, DELETE_VISIT, ADD_VISIT_DATA, SET_VISIT_DATA } from './mutation-types'

export default {
  async getVisits({ commit, rootState }) {
    try {
      const provider = rootState.auth.provider
      const { data } = await VisitsAPI.list(provider.id)
      commit(SET_VISITS, data)
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

  async createVisit({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await VisitsAPI
        .create(provider.id,payload)
      commit(UPDATE_VISIT, data.data)
      commit(SET_VISIT_DATA, {})
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
