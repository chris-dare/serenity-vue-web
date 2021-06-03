import { SET_PATIENT_ALLERGIES, UPDATE_PATIENT_ALLERGIES, DELETE_PATIENT_ALLERGIES } from './mutation-types'

export default {
  [SET_PATIENT_ALLERGIES](state, allergies) {
    state.allergies = allergies
  },

  [UPDATE_PATIENT_ALLERGIES](state, allergies) {
    const index = state.allergies.findIndex(a => a.id === allergies.id)
    if (index !== -1) {
      state.allergies = state.allergies.map(a => {
        if (a.id === allergies.id) return allergies
        return a
      })
    } else {
      state.allergies.push(allergies)
    }
  },

  [DELETE_PATIENT_ALLERGIES](state, allergiesId) {
    state.allergies = state.allergies.filter((es) => es.id !== allergiesId)
  },
}
