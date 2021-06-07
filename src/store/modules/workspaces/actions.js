/* eslint-disable no-unused-vars */
import WorkspacesAPI from '@/api/workspaces'
import { SET_WORKSPACES, DELETE_WORKSPACE, UPDATE_WORKSPACE, SET_WORKSPACES_COUNT } from './mutation-types'

export default {
  async getWorkspaces({ commit, rootState }) {
    const provider = rootState.auth.provider
    const { data } = await WorkspacesAPI.list(provider.id).catch((error) => {
      throw error
    })
    commit(SET_WORKSPACES, data.data)
    commit(SET_WORKSPACES_COUNT, data.data.length)
  },

  async createWorkspace({ commit, rootState }, payload) {
    const provider = rootState.auth.provider
    const { data } = await WorkspacesAPI
      .create(provider.id,payload)
      .catch((error) => {
        // this.$service.fail(error)
        throw error.data || error
      })
    commit(UPDATE_WORKSPACE, data.data)
    return data
  },

  async updateWorkspace({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await WorkspacesAPI
      .update(provider.id,payload)
      .catch((error) => {
        throw error.data || error
      })
    commit(UPDATE_WORKSPACE, data.data)
    return data
  },

  async deleteWorkspace({ commit, rootState}, id) {
    const provider = rootState.auth.provider
    const {data} = await WorkspacesAPI
      .delete(provider.id,id)
      .catch((error) => {
        throw error.data || error
      })
    commit(DELETE_WORKSPACE, id)
    return data
  },
}
