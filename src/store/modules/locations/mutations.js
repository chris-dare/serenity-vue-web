import { SET_LOCATIONS, UPDATE_LOCATION, DELETE_LOCATION, SET_LOCATIONS_COUNT } from './mutation-types'

export default {
  [SET_LOCATIONS](state, locations) {
    state.locations = locations
  },

  [SET_LOCATIONS_COUNT](state, locationsCount) {
    state.locationsCount = locationsCount
  },

  [UPDATE_LOCATION](state, location) {
    const index = state.locations.findIndex(a => a.id === location.id)
    if (index !== -1) {
      state.locations = state.locations.map(a => {
        if (a.id === location.id) return location
        return a
      })
    } else {
      state.locations.push(location)
    }
  },

  [DELETE_LOCATION](state, locationId) {
    const index = state.locations.findIndex(a => a.id === locationId)
    if (index !== -1) {
      state.locations.splice(index, 1)
    }
  },
}
