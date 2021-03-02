import { SET_SPECIALTIES, UPDATE_SPECIALTY, DELETE_SPECIALTY } from './mutation-types'

export default {
  [SET_SPECIALTIES](state, specialties) {
    state.specialties = specialties
  },

  [UPDATE_SPECIALTY](state, specialty) {
    const index = state.specialties.findIndex(a => a.id === specialty.id)
    if (index !== -1) {
      state.specialties = state.specialties.map(a => {
        if (a.id === specialty.id) return specialty
        return a
      })
    } else {
      state.specialties.push(specialty)
    }
  },

  [DELETE_SPECIALTY](state, specialtyId) {
    const index = state.specialties.findIndex(a => a.id === specialtyId)
    if (index !== -1) {
      state.specialties.splice(index, 1)
    }
  },
}
