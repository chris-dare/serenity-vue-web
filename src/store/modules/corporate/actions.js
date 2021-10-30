import CorporateAPI from '@/api/corporate'
import ClientsAPI from '@/api/clients'
import { SET_CORPORATE, DELETE_CORPORATE, UPDATE_CORPORATE, SET_DEPENDENT, UPDATE_DEPENDENT, CURRENT_DEPENDENT } from './mutation-types'

export default {
  async getCorporate({ commit }, id) {
    try {
      const { data } = await CorporateAPI.list(id)
      commit(SET_CORPORATE, data.data)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async createCorporateEmployee({ commit }, payload) {
    try {
      const { data } = await CorporateAPI.create(payload)
      commit(UPDATE_CORPORATE, data.data)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async createInsuranceBenefactor({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    try {
      const { data } = await ClientsAPI.createBenefactor(provider.id, payload)
      commit(UPDATE_CORPORATE, data.data)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async updateCorporateEmployee({ commit }, payload) {
    try {
      const { data } = await CorporateAPI.update(payload)
      commit(UPDATE_CORPORATE, data.results)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async getDependent({ commit }, id) {
    try {
      const { data } = await CorporateAPI.listDependent(id)
      commit(SET_DEPENDENT, data.returnedData)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async createDependent({ commit }, payload) {
    try {
      const { data } = await CorporateAPI.createDependent(payload)
      commit(UPDATE_DEPENDENT, data.returnedData)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async updateDependent(payload) {
    try {
      return await CorporateAPI.updateDependent(payload)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async updateClientAccount({ commit }, payload) {
    try {
      const { data } = await CorporateAPI.updateClientAccount(payload)
      commit(UPDATE_DEPENDENT, data.results)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  addToCurrentDependent({ commit }, data) {
    commit(CURRENT_DEPENDENT, data)
  },

  async deleteCorporate({ commit, rootState}, id) {
    try {
      const provider = rootState.auth.provider
      await CorporateAPI.delete(provider.id, id)
      commit(DELETE_CORPORATE, id)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },
}
