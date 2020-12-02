import {
  SET_PATIENTS,
  SET_PATIENT,
  DELETE_PATIENT,
  SET_PATIENTS_COUNT,
} from './mutation-types'

export default {
  [SET_PATIENTS](state, patients) {
    state.patients = patients
  },

  [SET_PATIENTS_COUNT](state, count) {
    state.patientsCount = count
  },

  [SET_PATIENT](state, patient) {
    const index = state.patients.findIndex(a => a.uuid === patient.uuid)
    if (index !== -1) {
      state.patients = state.patients.map(a => {
        if (a.uuid === patient.uuid) return patient
        return a
      })
    } else {
      state.patients.push(patient)
    }
  },

  [DELETE_PATIENT](state, patientId) {
    state.patients = state.patients.filter((es) => es.uuid !== patientId)
  },
}
