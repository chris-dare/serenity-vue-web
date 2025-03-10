import { SET_CLIENTS, SET_BILLS, UPDATE_CLIENT, SET_CLIENTS_COUNT, DELETE_CLIENT, UPDATE_FORM, SET_FORM, SET_CURRENT_CLIENT, SET_CURRENT_UPDATE, SET_CLIENT_ACCOUNT, SET_CLIENT_POLICIES, SET_CLAIMS } from './mutation-types'

export default {
  [SET_CLIENTS](state, clients) {
    state.clients = clients
  },

  [SET_CLIENTS_COUNT](state, count) {
    state.clientsCount = count
  },

  [SET_CURRENT_CLIENT](state, client) {
    state.client = client
  },

  [SET_CLIENT_ACCOUNT](state, client) {
    state.clientAccount = client
  },

  [SET_CLIENT_POLICIES](state, policies) {
    state.clientPolicies = policies
  },

  [SET_CURRENT_UPDATE](state, client) {
    state.client.company = client
  },

  [SET_BILLS](state, bills) {
    state.bills = bills
  },

  [SET_CLAIMS](state, claims) {
    state.cliams = claims
  },

  [UPDATE_CLIENT](state, client) {
    const index = state.clients.findIndex(a => a.id === client.id)
    if (index !== -1) {
      state.clients = state.clients.map(a => {
        if (a.main_branch_id === client.id) return client
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
