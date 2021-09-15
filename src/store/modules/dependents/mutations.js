import { SET_DEPENDENTS, UPDATE_DEPENDENTS, DELETE_DEPENDENTS } from './mutation-types'

export default {
  [SET_DEPENDENTS](state, dependents) {
    state.dependents = dependents
  },

  [UPDATE_DEPENDENTS](state, dependents) {
    const index = state.dependents.findIndex(a => a.id === dependents.id)
    if (index !== -1) {
      state.dependents = state.dependents.map(a => {
        if (a.id === dependents.id) return dependents
        return a
      })
    } else {
      state.dependents.push(dependents)
    }
  },

  [DELETE_DEPENDENTS](state, dependentsId) {
    const index = state.dependents.findIndex(a => a.id === dependentsId)
    if (index !== -1) {
      state.dependents.splice(index, 1)
    }
  },
}
