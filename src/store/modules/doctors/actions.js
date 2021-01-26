import { createDoctors } from '@/services/helpers'
import {
  SET_DOCTOR,
  SET_DOCTORS,
  DELETE_DOCTOR,
  SET_DOCTORS_COUNT,
  ADD_DOCTOR_DATA,
} from './mutation-types'

export default {
  getDoctors({ commit }) {
    commit(SET_DOCTORS, createDoctors())
    commit(SET_DOCTORS_COUNT, 10)
  },

  addToCurrentDoctor({ commit }, data) {
    commit(ADD_DOCTOR_DATA, data)
  },

  createDoctor({ commit }, result) {
    commit(SET_DOCTOR, result)
  },

  updateDoctor({ commit }, result) {
    commit(SET_DOCTOR, result)
  },

  deleteDoctor({ commit }, id) {
    commit(DELETE_DOCTOR, id)
  },
}
