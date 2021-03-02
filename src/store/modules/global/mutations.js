import { SET_COUNTRIES, SET_GLOBAL_TYPE } from './mutation-types'

export default {
  [SET_COUNTRIES](state, countries) {
    state.countries = countries
  },
  [SET_GLOBAL_TYPE](state, workspaceType) {
    state.workspaceType = workspaceType
  },
}
