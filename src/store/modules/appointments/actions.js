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
  SET_APPOINTMENT_DATA,
} from './mutation-types'

export default {
  // eslint-disable-next-line no-unused-vars
  async getAppointments({ commit, rootState, state }, { refresh = true, filters }) {
    if (!refresh && state.appointments.length) {
      return
    }
    try {
      const provider = rootState.auth.provider
      const { data } = await AppointmentsAPI.list(provider.id, filters)
      commit(SET_APPOINTMENTS, data.results)
      commit(SET_APPOINTMENTS_COUNT, data.meta?.total)
    } catch (error) {
      // Vue.prototype.$utils.error(error)
      throw error || error.message
    }
  },

  async getSlots({ commit, rootState }, filters) {
    try {
      const provider = rootState.auth.provider
      const { data } = await AppointmentsAPI.slots(provider.id, filters)
      commit(SET_SLOTS, data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async getAvailableDoctors({ commit, rootState }, filters) {
    try {
      const provider = rootState.auth.provider
      const { data } = await AppointmentsAPI.doctors(provider.id, filters)
      commit(SET_SLOTS, data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  // eslint-disable-next-line no-unused-vars
  async getNextAvailableSlot({ commit, rootState, rootGetters }, filters) {
    try {
      const provider = rootState.auth.provider
      const { data } = await AppointmentsAPI.nextSlot(provider.id, filters)

      if (data.data && data.success) {
        const slot = {
          ...data.data,
          // practitioner: rootGetters['practitioners/practitioners'].find(a => a.id === data.data.practitionerid),
        }
        commit(ADD_APPOINTMENT_DATA, { slot })
        return slot
      }

      commit(ADD_APPOINTMENT_DATA, { slot: {} })
  
      return null
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async getAppointment({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      const { data } = await AppointmentsAPI.get(provider.id, id)
      commit(ADD_APPOINTMENT_DATA, new Appointment(data.data).getNormalizedView())
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async createAppointment({ rootState, dispatch }, payload) {
    const appointment = new Appointment(payload).getCreateView()
    try {
      const provider = rootState.auth.provider
      const { data } = await AppointmentsAPI
        .create(provider.id, appointment)
      dispatch('getAppointments', { refresh: true })
      return data.data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async cancelAppointment({ commit, rootState }, { appointmentId, payload }) {
    try {
      const provider = rootState.auth.provider
      const { data } = await AppointmentsAPI
        .cancel(provider.id, appointmentId, payload)
      commit(UPDATE_APPOINTMENT, data.data)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async updateAppointment({ commit, rootState }, payload) {
    try {
      const appointment = new Appointment(payload).getUpdateView()
      const provider = rootState.auth.provider
      const { data } = await AppointmentsAPI
        .update(provider.id,payload.id, appointment)
      commit(UPDATE_APPOINTMENT, data.data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async rescheduleAppointment({ commit, rootState }, payload) {
    try {
      const appointment = new Appointment(payload).getRescheduleView()
      const provider = rootState.auth.provider
      const { data } = await AppointmentsAPI
        .reschedule(provider.id, payload.id, appointment)
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

  setCurrentAppointment({ commit }, data) {
    commit(SET_APPOINTMENT_DATA, data)
  },

  refreshCurrentAppointment({ commit }) {
    commit(SET_APPOINTMENT_DATA, {})
  },
}
