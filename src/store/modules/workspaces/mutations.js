import { SET_WORKSPACES, UPDATE_WORKSPACE, DELETE_WORKSPACE } from './mutation-types'

export default {
  [SET_WORKSPACES](state, workspaces) {
    state.workspaces = workspaces
  },

  [UPDATE_WORKSPACE](state, workspace) {
    const index = state.workspaces.findIndex(a => a.id === workspace.id)
    if (index !== -1) {
      state.workspaces = state.workspaces.map(a => {
        if (a.id === workspace.id) return workspace
        return a
      })
    } else {
      state.workspaces.push(workspace)
    }
  },

  [DELETE_WORKSPACE](state, workspaceId) {
    const index = state.workspaces.findIndex(a => a.id === workspaceId)
    if (index !== -1) {
      state.workspaces.splice(index, 1)
    }
  },
}
