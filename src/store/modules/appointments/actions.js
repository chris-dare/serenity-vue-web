import { createAppointments } from '@/services/helpers'
import {
  SET_APPOINTMENT,
  SET_APPOINTMENTS,
  DELETE_APPOINTMENT,
  SET_APPOINTMENTS_COUNT,
} from './mutation-types'

export default {
  getAppointments({ commit }) {
    commit(SET_APPOINTMENTS, createAppointments())
    commit(SET_APPOINTMENTS_COUNT, 10)
  },

  createAppointment({ commit }, result) {
    commit(SET_APPOINTMENT, result)
  },

  updatePatient({ commit }, result) {
    commit(SET_APPOINTMENT, result)
  },

  deletePatient({ commit }, id) {
    commit(DELETE_APPOINTMENT, id)
  },
}
