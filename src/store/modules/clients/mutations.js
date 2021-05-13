import { SET_CLIENTS, UPDATE_CLIENT, DELETE_CLIENT, UPDATE_FORM } from './mutation-types'

export default {
  [SET_CLIENTS](state, clients) {
    state.clients = clients
  },

  [UPDATE_CLIENT](state, client) {
    const index = state.clients.findIndex(a => a.id === client.id)
    if (index !== -1) {
      state.clients = state.clients.map(a => {
        if (a.id === client.id) return client
        return a
      })
    } else {
      state.clients.push(client)
    }
  },

  [UPDATE_FORM](state, data) {
    let currentUser = state.form
    state.form = {...currentUser, ...data}
  },

  [DELETE_CLIENT](state, clientId) {
    const index = state.clients.findIndex(a => a.id === clientId)
    if (index !== -1) {
      state.clients.splice(index, 1)
    }
  },
}
