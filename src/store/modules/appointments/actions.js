import AppointmentsAPI from '@/api/appointments'
import Appointment from '@/models/Appointment'
import Vue from 'vue'
import {
  UPDATE_APPOINTMENT,
  SET_APPOINTMENTS,
  DELETE_APPOINTMENT,
  SET_APPOINTMENTS_COUNT,
  ADD_APPOINTMENT_DATA,
  SET_SLOTS,
} from './mutation-types'

export default {
  async getAppointments({ commit, rootState }) {
    try {
      const provider = rootState.auth.provider
      const { data } = await AppointmentsAPI.list(provider.id)
      commit(SET_APPOINTMENTS, data.data)
      commit(SET_APPOINTMENTS_COUNT, data.data.length)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async getSlots({ commit, rootState }) {
    try {
      const provider = rootState.auth.provider
      const { data } = await AppointmentsAPI.slots(provider.id)
      commit(SET_SLOTS, data.data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async getAppointment({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      const { data } = await AppointmentsAPI.get(provider.id, id)
      commit(ADD_APPOINTMENT_DATA, data.data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async createAppointment({ commit, rootState }, payload) {
    const patient = new Appointment(payload).getCreateView()
    try {
      const provider = rootState.auth.provider
      const { data } = await AppointmentsAPI
        .create(provider.id, patient)
      commit(UPDATE_APPOINTMENT, data.data)
      commit(ADD_APPOINTMENT_DATA, {})
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async updateAppointment({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await AppointmentsAPI
        .update(provider.id,payload)
      commit(UPDATE_APPOINTMENT, data.data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async deleteAppointment({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      await AppointmentsAPI
        .delete(provider.id, id)
      commit(DELETE_APPOINTMENT, id)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  addToCurrentAppointment({ commit }, data) {
    commit(ADD_APPOINTMENT_DATA, data)
  },
}
