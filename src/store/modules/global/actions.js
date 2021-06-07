import ResourcesAPI from '@/api/resources'
import { SET_COUNTRIES, SET_GLOBAL_TYPE, SET_GLOBAL_LOCATION } from './mutation-types'

export default {
  beforeLoginInit({ dispatch }) {
    dispatch('getCountries')
    dispatch('resources/getMaritalStatuses', null, { root:true })
    dispatch('resources/getPaymentMethods', null, { root:true })
    dispatch('resources/getCategories', null, { root:true })
    dispatch('resources/getCodes', null, { root:true })
    dispatch('resources/getServiceTypes', null, { root:true })
    dispatch('resources/getGenders', null, { root:true })
    dispatch('resources/getLanguages', null, { root:true })
    dispatch('resources/getMobileMoneyVendors', null, { root:true })
    dispatch('resources/getEncounterStatuses', null, { root:true })
    dispatch('resources/getEncounterClasses', null, { root:true })

  },

  initApp({dispatch}) {
    dispatch('setDefaultWorkpace')
    dispatch('appointments/getAppointments', {refresh: true}, { root:true })
    dispatch('patients/getPatients', null, { root:true })
    dispatch('practitioners/getUsers', null, { root:true })
    dispatch('roles/getRoles', null, { root:true })
    dispatch('resources/getResources', null, { root:true })
    dispatch('workspaces/getWorkspaces', null, { root:true })
    dispatch('resources/getSpecialties', null, { root:true })
    dispatch('services/getServices', null, { root:true })
    dispatch('visits/getVisits', null, { root:true })
    dispatch('beforeLoginInit')
  },

  initAdmin({ dispatch }) {
    dispatch('workspaces/getWorkspaces', null,{ root:true })
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
    commit(SET_GLOBAL_TYPE, type)
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
          : this.workspaces[0].value
    commit(SET_GLOBAL_TYPE, workspace)
  },
}
