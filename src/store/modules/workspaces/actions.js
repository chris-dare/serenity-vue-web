/* eslint-disable no-unused-vars */
import WorkspacesAPI from '@/api/workspaces'
import { SET_WORKSPACES, DELETE_WORKSPACE, UPDATE_WORKSPACE } from './mutation-types'

export default {
  async getWorkspaces({ commit, rootState }) {
    console.log('aha')
    // const provider = rootState.auth.user
    const { data } = await WorkspacesAPI.list(1).catch((error) => {
      // this.$service.fail(error)
      console.log('error workspaces', error)
      throw error
    })
    commit(SET_WORKSPACES, data)
  },

  async createWorkspace({ commit }, payload) {
    const { data } = await WorkspacesAPI
      .create(payload)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(UPDATE_WORKSPACE, data)
  },

  async updateWorkspace({ commit }, { id, payload }) {
    const { data } = await WorkspacesAPI
      .update(id, payload)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(UPDATE_WORKSPACE, data)
  },
  async deleteWorkspace({ commit }, id) {
    const { data } = await WorkspacesAPI
      .delete(id)
      .catch(({ response: { data: error } }) => {
        this.$service.fail(error)
        throw error
      })

    commit(DELETE_WORKSPACE, data)
  },
}
