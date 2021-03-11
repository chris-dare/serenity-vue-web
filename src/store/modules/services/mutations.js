import { SET_SERVICES, UPDATE_SERVICE, DELETE_SERVICE } from './mutation-types'

export default {
  [SET_SERVICES](state, services) {
    state.services = services
  },

  [UPDATE_SERVICE](state, service) {
    const index = state.services.findIndex(a => a.id === service.id)
    if (index !== -1) {
      state.services = state.services.map(a => {
        if (a.id === service.id) return service
        return a
      })
    } else {
      state.services.push(service)
    }
  },

  [DELETE_SERVICE](state, serviceId) {
    const index = state.services.findIndex(a => a.id === serviceId)
    if (index !== -1) {
      state.services.splice(index, 1)
    }
  },
}
