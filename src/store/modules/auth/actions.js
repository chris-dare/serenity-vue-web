import AuthAPI from '@/api/auth'
import { SET_LOGGED_IN, SET_USER, SET_TOKEN, SET_REFRESH_TOKEN, SET_PRACTIONER_DATA } from './mutation-types'

export default {
  reset({ commit }) {
    commit(SET_TOKEN, null)
    commit(SET_USER, null)
    commit(SET_LOGGED_IN, false)
  },

  setLoggedIn({commit}, status) {
    commit(SET_LOGGED_IN, status)
  },

  login({ commit }, loginData) {
    return AuthAPI.login(loginData)
      .then(({ data: result }) => {
        commit(SET_TOKEN, result.access)
        commit(SET_REFRESH_TOKEN, result.refresh)
        commit(SET_USER, result.user)
        commit(SET_PRACTIONER_DATA, result.practitioner_roles[0])
        commit(SET_LOGGED_IN, true)

        return result
      })
      .catch(result => {
        throw result.data
      })
  },

  logout({ commit }) {
    return AuthAPI.logout()
      .then(({ data: result }) => {
        commit(SET_TOKEN, null)
        commit(SET_LOGGED_IN, false)
        return result
      })
      .catch(result => {
        throw result.data
      })
  },

  refresh({ commit, state }) {
    const refresh = state.refreshToken
    return AuthAPI.refresh({refresh})
      .then(({ data: result }) => {
        commit(SET_TOKEN, result.access)
        return result.access
      })
      .catch(result => {
        throw result.data.error
      })
  },

  // eslint-disable-next-line no-unused-vars
  resetPassword({ commit }, params) {
    return AuthAPI.reset(params)
      .then(({ data: result }) => {
        return result.data
      })
      .catch(result => {
        throw result.data.error
      })
  },
  // eslint-disable-next-line no-unused-vars
  confirmResetPassword({ commit }, params) {
    return AuthAPI.confirmReset(params)
      .then(({ data: result }) => {
        return result.data
      })
      .catch(result => {
        throw result.data.error
      })
  },
}
