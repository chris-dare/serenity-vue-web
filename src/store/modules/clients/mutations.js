import { SET_CLIENTS, UPDATE_CLIENT, DELETE_CLIENT, UPDATE_FORM, SET_FORM, SET_CURRENT_CLIENT } from './mutation-types'

export default {
  [SET_CLIENTS](state, clients) {
    state.clients = clients
  },

  [SET_CURRENT_CLIENT](state, client) {
    state.client = client
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

  [SET_FORM](state, data) {
    state.form = data
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
