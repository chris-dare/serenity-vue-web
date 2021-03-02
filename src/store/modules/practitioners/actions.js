/* eslint-disable no-unused-vars */
import UsersAPI from '@/api/users'
import { SET_USERS, DELETE_USER, UPDATE_USER, ADD_USER_DATA } from './mutation-types'

export default {
  async getUsers({ commit, rootState }) {
    console.log('aha')
    // const provider = rootState.auth.user
    const { data } = await UsersAPI.list(1).catch((error) => {
      console.log('error users', error)
      throw error
    })
    commit(SET_USERS, data)
  },

  async createUser({ commit, rootState }, payload) {
    const provider = rootState.auth.user
    const { data } = await UsersAPI
      .create(provider.id, payload)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(UPDATE_USER, data)
  },

  addToCurrentUser({ commit }, data) {
    commit(ADD_USER_DATA, data)
  },

  async updateUser({ commit, rootState }, payload) {
    const provider = rootState.auth.user
    const { data } = await UsersAPI
      .update(provider.id,payload)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(UPDATE_USER, data)
  },
  async deleteUser({ commit, rootState }, id) {
    const provider = rootState.auth.user
    const { data } = await UsersAPI
      .delete(provider.id, id)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(DELETE_USER, data)
  },
}
