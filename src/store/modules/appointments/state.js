export function initialState() {
  return {
    appointments: [],
    appointmentsCount: 0,
    currentAppointment: {doctor: {}, patient: {}},
  }
}

export default initialState()
