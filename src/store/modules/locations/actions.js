/* eslint-disable no-unused-vars */
import LocationAPI from '@/api/locations'
import { SET_LOCATIONS, DELETE_LOCATION, UPDATE_LOCATION } from './mutation-types'

export default {
  async getLocation({ commit, rootState }) {
    const provider = rootState.auth.provider
    const { data } = await LocationAPI.list(provider.id).catch((error) => {
      // this.$service.fail(error)
      console.log('error locations', error)
      throw error
    })
    commit(SET_LOCATIONS, data)
  },

  async createLocation({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await LocationAPI
      .create(provider.id,payload)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(UPDATE_LOCATION, data)
  },

  async updateLocation({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await LocationAPI
      .update(provider.id, payload)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(UPDATE_LOCATION, data)
  },

  async deleteLocation({ commit, rootState}, id) {
    const provider = rootState.auth.provider
    const { data } = await LocationAPI
      .delete(provider.id,id)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(DELETE_LOCATION, data)
  },
}
