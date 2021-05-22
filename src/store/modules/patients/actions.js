import PatientsAPI from '@/api/patients'
import Patient from '@/models/Patient'
import Observation from '@/models/Observation'
import ServiceRequestsAPI from '@/api/service-requests'
import MedicationAPI from '@/api/medication'
import ObservationsAPI from '@/api/observations'
import Vue from 'vue'

import {
  UPDATE_PATIENT,
  SET_PATIENTS,
  DELETE_PATIENT,
  SET_PATIENTS_COUNT,
  ADD_PATIENT_DATA,
  SET_PATIENT_DATA,
  SET_MEDICATION_REQUESTS,
  UPDATE_SERVICE_REQUEST,
  SET_SERVICE_REQUESTS,
  SET_DIAGNOSTIC_REPORTS,
  SET_OBSERVATIONS,
  UPDATE_OBSERVATION,
} from './mutation-types'

export default {
  async initSinglePatientInformation({dispatch}, id) {
    dispatch('getPatient', id)
    dispatch('getServiceRequests')
    dispatch('getMedicationRequests')
    dispatch('getObservations')
    dispatch('getDiagnosticReports')
    dispatch('encounters/getEncounters', id , { root:true })
  },

  async getPatients({ commit, rootState, state }, refresh = true) {
    if (!refresh && state.patients.length) {
      return
    }
    try {
      const provider = rootState.auth.provider
      const { data } = await PatientsAPI.list(provider.id)
      commit(SET_PATIENTS, data)
      commit(SET_PATIENTS_COUNT, data.length)
    } catch (error) {
      throw error.data || error
    }
  },

  async getPatient({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      const { data } = await PatientsAPI.get(provider.id, id)
      commit(SET_PATIENT_DATA, new Patient(data.data).getNormalizedView())
    } catch (error) {
      throw error.data || error
    }
  },

  async createPatient({ commit, rootState }, payload) {
    const patient = new Patient(payload).getCreateView()
    try {
      const provider = rootState.auth.provider
      const { data } = await PatientsAPI
        .create(provider.id, patient)
      commit(UPDATE_PATIENT, data.data)
      commit(SET_PATIENT_DATA, {})
      return data
    } catch (error) {
      throw error.data || error
    }
  },

  async updatePatient({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await PatientsAPI
        .update(provider.id,payload)
      commit(UPDATE_PATIENT, data.data)
    } catch (error) {
      throw error.data || error
    }
  },

  async deletePatient({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      await PatientsAPI
        .delete(provider.id, id)
      commit(DELETE_PATIENT, id)
    } catch (error) {
      throw error.data || error
    }
  },

  addToCurrentPatient({ commit }, data) {
    commit(ADD_PATIENT_DATA, data)
  },

  refreshCurrentPatient({ commit }) {
    commit(SET_PATIENT_DATA, {})
  },

  setCurrentPatient({ commit }, data) {
    commit(SET_PATIENT_DATA, data)
  },

  async findPatient({commit, dispatch, state}, id) {
    const patient = state.patients.find(patient => patient.id === id)

    if (patient) {
      const pat = new Patient(patient).getNormalizedView()
      commit(SET_PATIENT_DATA, pat)
    }else{
      await dispatch('getPatient', id)
    }
  },

  async getMedicationRequests({ commit, rootState, state}, refresh = false) {
    if (!refresh && state.patientMedications.length) {
      return
    }
    try {
      const provider = rootState.auth.provider
      const { data } = await MedicationAPI.list(provider.id)
      commit(SET_MEDICATION_REQUESTS, data)
    } catch (error) {
      throw error.data || error
    }
  },

  async createMedicationRequest({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await MedicationAPI.create(provider.id, payload)
      commit(SET_MEDICATION_REQUESTS, data)
    } catch (error) {
      throw error.data || error
    }
  },

  //  lab requests
  async getServiceRequests({ commit, rootState, state }, refresh = true) {
    if (!refresh && state.patientServiceRequests.length) {
      return
    }
    try {
      const provider = rootState.auth.provider
      const { data } = await ServiceRequestsAPI.list(provider.id)
      commit(SET_SERVICE_REQUESTS, data)
    } catch (error) {
      throw error.data || error
    }
  },

  async getDiagnosticReports({ commit, rootState }) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ServiceRequestsAPI.reports(provider.id)
      commit(SET_DIAGNOSTIC_REPORTS, data)
    } catch (error) {
      throw error.data || error
    }
  },

  async createServiceRequest({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ServiceRequestsAPI.create(provider.id, payload)
      data.forEach(request => {
        commit(UPDATE_SERVICE_REQUEST, request)
      })
      
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async updateServiceRequest({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ServiceRequestsAPI.update(provider.id, payload)
      commit(UPDATE_SERVICE_REQUEST, data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  //  lab requests
  async getObservations({ commit, rootState, state }, refresh = true) {
    if (!refresh && state.patientObservations.length) {
      return
    }
    try {
      const provider = rootState.auth.provider
      const { data } = await ObservationsAPI.list(provider.id)
      commit(SET_OBSERVATIONS, data)
    } catch (error) {
      throw error.data || error
    }
  },

  async createVitals({ commit, rootState }, { patient, payload }) {
    try {
      const provider = rootState.auth.provider
      const encounter = rootState.encounters.currentEncounter
      const vitals = new Observation(payload).getCreateVitalsView(encounter, patient)

      vitals.forEach(async vital => {
        const { data } = await ObservationsAPI.create(provider.id, vital)
        commit(UPDATE_OBSERVATION, data)
      })
      
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async createObservation({ commit, rootState }, { patient, payload }) {
    try {
      const provider = rootState.auth.provider
      const encounter = rootState.encounters.currentEncounter
      const vitals = new Observation(payload).getCreateVitalsView(encounter, patient)

      vitals.forEach(async vital => {
        const { data } = await ObservationsAPI.create(provider.id, vital)
        commit(UPDATE_OBSERVATION, data)
      })
      
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async updateObservation({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ObservationsAPI.update(provider.id, payload)
      commit(UPDATE_OBSERVATION, data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },
}
