import { SET_VISITS, UPDATE_VISIT, DELETE_VISIT, ADD_VISIT_DATA, SET_VISIT_DATA } from './mutation-types'

export default {
  [SET_VISITS](state, visits) {
    state.visits = visits
  },

  [UPDATE_VISIT](state, visit) {
    const index = state.visits.findIndex(a => a.id === visit.id)
    if (index !== -1) {
      state.visits = state.visits.map(a => {
        if (a.id === visit.id) return visit
        return a
      })
    } else {
      state.visits.push(visit)
    }
  },

  [DELETE_VISIT](state, visitId) {
    const index = state.visits.findIndex(a => a.id === visitId)
    if (index !== -1) {
      state.visits.splice(index, 1)
    }
  },

  [ADD_VISIT_DATA](state, data) {
    let currentVisit = state.currentVisit
    state.currentVisit = {...currentVisit, ...data}
  },

  [SET_VISIT_DATA](state, data) {
    state.currentVisit = data
  },
}
