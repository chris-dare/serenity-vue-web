import Vue from 'vue'
import { cloneDeep } from 'lodash'
import {
  SET_CHECKOUT,
  UPDATE_CHECKOUT,
  DELETE_CHECKOUT,
  ADD_CHECKOUT_DATA,
  SET_CHECKOUT_DATA,
  SET_EXISTING_PATIENT,
  CLEAR_CART,
  ADD_CART_ITEMS,
  REMOVE_CART_ITEM,
  SET_ACTION,
  UPDATE_CART_ITEM,
  SET_PAYMENT_METHOD,
  SET_PAYMENT_RESULT,
} from './mutation-types'

export default {
  [SET_CHECKOUT](state, checkout) {
    state.checkouts = checkout
  },

  [UPDATE_CHECKOUT](state, checkout) {
    const index = state.checkouts.findIndex(a => a.id === checkout.id)
    if (index !== -1) {
      state.checkout = state.checkouts.map(a => {
        if (a.id === checkout.id) return checkout
        return a
      })
    } else {
      state.checkouts.push(checkout)
    }
  },

  [DELETE_CHECKOUT](state, checkoutId) {
    const index = state.checkouts.findIndex(a => a.id === checkoutId)
    if (index !== -1) {
      state.checkouts.splice(index, 1)
    }
  },

  [ADD_CHECKOUT_DATA](state, data) {
    let currentCheckout = state.currentCheckout
    state.currentCheckout = { ...currentCheckout, ...data }
  },

  [SET_CHECKOUT_DATA](state, data) {
    state.currentCheckout = data
  },

  [SET_EXISTING_PATIENT](state, data) {
    state.currentCheckout.patient = data
    state.existingPatient = data
  },

  [CLEAR_CART](state) {
    state.cart = []
  },

  [ADD_CART_ITEMS](state, {items}) {
    state.cart = []
    items.forEach(el => {
      let item = cloneDeep(el)
      item.quantity = parseInt(el.quantity) || 1
      item.selling_price = parseFloat(el.selling_price)
      item.line_total = item.quantity * item.selling_price
      state.cart.push(item)
    })
  },

  [UPDATE_CART_ITEM](state, item) {
    const index = state.cart.findIndex(el => el.id == item.id)
    if(index != -1){
      item = Object.assign(state.cart[index], item)
    }
    Vue.set(state.cart, index, item)
  },

  [SET_ACTION](state, action) {
    state.action = action
  },

  [SET_PAYMENT_METHOD](state, paymentMethod) {
    state.paymentMethod = paymentMethod
  },

  [SET_PAYMENT_RESULT](state, paymentResult) {
    state.paymentResult = paymentResult
  },

  // eslint-disable-next-line
  [REMOVE_CART_ITEM](state, id) {
    const index = state.cart.findIndex(el => el.id == id)
    state.cart.splice(index, 1)
  },
}
