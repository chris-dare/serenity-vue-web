/* eslint-disable no-unused-vars */
import ServicesAPI from '@/api/services'
import { SET_SERVICES, UPDATE_SERVICE, DELETE_SERVICE, ADD_SERVICE_DATA, SET_SERVICE_DATA } from './mutation-types'

export default {
  async getServices({ commit, rootState }) {
    const provider = rootState.auth.provider
    const { data } = await ServicesAPI.list(provider.id).catch((error) => {
      throw error
    })
    commit(SET_SERVICES, data.data)
  },

  async createService({ commit, rootState }, payload) {
    const provider = rootState.auth.provider
    const { data } = await ServicesAPI
      .create(provider.id,payload)
      .catch((error) => {
        throw error.data || error
      })

    commit(UPDATE_SERVICE, data.data)
    commit(SET_SERVICE_DATA, {})
    return data
  },

  async updateService({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await ServicesAPI
      .update(provider.id,payload)
      .catch((error) => {
        throw error
      })

    commit(UPDATE_SERVICE, data.data)
    return data
  },

  async deleteService({ commit, rootState}, id) {
    const provider = rootState.auth.provider
    await ServicesAPI
      .delete(provider.id,id)
      .catch((error) => {
        throw error
      })

    commit(DELETE_SERVICE, id)
  },

  addToCurrentService({ commit }, data) {
    commit(ADD_SERVICE_DATA, data)
  },

  refreshCurrentService({ commit }, data) {
    commit(SET_SERVICE_DATA, {})
  },
}
