import ResourcesAPI from '@/api/resources'
import { SET_COUNTRIES, SET_GLOBAL_WORKSPACE_TYPE, SET_GLOBAL_LOCATION } from './mutation-types'

export default {
  beforeLoginInit() {
    // dispatch('resources/getEncounterStatuses', null, { root:true }) (relook)

  },

  initApp({dispatch}) {
    dispatch('setDefaultWorkpace')
    dispatch('resources/getResources', false, { root:true })
    dispatch('workspaces/getWorkspaces', false, { root:true })
    dispatch('resources/getSpecialties', null, { root:true })
    dispatch('services/getServices', null, { root:true })
    dispatch('resources/getGenders', null, { root:true })
  },

  initAdmin({ dispatch }) {
    dispatch('workspaces/getWorkspaces', false,{ root:true })
    dispatch('appointments/getAppointments', {refresh: true}, { root:true })
    dispatch('patients/getPatients', { page: 1, page_size: 5 }, { root:true })
    dispatch('clients/getClients', { refresh: false }, { root:true })
    dispatch('roles/getRoles', null,{ root:true })
  },

  async getCountries({ commit, state }) {
    if (state.countries.length) {
      return
    }
    try {
      const { data } = await ResourcesAPI
        .countries()
      commit(SET_COUNTRIES, data)
      return data
    } catch (error) {
      throw error || error.message
    }
  },

  setworkspaceType({ commit }, type) {
    localStorage.setItem('workspace', type)
    commit(SET_GLOBAL_WORKSPACE_TYPE, type)
  },

  setGlobalLocation({ commit }, type) {
    localStorage.setItem('location', type)
    commit(SET_GLOBAL_LOCATION, type)
  },

  setDefaultWorkpace({ commit, rootGetters }) {
    const workspaces = rootGetters['auth/userWorkspaces']
    const admin = workspaces.find(workspace => workspace.value === 'ADMIN')
    const opd = workspaces.find(workspace => workspace.value === 'OPD')
    let workspace = localStorage.getItem('workspace') ? localStorage.getItem('workspace')
      : !!admin ? admin.value
        : !!opd ? opd.value
          : workspaces[0].value

    const userHasWorkspace = !!workspaces.find(workspac => workspac.value === workspace)

    commit(SET_GLOBAL_WORKSPACE_TYPE, userHasWorkspace ? workspace : workspaces[0].value)
  },
}
