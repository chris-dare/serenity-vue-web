import {
  SET_APPOINTMENTS,
  UPDATE_APPOINTMENT,
  DELETE_APPOINTMENT,
  SET_APPOINTMENTS_COUNT,
  ADD_APPOINTMENT_DATA,
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
    state.currentAppointment = {...currentAppointment, ...data}
  },

  [UPDATE_APPOINTMENT](state, appointment) {
    const index = state.appointments.findIndex(a => a.uuid === appointment.uuid)
    if (index !== -1) {
      state.appointments = state.appointments.map(a => {
        if (a.uuid === appointment.uuid) return appointment
        return a
      })
    } else {
      state.appointments.push(appointment)
    }
  },

  [DELETE_APPOINTMENT](state, appointmentId) {
    state.appointments = state.appointments.filter((es) => es.uuid !== appointmentId)
  },
}
