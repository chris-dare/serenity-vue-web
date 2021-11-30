import CheckoutAPI from '@/api/billing'
import { SET_CHECKOUT, DELETE_CHECKOUT, UPDATE_CHECKOUT, SET_PAYMENT_RESULT, SET_PAYMENT_METHOD, UPDATE_CART_ITEM, ADD_CART_ITEMS, ADD_CHECKOUT_DATA, SET_CHECKOUT_DATA, SET_EXISTING_PATIENT, SET_ACTION, REMOVE_CART_ITEM } from './mutation-types'

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

  setCheckoutPatient({ commit }, data) {
    commit(SET_EXISTING_PATIENT, data)
  },

  setAction({ commit }, data) {
    commit(SET_ACTION, data)
  },
  addCartItems({ commit }, data) {
    commit(ADD_CART_ITEMS, data)
  },

  removeCartItem({ commit }, data) {
    commit(REMOVE_CART_ITEM, data)
  },

  updateCartItem({ commit }, data) {
    commit(UPDATE_CART_ITEM, data)
  },

  setPaymentResult({ commit }, data) {
    commit(SET_PAYMENT_RESULT, data)
  },
  setPaymentMethod({ commit }, data) {
    commit(SET_PAYMENT_METHOD, data)
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
