import BillingAPI from '@/api/billing'
import { SET_BILLING, DELETE_BILLING, UPDATE_BILLING } from './mutation-types'

export default {
  async getBilling({ commit, rootState }) {
    try {
      const provider = rootState.auth.provider
      const { data } = await BillingAPI.list(provider.id)
      commit(SET_BILLING, data.results)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async createBilling({ commit, rootState}, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await BillingAPI.create(provider.id, payload)
      commit(UPDATE_BILLING, data.results)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async updateBilling({ commit, rootState}, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await BillingAPI.update(provider.id, payload)
      commit(UPDATE_BILLING, data.results)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async deleteBilling({ commit, rootState}, id) {
    try {
      const provider = rootState.auth.provider
      await BillingAPI.delete(provider.id, id)
      commit(DELETE_BILLING, id)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },
}
