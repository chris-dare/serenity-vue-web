/* eslint-disable no-unused-vars */
import UsersAPI from '@/api/users'
import User from '@/models/User'
import Vue from 'vue'
import { SET_USERS, DELETE_USER, UPDATE_USER, ADD_USER_DATA, SET_CURRENT_USER } from './mutation-types'

export default {
  async getUsers({ commit, rootState }, params = { page: 1, page_size: 10 }) {
    const provider = rootState.auth.provider
    const { data } = await UsersAPI.list(provider.id, params).catch((error) => {
      throw error
    })
    commit(SET_USERS, data.data ? data.data : [])
    return data
  },

  async getUser({ commit, rootState }, id) {
    const provider = rootState.auth.provider
    const { data } = await UsersAPI.get(provider.id, id).catch((error) => {
      throw error
    })
    commit(SET_CURRENT_USER, new User(data.data).getUpdateView())
  },

  async createUser({ commit, rootState }, payload) {
    const practitioner = new User(payload).getCreateView()
    try {
      const provider = rootState.auth.provider
      const { data } = await UsersAPI
        .create(provider.id, practitioner)
      commit(UPDATE_USER, data.data)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error || error.message
    }
  },

  addToCurrentUser({ commit }, data) {
    commit(ADD_USER_DATA, data)
  },

  reset({ commit }) {
    commit(SET_CURRENT_USER, {
      country_code: '+233',
    })
  },

  setCurrentUser({ commit }, data) {
    commit(SET_CURRENT_USER, data)
  },

  async updateUser({ commit, rootState }, payload) {
    const practitioner = new User(payload).getEditView()
    try {
      const provider = rootState.auth.provider
      const { data } = await UsersAPI
        .update(provider.id, practitioner)
      commit(UPDATE_USER, data.data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error || error.message
    }
  },

  async deleteUser({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      await UsersAPI
        .delete(provider.id, id)
      commit(DELETE_USER, id)
    } catch (error) {
      throw error || error.message
    }
  },
}
