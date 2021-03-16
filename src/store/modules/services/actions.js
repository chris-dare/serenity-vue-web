/* eslint-disable no-unused-vars */
import ServicesAPI from '@/api/services'
import { SET_SERVICES, UPDATE_SERVICE, DELETE_SERVICE } from './mutation-types'

export default {
  async getServices({ commit, rootState }) {
    const provider = rootState.auth.provider
    const { data } = await ServicesAPI.list(provider.id).catch((error) => {
      throw error
    })
    commit(SET_SERVICES, data.data)
  },

  async createService({ commit, rootState }, payload) {
    const provider = rootState.auth.provider
    const { data } = await ServicesAPI
      .create(provider.id,payload)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(UPDATE_SERVICE, data.data)
  },

  async updateService({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await ServicesAPI
      .update(provider.id,payload)
      .catch(({ response: { data: error } }) => {
        throw error
      })

    commit(UPDATE_SERVICE, data.data)
  },

  async deleteService({ commit, rootState}, id) {
    const provider = rootState.auth.provider
    await ServicesAPI
      .delete(provider.id,id)
      .catch(({ response: { data: error } }) => {
        throw error
      })

    commit(DELETE_SERVICE, id)
  },
}
