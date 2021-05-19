/* eslint-disable no-unused-vars */
import ClientAPI from '@/api/clients'
import { SET_LOCATIONS, DELETE_LOCATION, UPDATE_LOCATION, UPDATE_FORM, SET_FORM } from './mutation-types'

export default {
  async getClients({ commit, rootState, state }, refresh = true) {
    if (!refresh && state.clients.length) {
      return
    }
    const provider = rootState.auth.provider
    const { data } = await ClientAPI.list(provider.id).catch((error) => {
      throw error
    })
    commit(SET_LOCATIONS, data.data)
  },

  async create({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await ClientAPI
      .create(provider.id,payload)
      .catch(({data: error}) => {
        throw error
      })

    commit(UPDATE_FORM, data.returnedData)
    commit(SET_FORM, {})
    return data
  },

  addToCurrentUser({ commit }, data) {
    commit(UPDATE_FORM, data)
  },

  async update({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await ClientAPI
      .update(provider.id, payload)
      .catch(({ response: { data: error } }) => {
        throw error
      })

    commit(UPDATE_LOCATION, data.data)
    return data
  },

  refreshForm({ commit}) {
    commit(SET_FORM, {})
  },

  async deleteClient({ commit, rootState}, id) {
    const provider = rootState.auth.provider
    await ClientAPI
      .delete(provider.id,id)
      .catch(({ response: { data: error } }) => {
        throw error
      })

    commit(DELETE_LOCATION, id)
  },
}
