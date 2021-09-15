import { SET_CORPORATE, UPDATE_CORPORATE, SET_DEPENDENT, UPDATE_DEPENDENT, DELETE_CORPORATE, CURRENT_DEPENDENT } from './mutation-types'

export default {
  [SET_CORPORATE](state, corporate) {
    state.corporate = corporate
  },

  [UPDATE_CORPORATE](state, corporate) {
    const index = state.corporate.findIndex(a => a.id === corporate.id)
    if (index !== -1) {
      state.corporate = state.corporate.map(a => {
        if (a.patientId === corporate.patientId) return corporate
        return a
      })
    } else {
      state.corporate.push(corporate)
    }
  },

  [SET_DEPENDENT](state, dependent) {
    state.dependent = dependent
  },

  [UPDATE_DEPENDENT](state, dependent) {
    const index = state.dependent.findIndex(a => a.id === dependent.id)
    if (index !== -1) {
      state.dependent = state.dependent.map(a => {
        if (a.patientId === dependent.patientId) return dependent
        return a
      })
    } else {
      state.dependent.push(dependent)
    }
  },

  [CURRENT_DEPENDENT](state, data) {
    let currentUser = state.currentDependent
    state.currentDependent = {...currentUser, ...data}
  },

  [DELETE_CORPORATE](state, corporateId) {
    const index = state.corporate.findIndex(a => a.id === corporateId)
    if (index !== -1) {
      state.corporate.splice(index, 1)
    }
  },
}
