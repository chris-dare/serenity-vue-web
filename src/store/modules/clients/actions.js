/* eslint-disable no-unused-vars */
import ClientAPI from '@/api/clients'
import { SET_CLIENTS, DELETE_CLIENT, UPDATE_CLIENT, UPDATE_FORM, SET_FORM, SET_CURRENT_CLIENT, SET_CURRENT_UPDATE, SET_BILLS, SET_CLIENT_ACCOUNT } from './mutation-types'

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
      .getClientBy(provider.id, payload)
      .catch(({data: error}) => {
        throw error
      })

    commit(SET_CURRENT_CLIENT, { company: data.data })
    return data.data
  },

  async getClientAccount({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await ClientAPI
      .getClientAccount({providerId: provider.id, id: payload})
      .catch(({data: error}) => {
        throw error
      })

    commit(SET_CLIENT_ACCOUNT, data[0])
    return data[0]
  },

  async getClientBills({ commit, rootState }, payload) {
    const provider = rootState.auth.provider
    const { data } = await ClientAPI
      .getClientBills(provider.id, payload)
      .catch(({data: error}) => {
        throw error
      })

    commit(SET_BILLS, data.returnedData)
    return data
  },

  async create({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await ClientAPI
      .create(provider.id, payload)
      .catch(({data: error}) => {
        throw error
      })

    commit(UPDATE_FORM, data.returnedData)
    commit(SET_FORM, {})
    return data
  },

  async deposit({ commit, rootState }, payload) {
    const provider = rootState.auth.provider
    const { data } = await ClientAPI
      .deposit(provider.id, payload)
      .catch(({data: error}) => {
        throw error
      })

    return data
  },

  async providerAccount({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await ClientAPI
      .providerAccount(provider.id, payload)
      .catch(({data: error}) => {
        throw error
      })

    return data
  },

  async clientAccountUpdate({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await ClientAPI.clientAccountUpdate(provider.id, payload).catch(({data: error}) => {
      throw error
    })

    return data
  },

  addToCurrentUser({ commit }, data) {
    commit(UPDATE_FORM, data)
  },

  addClientAccount({ commit }, data) {
    commit(SET_CURRENT_CLIENT, data)
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

    commit(SET_CURRENT_UPDATE, data.returnedData)
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
