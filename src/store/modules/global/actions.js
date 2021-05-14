import axios from 'axios'
import { SET_COUNTRIES, SET_GLOBAL_TYPE } from './mutation-types'

export default {
  initApp({dispatch}) {
    dispatch('setDefaultWorkpace')
    dispatch('appointments/getAppointments', null,{ root:true })
    dispatch('patients/getPatients', null,{ root:true })
    dispatch('practitioners/getUsers', null,{ root:true })
    dispatch('roles/getRoles', null,{ root:true })
    dispatch('resources/getResources', null,{ root:true })
    dispatch('workspaces/getWorkspaces', null,{ root:true })
    dispatch('resources/getSpecialties', null,{ root:true })
    dispatch('resources/getCategories', null,{ root:true })
    dispatch('resources/getCodes', null,{ root:true })
    dispatch('resources/getServiceTypes', null,{ root:true })
    dispatch('services/getServices', null,{ root:true })
    dispatch('getCountries')
  },

  getCountries({ commit }) {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(function (response) {
        commit(SET_COUNTRIES, response.data)
      })
      .catch(function (error) {
        throw error
      })
  },

  setworkspaceType({ commit }, type) {
    commit(SET_GLOBAL_TYPE, type)
  },

  setDefaultWorkpace({ commit, rootGetters }) {
    const workspaces = rootGetters['auth/userWorkspaces']
    const admin = workspaces.find(workspace => workspace.value === 'ADMIN')
    const opd = workspaces.find(workspace => workspace.value === 'OPD')
    let workspace = !!admin ? admin.value : !!opd ? opd.value : workspaces[0].value
    commit(SET_GLOBAL_TYPE, workspace)
  },
}
