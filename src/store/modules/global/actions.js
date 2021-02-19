import axios from 'axios'
import { SET_COUNTRIES, SET_GLOBAL_TYPE } from './mutation-types'

export default {
  initApp({dispatch}) {
    dispatch('appointments/getAppointments', null,{ root:true })
    dispatch('patients/getPatients', null,{ root:true })
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

  setGlobalType({ commit }, type) {
    commit(SET_GLOBAL_TYPE, type)
  },
}
