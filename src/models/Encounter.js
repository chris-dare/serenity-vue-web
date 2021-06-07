import Vue from 'vue'
export default class Appointment {
  constructor(data) {
    this.data = { ...data }
  }

  getCreateView(practitioner, location, appointment) {
    let createData = {
      // appointment: '99f65066-4784-4ba1-be3d-b186634b6024',
      start_time: Vue.prototype.$date.queryNow(),
      encounter_participant: [
        {
          type: 'PRIMARY_PERFORMER',
          practitioner_role: practitioner.practitionerRoleId,
        },
      ],
      encounter_location: [
        // [ planned, active, reserved, completed ]
        {
          location: location,
          status: 'planned',
        },
      ],
      ...this.data,
    }

    if (appointment) {
      createData.appointment = appointment.id
    }

    return createData
  }

  getEndView() {
    let createData = {
      ...this.data,
      status: 'finished',
      end_time: Vue.prototype.$date.queryNow(),
    }

    return createData
  }
}