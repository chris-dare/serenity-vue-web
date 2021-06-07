import { SET_COUNTRIES, SET_GLOBAL_TYPE, SET_GLOBAL_LOCATION } from './mutation-types'

export default {
  [SET_COUNTRIES](state, countries) {
    state.countries = countries
  },
  [SET_GLOBAL_TYPE](state, workspaceType) {
    state.workspaceType = workspaceType
  },
  [SET_GLOBAL_LOCATION](state, location) {
    state.location = location
  },
}
