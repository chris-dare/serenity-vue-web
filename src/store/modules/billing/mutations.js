import { SET_BILLING, UPDATE_BILLING, DELETE_BILLING } from './mutation-types'

export default {
  [SET_BILLING](state, billing) {
    state.billing = billing
  },

  [UPDATE_BILLING](state, billing) {
    const index = state.billing.findIndex(a => a.id === billing.id)
    if (index !== -1) {
      state.billing = state.billing.map(a => {
        if (a.id === billing.id) return billing
        return a
      })
    } else {
      state.billing.push(billing)
    }
  },

  [DELETE_BILLING](state, billingId) {
    const index = state.billing.findIndex(a => a.id === billingId)
    if (index !== -1) {
      state.billing.splice(index, 1)
    }
  },
}
