/* eslint-disable no-unused-vars */
import Vue from 'vue'
import ClientAPI from '@/api/clients'
import { SET_CLIENTS, DELETE_CLIENT, UPDATE_CLIENT, SET_CLIENTS_COUNT, UPDATE_FORM, SET_FORM, SET_CURRENT_CLIENT, SET_CURRENT_UPDATE, SET_BILLS, SET_CLIENT_ACCOUNT, SET_CLIENT_POLICIES, SET_CLAIMS } from './mutation-types'

export default {
  async getClients({ commit, rootState, state }, { refresh = true, filters }) {
    if (!refresh && state.clients.length) {
      return
    }
    const provider = rootState.auth.provider
    const { data } = await ClientAPI.list(provider.id, filters).catch((error) => {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    })
    commit(SET_CLIENTS, data.returnedData)
    commit(SET_CLIENTS_COUNT, data.returnedData.length)
  },

  async getClientBy({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ClientAPI.getClientBy(provider.id, payload)
      commit(SET_CURRENT_CLIENT, { company: data.data })
      return data.data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async getClientAccount({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ClientAPI.getClientAccount({providerId: provider.id, id: payload})

      commit(SET_CLIENT_ACCOUNT, data[0])
      return data[0]
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async getClientPolicies({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ClientAPI
        .getClientPolicies({providerId: provider.id, id: payload})
      commit(SET_CLIENT_POLICIES, data)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async createClientPolicy({ rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ClientAPI
        .createPolicy(provider.id, payload)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async updateClientPolicy({ rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ClientAPI
        .updatePolicy(provider.id, payload)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
    
  },

  async getClientBills({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ClientAPI
        .getClientBills(provider.id, payload)
      commit(SET_BILLS, data.returnedData)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },


  async getClientClaims({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ClientAPI
        .getClientClaims(provider.id, payload)
      commit(SET_CLAIMS, data.returnedData)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    } 
  },

  async create({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ClientAPI
        .create(provider.id, payload)
      commit(UPDATE_FORM, data.returnedData)
      commit(SET_FORM, {})
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async deposit({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ClientAPI
        .deposit(provider.id, payload)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async providerAccount({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ClientAPI
        .providerAccount(provider.id, payload)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async clientAccountUpdate({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ClientAPI.clientAccountUpdate(provider.id, payload)
      return data
    } catch (error) {
      throw error.data || error
    }
  },

  async suspendMember({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ClientAPI.suspendMember(provider.id, payload)
      return data
    } catch (error) {
      throw error.data || error
    }
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
    try {
      const { data } = await ClientAPI
        .update(payload)
      commit(SET_CURRENT_UPDATE, data.returnedData)
      commit(UPDATE_CLIENT, data.returnedData)
      return data
    } catch (error) {
      throw error.data || error
    }
  },

  refreshForm({ commit}) {
    commit(SET_FORM, {})
  },

  async deleteClient({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      await ClientAPI
        .delete(provider.id,id)
      commit(DELETE_CLIENT, id)
    } catch (error) {
      throw error.data || error
    }
  },
}
