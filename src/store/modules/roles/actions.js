/* eslint-disable no-unused-vars */
import RolesAPI from '@/api/roles'
import Vue from 'vuex'
import { SET_ROLES, DELETE_ROLE, UPDATE_ROLE } from './mutation-types'

export default {
  async getRoles({ commit, rootState }) {
    const provider = rootState.auth.provider
    const { data } = await RolesAPI.list(provider.id).catch((error) => {
      throw error
    })
    commit(SET_ROLES, data.data)
  },

  async createRole({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await RolesAPI
      .create(provider.id,payload)
      .catch(({ response: { data: error } }) => {
        throw error
      })

    commit(UPDATE_ROLE, data.data)
  },

  async updateRole({ commit, rootState, dispatch }, payload) {

    try {
      const provider = rootState.auth.provider
      const { data } = await RolesAPI
        .update(provider.id, payload)

      commit(UPDATE_ROLE, data.data)
      dispatch('auth/updateUserPermissions', data.data, { root:true })
      return data
    } catch (error) {
      throw error.data || error
    }
    
  },

  async duplicateRole({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await RolesAPI
      .create(provider.id, payload)
      .catch((error) => {
        throw error.data || error
      })
    commit(UPDATE_ROLE, data.data)
    return data
  },

  async deleteRole({ commit, rootState}, id) {
    const provider = rootState.auth.provider
    await RolesAPI
      .delete(provider.id,id)
      .catch(({ response: { data: error } }) => {
        throw error
      })

    commit(DELETE_ROLE, id)
  },
}
