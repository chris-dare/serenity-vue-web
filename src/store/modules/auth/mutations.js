import { SET_LOGGED_IN, SET_USER, SET_TOKEN } from './mutation-types'

export default {
  [SET_LOGGED_IN](state, loggedIn) {
    state.loggedIn = loggedIn
  },

  [SET_TOKEN](state, token) {
    state.token = token
  },

  [SET_USER](state, user) {
    state.user = user
  },
}
