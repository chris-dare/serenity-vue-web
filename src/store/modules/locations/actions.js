/* eslint-disable no-unused-vars */
import LocationAPI from '@/api/locations'
import { SET_LOCATIONS, DELETE_LOCATION, UPDATE_LOCATION, SET_LOCATIONS_COUNT } from './mutation-types'

export default {
  async getLocations({ commit, rootState, state }, refresh = true) {
    if (!refresh && state.locations.length) {
      return
    }
    const provider = rootState.auth.provider
    const { data } = await LocationAPI.list(provider.id).catch((error) => {
      throw error
    })
    commit(SET_LOCATIONS, data.data)
    commit(SET_LOCATIONS_COUNT, data.data.length)
  },

  async createLocation({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await LocationAPI
      .create(provider.id,payload)
      .catch(({ response: { data: error } }) => {
        throw error
      })

    commit(UPDATE_LOCATION, data.data)
    return data
  },

  async updateLocation({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await LocationAPI
      .update(provider.id, payload)
      .catch(({ response: { data: error } }) => {
        throw error
      })

    commit(UPDATE_LOCATION, data.data)
    return data
  },

  async deleteLocation({ commit, rootState}, id) {
    const provider = rootState.auth.provider
    await LocationAPI
      .delete(provider.id,id)
      .catch(({ response: { data: error } }) => {
        throw error
      })

    commit(DELETE_LOCATION, id)
  },
}
