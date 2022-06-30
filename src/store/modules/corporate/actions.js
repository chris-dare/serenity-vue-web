import Vue from 'vue'
import CorporateAPI from '@/api/corporate'
import ClientsAPI from '@/api/clients'
import { SET_CORPORATE, DELETE_CORPORATE, UPDATE_CORPORATE, SET_DEPENDENT, UPDATE_DEPENDENT, CURRENT_DEPENDENT } from './mutation-types'

export default {
  async getCorporate({ commit }, id) {
    try {
      const { data } = await CorporateAPI.list(id)
      commit(SET_CORPORATE, data.data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async getBeneficiaries({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      const { data } = await CorporateAPI.getBeneficiaries({id: provider.id, company: id})
      commit(SET_CORPORATE, data.results)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async createCorporateEmployee({ commit }, payload) {
    try {
      const { data } = await CorporateAPI.create(payload)
      commit(UPDATE_CORPORATE, data.data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async createInsuranceBenefactor({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    try {
      const { data } = await ClientsAPI.createBenefactor(provider.id, payload)
      commit(UPDATE_CORPORATE, data.data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async updateCorporateEmployee({ commit }, payload) {
    try {
      const { data } = await CorporateAPI.update(payload)
      commit(UPDATE_CORPORATE, data.results)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async updateBeneficiary({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await CorporateAPI.updateBeneficiary(provider.id, payload)
      commit(UPDATE_CORPORATE, data.results)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async getDependent({ commit }, id) {
    try {
      const { data } = await CorporateAPI.listDependent(id)
      commit(SET_DEPENDENT, data.returnedData)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async createDependent({ commit }, payload) {
    try {
      const { data } = await CorporateAPI.createDependent(payload)
      commit(UPDATE_DEPENDENT, data.returnedData)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async updateDependent(payload) {
    try {
      return await CorporateAPI.updateDependent(payload)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async updateClientAccount({ commit }, payload) {
    try {
      const { data } = await CorporateAPI.updateClientAccount(payload)
      commit(UPDATE_DEPENDENT, data.results)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
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
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },
}
