import AuthAPI from '@/api/auth'
import { SET_LOGGED_IN, SET_USER, SET_TOKEN } from './mutation-types'

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
        commit(SET_TOKEN, result.token)
        // commit(SET_REFRESH_TOKEN, result.data.token)
        commit(SET_USER, result.user)
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

  refresh({ commit }) {
    return AuthAPI.refresh()
      .then(({ data: result }) => {
        commit(SET_TOKEN, result.data.token)
        return result.data
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
