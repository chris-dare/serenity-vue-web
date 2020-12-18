import axios from 'axios'
import { SET_COUNTRIES } from './mutation-types'

export default {
  getCountries({ commit }) {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(function (response) {
      commit(SET_COUNTRIES, response.data)
    })
    .catch(function (error) {
      throw error
    })
  },
}
