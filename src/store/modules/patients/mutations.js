import {
  SET_PATIENTS,
  UPDATE_PATIENT,
  DELETE_PATIENT,
  SET_PATIENTS_COUNT,
  ADD_PATIENT_DATA,
  SET_PATIENT_DATA,
  SET_MEDICATION_REQUESTS,
  UPDATE_MEDICATION_REQUEST,
  UPDATE_SERVICE_REQUEST,
  SET_SERVICE_REQUESTS,
  SET_OBSERVATIONS,
  UPDATE_OBSERVATION,
  SET_PATIENT_DIAGNOSIS,
  SET_PATIENT_NOTES,
  DELETE_SERVICE_REQUEST,
  DELETE_MEDICATION_REQUEST,
  DELETE_OBSERVATION,
  SET_REFERRALS,
  UPDATE_REFERRAL,
  DELETE_REFERRAL,
  SET_PATIENTS_META,
  SET_CARE_PLANS,
} from './mutation-types'

export default {
  [SET_PATIENTS](state, patients) {
    state.patients = patients
  },

  [SET_PATIENTS_COUNT](state, count) {
    state.patientsCount = count
  },
  [SET_PATIENTS_META](state, data) {
    state.patientsMeta = data
  },

  [UPDATE_PATIENT](state, patient) {
    const index = state.patients.findIndex(a => a.id === patient.id)
    if (index !== -1) {
      state.patients = state.patients.map(a => {
        if (a.id === patient.id) return patient
        return a
      })
    } else {
      state.patients.push(patient)
    }
  },



  [DELETE_PATIENT](state, patientId) {
    state.patients = state.patients.filter((es) => es.id !== patientId)
  },

  [ADD_PATIENT_DATA](state, data) {
    let currentPatient = state.currentPatient
    state.currentPatient = {...currentPatient, ...data}
  },

  [SET_PATIENT_DATA](state, data) {
    state.currentPatient = data
  },

  [SET_PATIENT_DIAGNOSIS](state, data) {
    state.patientDiagnosis = data
  },

  [SET_PATIENT_NOTES](state, data) {
    state.patientNotes = data
  },

  [SET_MEDICATION_REQUESTS](state, data) {
    state.patientMedications = data
  },

  [UPDATE_MEDICATION_REQUEST](state, request) {
    const index = state.patientMedications.findIndex(a => a.id === request.id)
    if (index !== -1) {
      state.patientMedications = state.patientMedications.map(a => {
        if (a.id === request.id) return request
        return a
      })
    } else {
      state.patientMedications.push(request)
    }
  },

  [DELETE_MEDICATION_REQUEST](state, id) {
    const index = state.patientMedications.findIndex(a => a.id === id)
    state.patientMedications.splice(index, 1)
  },

  [SET_SERVICE_REQUESTS](state, requests) {
    state.patientServiceRequests = requests.reverse()
  },

  [UPDATE_SERVICE_REQUEST](state, request) {
    const index = state.patientServiceRequests.findIndex(a => a.id === request.id)
    if (index !== -1) {
      state.patientServiceRequests = state.patientServiceRequests.map(a => {
        if (a.id === request.id) return request
        return a
      })
    } else {
      state.patientServiceRequests.push(request)
    }
  },

  [DELETE_SERVICE_REQUEST](state, id) {
    const index = state.patientServiceRequests.findIndex(a => a.id === id)
    state.patientServiceRequests.splice(index, 1)
  },


  [SET_OBSERVATIONS](state, observations) {
    state.patientObservations = observations
  },

  [UPDATE_OBSERVATION](state, observation) {
    const index = state.patientObservations.findIndex(a => a.id === observation.id)
    if (index !== -1) {
      state.patientObservations = state.patientObservations.map(a => {
        if (a.id === observation.id) return observation
        return a
      })
    } else {
      state.patientObservations.push(observation)
    }
  },

  [DELETE_OBSERVATION](state, id) {
    state.patientObservations = state.patientObservations.filter((es) => es.id !== id)
  },

  [SET_REFERRALS](state, patientReferrals) {
    state.patientReferrals = patientReferrals
  },

  [UPDATE_REFERRAL](state, referral) {
    const index = state.patientReferrals.findIndex(a => a.id === referral.id)
    if (index !== -1) {
      state.patientReferrals = state.patientReferrals.map(a => {
        if (a.id === referral.id) return referral
        return a
      })
    } else {
      state.patientReferrals.push(referral)
    }
  },

  [DELETE_REFERRAL](state, id) {
    state.patientReferrals = state.patientReferrals.filter((es) => es.id !== id)
  },

  [SET_CARE_PLANS](state, patientCarePlans) {
    state.patientCarePlans = patientCarePlans
  },
}
