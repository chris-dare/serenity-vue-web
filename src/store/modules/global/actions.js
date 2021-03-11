import axios from 'axios'
import { SET_COUNTRIES, SET_GLOBAL_TYPE } from './mutation-types'

export default {
  initApp({dispatch}) {
    dispatch('appointments/getAppointments', null,{ root:true })
    dispatch('patients/getPatients', null,{ root:true })
    dispatch('practitioners/getUsers', null,{ root:true })
    dispatch('roles/getRoles', null,{ root:true })
    dispatch('resources/getResources', null,{ root:true })
    dispatch('workspaces/getWorkspaces', null,{ root:true })
    dispatch('resources/getSpecialties', null,{ root:true })
    dispatch('services/getServices', null,{ root:true })
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
}
