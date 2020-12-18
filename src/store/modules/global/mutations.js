import { SET_COUNTRIES } from './mutation-types'

export default {
  [SET_COUNTRIES](state, countries) {
    state.countries = countries
  },
}
