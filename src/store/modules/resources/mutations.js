import { SET_RESOURCES, UPDATE_RESOURCE, DELETE_RESOURCE, SET_SPECIALTIES, SET_CATEGORIES, SET_CODES } from './mutation-types'

export default {
  [SET_RESOURCES](state, resources) {
    state.resources = resources
  },

  [UPDATE_RESOURCE](state, resource) {
    const index = state.resources.findIndex(a => a.id === resource.id)
    if (index !== -1) {
      state.resources = state.resources.map(a => {
        if (a.id === resource.id) return resource
        return a
      })
    } else {
      state.resources.push(resource)
    }
  },

  [DELETE_RESOURCE](state, resourceId) {
    const index = state.resources.findIndex(a => a.id === resourceId)
    if (index !== -1) {
      state.resources.splice(index, 1)
    }
  },

  [SET_SPECIALTIES](state, specialties) {
    state.specialties = specialties
  },

  [SET_CATEGORIES](state, categories) {
    state.categories = categories
  },
  [SET_CODES](state, codes) {
    state.codes = codes
  },
}
