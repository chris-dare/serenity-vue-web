/* eslint-disable no-unused-vars */
import ResourceAPI from '@/api/resources'
import { SET_RESOURCES, DELETE_RESOURCE, UPDATE_RESOURCE } from './mutation-types'

export default {
  async getResource({ commit, rootState }) {
    const provider = rootState.auth.user
    const { data } = await ResourceAPI.list(provider.id).catch((error) => {
      // this.$service.fail(error)
      console.log('error resources', error)
      throw error
    })
    commit(SET_RESOURCES, data)
  },

  async createResource({ commit, rootState}, payload) {
    const provider = rootState.auth.user
    const { data } = await ResourceAPI
      .create(provider.id,payload)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(UPDATE_RESOURCE, data)
  },

  async updateResource({ commit, rootState}, payload) {
    const provider = rootState.auth.user
    const { data } = await ResourceAPI
      .update(provider.id, payload)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(UPDATE_RESOURCE, data)
  },

  async deleteResource({ commit, rootState}, id) {
    const provider = rootState.auth.user
    const { data } = await ResourceAPI
      .delete(provider.id,id)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(DELETE_RESOURCE, data)
  },
}
