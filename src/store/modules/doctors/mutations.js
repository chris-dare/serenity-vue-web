import {
  SET_DOCTORS,
  SET_DOCTOR,
  DELETE_DOCTOR,
  SET_DOCTORS_COUNT,
  ADD_DOCTOR_DATA,
} from './mutation-types'

export default {
  [SET_DOCTORS](state, doctors) {
    state.doctors = doctors
  },

  [SET_DOCTORS_COUNT](state, count) {
    state.doctorsCount = count
  },
  [ADD_DOCTOR_DATA](state, data) {
    state.currentAppointment = {...state.currrentAppointment, ...data}
  },

  [SET_DOCTOR](state, doctor) {
    const index = state.doctors.findIndex(a => a.id === doctor.id)
    if (index !== -1) {
      state.doctors = state.doctors.map(a => {
        if (a.id === doctor.id) return doctor
        return a
      })
    } else {
      state.doctors.push(doctor)
    }
  },

  [DELETE_DOCTOR](state, doctorId) {
    state.doctors = state.doctors.filter((es) => es.id !== doctorId)
  },
}
