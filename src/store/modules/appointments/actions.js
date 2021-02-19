import { createAppointments } from '@/services/helpers'
import {
  SET_APPOINTMENT,
  SET_APPOINTMENTS,
  DELETE_APPOINTMENT,
  SET_APPOINTMENTS_COUNT,
  ADD_APPOINTMENT_DATA,
} from './mutation-types'

export default {
  getAppointments({ commit }) {
    commit(SET_APPOINTMENTS, createAppointments())
    commit(SET_APPOINTMENTS_COUNT, 10)
  },

  addToCurrentAppointment({ commit }, data) {
      commit(ADD_APPOINTMENT_DATA, data)
  },

  createAppointment({ commit, state }) {
    commit(SET_APPOINTMENT, {...state.currentAppointment, id: Math.random() })
  },

  updatePatient({ commit }, result) {
    commit(SET_APPOINTMENT, result)
  },

  deletePatient({ commit }, id) {
    commit(DELETE_APPOINTMENT, id)
  },
}
