import { SET_ROLES, UPDATE_ROLE, DELETE_ROLE } from './mutation-types'

export default {
  [SET_ROLES](state, roles) {
    state.roles = roles
  },

  [UPDATE_ROLE](state, role) {
    const index = state.roles.findIndex(a => a.id === role.id)
    if (index !== -1) {
      state.roles = state.roles.map(a => {
        if (a.id === role.id) return role
        return a
      })
    } else {
      state.roles.push(role)
    }
  },

  [DELETE_ROLE](state, roleId) {
    const index = state.roles.findIndex(a => a.id === roleId)
    if (index !== -1) {
      state.roles.splice(index, 1)
    }
  },
}
