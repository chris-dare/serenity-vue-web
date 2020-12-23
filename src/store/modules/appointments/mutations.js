import {
  SET_APPOINTMENTS,
  SET_APPOINTMENT,
  DELETE_APPOINTMENT,
  SET_APPOINTMENTS_COUNT,
} from './mutation-types'

export default {
  [SET_APPOINTMENTS](state, appointments) {
    state.appointments = appointments
  },

  [SET_APPOINTMENTS_COUNT](state, count) {
    state.appointmentsCount = count
  },

  [SET_APPOINTMENT](state, appointment) {
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
