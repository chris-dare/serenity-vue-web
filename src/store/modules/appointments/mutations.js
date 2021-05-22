import {
  SET_APPOINTMENTS,
  UPDATE_APPOINTMENT,
  DELETE_APPOINTMENT,
  SET_APPOINTMENTS_COUNT,
  ADD_APPOINTMENT_DATA,
  SET_APPOINTMENT_DATA,
  SET_SLOTS,
} from './mutation-types'

export default {
  [SET_APPOINTMENTS](state, appointments) {
    state.appointments = appointments
  },

  [SET_SLOTS](state, slots) {
    state.slots = slots
  },

  [SET_APPOINTMENTS_COUNT](state, count) {
    state.appointmentsCount = count
  },

  [ADD_APPOINTMENT_DATA](state, data) {
    let currentAppointment = state.currentAppointment
    state.currentAppointment = { ...currentAppointment, ...data }
  },

  [SET_APPOINTMENT_DATA](state, data) {
    state.currentAppointment = data
  },

  [UPDATE_APPOINTMENT](state, appointment) {
    const index = state.appointments.findIndex(a => a.id === appointment.id)
    if (index !== -1) {
      state.appointments = state.appointments.map(a => {
        if (a.id === appointment.id) return appointment
        return a
      })
    } else {
      state.appointments.push(appointment)
    }
  },

  [DELETE_APPOINTMENT](state, appointmentId) {
    state.appointments = state.appointments.filter((es) => es.id !== appointmentId)
  },
}
