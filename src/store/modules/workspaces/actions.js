/* eslint-disable no-unused-vars */
import WorkspacesAPI from '@/api/workspaces'
import { SET_WORKSPACES, DELETE_WORKSPACE, UPDATE_WORKSPACE } from './mutation-types'

export default {
  async getWorkspaces({ commit, rootState }) {
    const provider = rootState.auth.provider
    const { data } = await WorkspacesAPI.list(provider.id).catch((error) => {
      console.log('error workspaces', error)
      throw error
    })
    commit(SET_WORKSPACES, data.data)
  },

  async createWorkspace({ commit, rootState }, payload) {
    const provider = rootState.auth.provider
    const { data } = await WorkspacesAPI
      .create(provider.id,payload)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(UPDATE_WORKSPACE, data.data)
  },

  async updateWorkspace({ commit, rootState}, payload) {
    const provider = rootState.auth.provider
    const { data } = await WorkspacesAPI
      .update(provider.id,payload)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(UPDATE_WORKSPACE, data.data)
  },
  async deleteWorkspace({ commit, rootState}, id) {
    const provider = rootState.auth.provider
    const { data } = await WorkspacesAPI
      .delete(provider.id,id)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(DELETE_WORKSPACE, data)
  },
}
