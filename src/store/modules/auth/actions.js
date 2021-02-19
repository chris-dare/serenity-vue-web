// import AuthAPI from '@/api/auth'
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

//   login({ commit }, loginData) {
//     return AuthAPI.login(loginData)
//       .then(({ data: result }) => {
//         commit(SET_TOKEN, result.data.token)
//         commit(SET_USER, result.data.user)
//         commit(SET_LOGGED_IN, true)

//         return result.data
//       })
//       .catch(result => {
//         throw result.data
//       })
//   },

//   refresh({ commit }) {
//     return AuthAPI.refresh()
//       .then(({ data: result }) => {
//         commit(SET_TOKEN, result.data.token)
//         return result.data
//       })
//       .catch(result => {
//         throw result.data.error
//       })
//   },
}
