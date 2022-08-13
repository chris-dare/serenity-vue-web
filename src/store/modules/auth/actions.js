import AuthAPI from '@/api/auth'
import { SET_LOGGED_IN, SET_USER, SET_TOKEN, SET_REFRESH_TOKEN, SET_ORGANIZATIONS, SET_CURRENT_ORGANIZATION, SET_CURRENT_ORGANIZATION_ROLE } from './mutation-types'
import router from '@/router'

export default {
  reset({ commit }) {
    commit(SET_TOKEN, null)
    commit(SET_USER, null)
    commit(SET_LOGGED_IN, false)
    commit(SET_ORGANIZATIONS, [])
  },

  setLoggedIn({commit}, status) {
    commit(SET_LOGGED_IN, status)
  },

  login({ commit, dispatch }, loginData) {
    return AuthAPI.login(loginData)
      .then(({ data: result }) => {
        const user = Object.assign({}, result.patient, result.user)
        commit(SET_TOKEN, result.access)
        commit(SET_REFRESH_TOKEN, result.refresh)
        commit(SET_USER, user)
        commit(SET_CURRENT_ORGANIZATION, result.practitioner_roles[0])
        commit(SET_ORGANIZATIONS, result.practitioner_roles)
        commit(SET_LOGGED_IN, true)
        dispatch('locations/getLocations', false, { root: true })
        return result
      })
      .catch(result => {
        throw result.data
      })
  },

  async logout({ commit, dispatch }) {
    commit(SET_TOKEN, null)
    commit(SET_LOGGED_IN, false)
    await dispatch('checkout/resetCheckout', null, { root: true })
    // return AuthAPI.logout()
    //   .then(({ data: result }) => {
    //     commit(SET_TOKEN, null)
    //     commit(SET_LOGGED_IN, false)
    //     dispatch('setworkspaceType', null, { root:true })
    //     dispatch('setGlobalLocation', null, { root:true })
    //     return result
    //   })
    //   .catch(result => {
    //     throw result.data
    //   })
  },

  async refresh({ commit,dispatch, state }) {
    const refresh = state.refreshToken

    try {
      const { data } = await AuthAPI.refresh({ refresh })
      commit(SET_TOKEN, data.access)
    } catch (error) {
      dispatch('setLoggedIn', false)
      router.push({
        name: 'AuthLogin',
      })
      throw error
    }
  },

  // eslint-disable-next-line no-unused-vars
  resetPassword({ commit }, params) {
    return AuthAPI.reset(params)
      .then(({ data: result }) => {
        return result.data
      })
      .catch(result => {
        throw result.data
      })
  },
  // eslint-disable-next-line no-unused-vars
  confirmResetPassword({ commit }, params) {
    return AuthAPI.confirmReset(params)
      .then(({ data: result }) => {
        return result.data
      })
      .catch(result => {
        throw result.data
      })
  },
  // eslint-disable-next-line no-unused-vars
  changePassword({ commit }, params) {
    return AuthAPI.changePassword(params)
      .then((result) => {
        return result.data
      })
      .catch(result => {
        throw result.data
      })
  },
  // eslint-disable-next-line no-unused-vars
  updateProfile({ commit }, params) {
    return AuthAPI.updateProfile(params)
      .then(({data: result}) => {
        if(result.successful){
          commit(SET_USER, result.data)
        }
        return result
      })
      .catch(result => {
        throw result.data
      })
  },
  // eslint-disable-next-line no-unused-vars
  updateProvider({ commit }, params) {
    return AuthAPI.updateProvider(params)
      .then(({data: result}) => {
        if(result.success){
          commit(SET_CURRENT_ORGANIZATION, result.data)
        }
        return result
      })
      .catch(result => {
        throw result.data
      })
  },
  // eslint-disable-next-line no-unused-vars
  async getProvider({ commit, rootState }) {
    const provider = rootState.auth.provider
    const { data } = await AuthAPI.getProvider(provider.id).catch((error) => {
      throw error
    })
    commit(SET_CURRENT_ORGANIZATION, data.data)
  },

  async refreshCurrentOrganization({commit}, organization) {
    commit(SET_CURRENT_ORGANIZATION, organization)
  },

  async updateUserPermissions({ commit, state }, role) {
    if (state.provider.permissions.id !== role.id) return
    commit(SET_CURRENT_ORGANIZATION_ROLE, role)
  },
}
