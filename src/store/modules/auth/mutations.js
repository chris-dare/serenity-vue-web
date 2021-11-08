import { SET_LOGGED_IN, SET_USER, SET_TOKEN, SET_REFRESH_TOKEN, SET_CURRENT_ORGANIZATION, SET_ORGANIZATIONS } from './mutation-types'

export default {
  [SET_LOGGED_IN](state, loggedIn) {
    localStorage.setItem('loggedIn', loggedIn)
    state.loggedIn = loggedIn
  },

  [SET_TOKEN](state, token) {
    state.token = token
  },

  [SET_REFRESH_TOKEN](state, token) {
    state.refreshToken = token
  },

  [SET_USER](state, user) {
    state.user = user
  },

  [SET_ORGANIZATIONS](state, organizations) {
    state.organizations = organizations
  },

  [SET_CURRENT_ORGANIZATION](state, data) {
    const provider = state.provider || {}
    state.provider = Object.assign(provider, { ...data, practitionerRoleId: data.id, id: data.organization_uuid})
  },
}
