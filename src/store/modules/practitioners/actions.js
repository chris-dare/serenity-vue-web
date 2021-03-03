/* eslint-disable no-unused-vars */
import UsersAPI from '@/api/users'
import { SET_USERS, DELETE_USER, UPDATE_USER, ADD_USER_DATA, SET_CURRENT_USER } from './mutation-types'

export default {
  async getUsers({ commit, rootState }) {
    const provider = rootState.auth.provider
    const { data } = await UsersAPI.list(provider.id).catch((error) => {
      console.log('error users', error)
      throw error
    })
    commit(SET_USERS, data.data ? data.data : [])
  },

  async createUser({ commit, rootState }, payload) {
    const provider = rootState.auth.provider
    const { data } = await UsersAPI
      .create(provider.id, payload)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })
    console.info(data)

    commit(UPDATE_USER, data)
    return data
  },

  addToCurrentUser({ commit }, data) {
    commit(ADD_USER_DATA, data)
  },

  reset({ commit }) {
    commit(SET_CURRENT_USER, {
      country_code: '+233'
    })
  },

  async updateUser({ commit, rootState }, payload) {
    const provider = rootState.auth.provider
    const { data } = await UsersAPI
      .update(provider.id,payload)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(UPDATE_USER, data.data)
  },

  async deleteUser({ commit, rootState }, id) {
    const provider = rootState.auth.provider
    const { data } = await UsersAPI
      .delete(provider.id, id)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(DELETE_USER, data)
  },
}
