/* eslint-disable no-unused-vars */
import UsersAPI from '@/api/users'
import { SET_USERS, DELETE_USER, UPDATE_USER } from './mutation-types'

export default {
  async getUsers({ commit, rootState }) {
    console.log('aha')
    // const provider = rootState.auth.user
    const { data } = await UsersAPI.list(1).catch((error) => {
      // this.$service.fail(error)
      console.log('error users', error)
      throw error
    })
    commit(SET_USERS, data)
  },

  async createUser({ commit }, payload) {
    const { data } = await UsersAPI
      .create(payload)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(UPDATE_USER, data)
  },

  async updateUser({ commit }, { id, payload }) {
    const { data } = await UsersAPI
      .update(id, payload)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(UPDATE_USER, data)
  },
  async deleteUser({ commit }, id) {
    const { data } = await UsersAPI
      .delete(id)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(DELETE_USER, data)
  },
}
