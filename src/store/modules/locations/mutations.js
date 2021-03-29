import { SET_LOCATIONS, UPDATE_LOCATION, DELETE_LOCATION } from './mutation-types'

export default {
  [SET_LOCATIONS](state, locations) {
    state.locations = locations
  },

  [UPDATE_LOCATION](state, location) {
    console.log('locations updated', location)
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
