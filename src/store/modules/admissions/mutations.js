import { SET_ADMISSIONS, UPDATE_ADMISSIONS, DELETE_ADMISSIONS } from './mutation-types'

export default {
  [SET_ADMISSIONS](state, admissions) {
    state.admissions = admissions
  },

  [UPDATE_ADMISSIONS](state, admission) {
    const index = state.admissions.findIndex(a => a.id === admission.id)
    if (index !== -1) {
      state.admissions = state.admissions.map(a => {
        if (a.id === admission.id) return admission
        return a
      })
    } else {
      state.admissions.push(admission)
    }
  },

  [DELETE_ADMISSIONS](state, admissionId) {
    const index = state.admissions.findIndex(a => a.id === admissionId)
    if (index !== -1) {
      state.admissions.splice(index, 1)
    }
  },
}
