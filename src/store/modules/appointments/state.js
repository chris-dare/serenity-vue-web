export function initialState() {
  return {
    appointments: [],
    appointmentsCount: 0,
    currentAppointment: {},
    slots: [],
    appointmentTypes: [
      { label: 'Routine', value: 'ROUTINE'},
      { label: 'Checkup', value: 'CHECKUP'},
      { label: 'Emergency', value: 'EMERGENCY'},
      { label: 'Followup', value: 'FOLLOWUP'},
    ],
  }
}

export default initialState()
