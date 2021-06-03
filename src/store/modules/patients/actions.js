/* eslint-disable no-unused-vars */
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
  UPDATE_MEDICATION_REQUEST,
  SET_PATIENT_DIAGNOSIS,
  SET_PATIENT_NOTES,
  DELETE_SERVICE_REQUEST,
  DELETE_MEDICATION_REQUEST,
  DELETE_OBSERVATION,
} from './mutation-types'

export default {
  async initSinglePatientInformation({dispatch}, id) {
    await dispatch('getPatient', id)
    await dispatch('appointments/getAppointments', { filters: { patient: id, ordering: '-start' } }, { root:true })
    dispatch('getServiceRequests')
    dispatch('getMedicationRequests')
    // dispatch('getObservations', {})
    dispatch('getObservations', { refresh:true, filters: { patient: id }})
    dispatch('getDiagnosis', id)
    dispatch('getNotes', id)
    dispatch('getDiagnosticReports')
    dispatch('encounters/getEncounters', id , { root:true })
    dispatch('patientAllergies/getAllergies', id , { root:true })
    dispatch('resources/getEncounterClasses', null, { root:true })
    dispatch('resources/getEncounterStatuses', null, { root:true })
    dispatch('resources/getObservationUnitTypes', null, { root:true })
    dispatch('resources/getVitalsUnitTypes', null, { root:true })
    dispatch('resources/getSocialHistoryUnitTypes', null, { root:true })
    dispatch('resources/getSystemExamUnitTypes', null, { root:true })

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

  // eslint-disable-next-line no-unused-vars
  async updatePatient({ commit, rootState }, payload) {
    try {
      const patient = new Patient(payload).getUpdateView()
      const provider = rootState.auth.provider
      const { data } = await PatientsAPI
        .update(provider.id,patient)
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
      commit(UPDATE_MEDICATION_REQUEST, data)
    } catch (error) {
      throw error.data || error
    }
  },

  async updateMedicationRequest({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await MedicationAPI.update(provider.id, payload)
      commit(UPDATE_MEDICATION_REQUEST, data)
    } catch (error) {
      throw error.data || error
    }
  },

  async deleteMedicationRequest({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      await MedicationAPI.delete(provider.id, id)
      commit(DELETE_MEDICATION_REQUEST, id)
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
      // data.forEach(request => {
      commit(UPDATE_SERVICE_REQUEST, data)
      // })
      
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

  // diagnosis
  async getDiagnosis({ commit, rootState }, patientId) {
    try {
      const provider = rootState.auth.provider
      const { data } = await PatientsAPI.getDiagnosis(provider.id, patientId)
      commit(SET_PATIENT_DIAGNOSIS, data)
    } catch (error) {
      throw error.data || error
    }
  },

  // diagnosis
  async getNotes({ commit, rootState }, patientId) {
    try {
      const provider = rootState.auth.provider
      const { data } = await PatientsAPI.getNotes(provider.id, patientId)
      commit(SET_PATIENT_NOTES, data)
    } catch (error) {
      throw error.data || error
    }
  },

  async deleteServiceRequest({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      await ServiceRequestsAPI.delete(provider.id, id)
      commit(DELETE_SERVICE_REQUEST, id)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  //  lab requests
  async getObservations({ commit, rootState, state }, { refresh = true, filters }) {
    if (!refresh && state.patientObservations.length) {
      return
    }
    try {
      const provider = rootState.auth.provider
      const { data } = await ObservationsAPI.list(provider.id, filters)
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
      const vitals = new Observation(payload).getCreateMultipleObservationView(encounter, patient)

      
      vitals.forEach(async vital => {
        const { data } = await ObservationsAPI.create(provider.id, vital)
        commit(UPDATE_OBSERVATION, data)
      })
      
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async createMedicalHistory({ commit, rootState }, { patient, payload }) {
    try {
      const provider = rootState.auth.provider
      const encounter = rootState.encounters.currentEncounter
      const history = new Observation(payload).getCreateMultipleHistoryView(encounter, patient)

      history.forEach(async his => {
        const { data } = await ObservationsAPI.create(provider.id, his)
        console.log('data', data)
        commit(UPDATE_OBSERVATION, data)
      })
      
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  

  async createSystem({ commit, rootState }, { patient, payload }) {
    try {
      const provider = rootState.auth.provider
      const encounter = rootState.encounters.currentEncounter
      const system = new Observation(payload).getCreateObservationView(encounter, patient, payload.field, payload.value, 'exam')

      
      const { data } = await ObservationsAPI.create(provider.id, system)
      commit(UPDATE_OBSERVATION, data)
      
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

  async deleteObservation({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      await ObservationsAPI.delete(provider.id, id)
      commit(DELETE_OBSERVATION, id)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },
}
