/* eslint-disable no-unused-vars */
import BillingAPI from '@/api/billing'
import { SET_BILLING, DELETE_BILLING, UPDATE_BILLING } from './mutation-types'

export default {
  async getBilling({ commit, rootState }) {
    const provider = rootState.auth.provider
    const { data } = await BillingAPI.list(provider.id).catch((error) => {
      throw error
    })
    commit(SET_BILLING, data.results)
  },

  async createBilling({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await BillingAPI
      .create(provider.id, payload)
      .catch(({ response: { data: error } }) => {
        throw error
      })

    commit(UPDATE_BILLING, data.results)
  },

  async updateBilling({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await BillingAPI
      .update(provider.id, payload)
      .catch((error) => {
        throw error.data || error
      })

    commit(UPDATE_BILLING, data.results)
    return data
  },

  async duplicateBilling({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await BillingAPI
      .create(provider.id, payload)
      .catch((error) => {
        throw error.data || error
      })
    commit(UPDATE_BILLING, data.results)
    return data
  },

  async deleteBilling({ commit, rootState}, id) {
    const provider = rootState.auth.provider
    await BillingAPI
      .delete(provider.id,id)
      .catch(({ response: { data: error } }) => {
        throw error
      })

    commit(DELETE_BILLING, id)
  },
}
