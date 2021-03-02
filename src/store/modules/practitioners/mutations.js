import { SET_USERS, UPDATE_USER, DELETE_USER, ADD_USER_DATA } from './mutation-types'

export default {
  [SET_USERS](state, users) {
    state.users = users
  },

  [UPDATE_USER](state, user) {
    const index = state.users.findIndex(a => a.id === user.id)
    if (index !== -1) {
      state.users = state.users.map(a => {
        if (a.id === user.id) return user
        return a
      })
    } else {
      state.users.push(user)
    }
  },

  [DELETE_USER](state, userId) {
    const index = state.users.findIndex(a => a.id === userId)
    if (index !== -1) {
      state.users.splice(index, 1)
    }
  },

  [ADD_USER_DATA](state, data) {
    let currentUser = state.currentUser
    state.currentUser = {...currentUser, ...data}
  },
}
