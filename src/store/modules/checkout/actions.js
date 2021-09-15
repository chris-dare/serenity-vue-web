import CheckoutAPI from '@/api/billing'
import { SET_CHECKOUT, DELETE_CHECKOUT, UPDATE_CHECKOUT, ADD_CHECKOUT_DATA, SET_CHECKOUT_DATA } from './mutation-types'

export default {
  async getCheckout({ commit, rootState }) {
    try {
      const provider = rootState.auth.provider
      const { data } = await CheckoutAPI.list(provider.id)
      commit(SET_CHECKOUT, data.results)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  addToCheckout({ commit }, data) {
    commit(ADD_CHECKOUT_DATA, data)
  },

  setCheckout({ commit }, data) {
    commit(SET_CHECKOUT_DATA, data)
  },

  refreshCheckout({ commit }) {
    commit(SET_CHECKOUT_DATA, {})
  },

  async createCheckout({ commit, rootState}, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await CheckoutAPI.create(provider.id, payload)
      commit(UPDATE_CHECKOUT, data.results)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async updateCheckout({ commit, rootState}, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await CheckoutAPI.update(provider.id, payload)
      commit(UPDATE_CHECKOUT, data.results)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async deleteCheckout({ commit, rootState}, id) {
    try {
      const provider = rootState.auth.provider
      await CheckoutAPI.delete(provider.id, id)
      commit(DELETE_CHECKOUT, id)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },
}
