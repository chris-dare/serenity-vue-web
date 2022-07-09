/* eslint-disable no-unused-vars */
import ServicesAPI from '@/api/services'
import {
  SET_SERVICES,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  ADD_SERVICE_DATA,
  SET_SERVICE_DATA,
  SET_WARDS,
} from './mutation-types'

export default {
  async getServices({ commit, rootState, state }) {
    if (state.services.length) {
      return
    }
    try {
      const provider = rootState.auth.provider
      const { data } = await ServicesAPI.list(provider.id)
      commit(SET_SERVICES, data.data)
    } catch (error) {
      throw error.data || error
    }
  },

  async getService({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ServicesAPI.get(provider.id, id)
      commit(SET_SERVICE_DATA, data.data)
    } catch (error) {
      throw error.data || error
    }
  },

  async createService({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ServicesAPI
        .create(provider.id,payload)
      commit(UPDATE_SERVICE, data.data)
      commit(SET_SERVICE_DATA, {})
      return data
    } catch (error) {
      throw error.data || error
    }
  },

  async updateService({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ServicesAPI
        .update(provider.id, payload)
      commit(UPDATE_SERVICE, data.data)
    } catch (error) {
      throw error.data || error
    }
  },

  async deleteService({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      await ServicesAPI
        .delete(provider.id, id)
      commit(DELETE_SERVICE, id)
    } catch (error) {
      throw error.data || error
    }
  },

  addToCurrentService({ commit }, data) {
    commit(ADD_SERVICE_DATA, data)
  },

  refreshCurrentService({ commit }) {
    commit(SET_SERVICE_DATA, {})
  },

  setCurrentService({ commit }, data) {
    commit(SET_SERVICE_DATA, data)
  },

  async getWards({ commit, rootState }) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ServicesAPI.getWards(provider.id)
      commit(SET_WARDS, data.data)
    } catch (error) {
      throw error.data || error
    }
  },
}
