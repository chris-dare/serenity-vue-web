/* eslint-disable no-unused-vars */
import ClientAPI from '@/api/clients'
import { SET_CLIENTS, DELETE_CLIENT, UPDATE_CLIENT, UPDATE_FORM, SET_FORM, SET_CURRENT_CLIENT, SET_BILLS } from './mutation-types'

export default {
  async getClients({ commit, rootState, state }, refresh = true) {
    if (!refresh && state.clients.length) {
      return
    }
    const provider = rootState.auth.provider
    const { data } = await ClientAPI.list(provider.id).catch((error) => {
      throw error
    })
    commit(SET_CLIENTS, data.returnedData)
  },

  async getClientBy({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await ClientAPI
      .getClientBy({id: provider.id, companyId: payload})
      .catch(({data: error}) => {
        throw error
      })

    commit(SET_CURRENT_CLIENT, data.returnedData)
    return data
  },

  async getClientAccount({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await ClientAPI
      .getClientAccount({providerId: provider.id, id: payload})
      .catch(({data: error}) => {
        throw error
      })

    commit(SET_CURRENT_CLIENT, data.returnedData)
    return data
  },

  async getClientBills({ commit, rootState }, payload) {
    const provider = rootState.auth.provider
    const { data } = await ClientAPI
      .getClientBills({ providerId: provider.id, id: payload })
      .catch(({data: error}) => {
        throw error
      })

    commit(SET_BILLS, data.returnedData)
    return data
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

  async deposit({ commit }, payload) {
    const { data } = await ClientAPI
      .deposit(payload)
      .catch(({data: error}) => {
        throw error
      })

    return data
  },

  addToCurrentUser({ commit }, data) {
    commit(UPDATE_FORM, data)
  },

  addToCurrentClient({ commit }, data) {
    commit(SET_FORM, data)
  },

  async update({ commit }, payload) {
    const { data } = await ClientAPI
      .update(payload)
      .catch(({ response: { data: error } }) => {
        throw error
      })

    commit(UPDATE_CLIENT, data.returnedData)
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

    commit(DELETE_CLIENT, id)
  },
}
