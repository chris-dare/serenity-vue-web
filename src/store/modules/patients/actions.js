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
  SET_OBSERVATIONS,
  UPDATE_OBSERVATION,
  UPDATE_MEDICATION_REQUEST,
  SET_PATIENT_DIAGNOSIS,
  SET_PATIENT_NOTES,
  DELETE_SERVICE_REQUEST,
  DELETE_MEDICATION_REQUEST,
  DELETE_OBSERVATION,
  UPDATE_REFERRAL,
  DELETE_REFERRAL,
  SET_REFERRALS,
  SET_PATIENTS_META,
} from './mutation-types'

export default {
  async initSinglePatientInformation({dispatch}, id) {
    await dispatch('getPatient', id)
    dispatch('appointments/getAppointments', { filters: { patient: id, ordering: '-start' } }, { root:true })
    dispatch('getObservations', { refresh:true, filters: { patient: id }})
    dispatch('getDiagnosis', id)
    dispatch('getNotes', id)
    await dispatch('visits/getPatientCurrentVisits', { patient: id, status: 'arrived' }, { root:true })
    await dispatch('encounters/getEncounters', { patient: id } , { root:true })
    dispatch('encounters/getVisitEncounter', { patient: id } , { root:true })
    dispatch('resources/getEncounterStatuses', null, { root:true })
    dispatch('patients/getReferrals', id , { root:true })
    dispatch('patientAllergies/getAllergies', id , { root:true })
    dispatch('resources/getObservationUnitTypes', null, { root:true })
    dispatch('resources/getVitalsUnitTypes', null, { root:true })
    dispatch('resources/getSocialHistoryUnitTypes', null, { root:true })
    dispatch('resources/getSystemExamUnitTypes', null, { root:true })
    dispatch('resources/getEncounterPriorities', null, { root:true })
    
  },

  async initBillingPatientInformation({ dispatch, state }, id) {
    await dispatch('getPatient', id)

    let patient = state.currentPatient
    if(!patient.user?.id) return
    dispatch('dependents/getDependents', patient.user.id, { root:true })
    dispatch('billing/getPatientAccounts', { id }, { root:true })
  },

  async getPatients({ commit, rootState }, params = { page: 1, page_size: 10 }) {
    try {
      const provider = rootState.auth.provider
      const { data } = await PatientsAPI.list(provider.id, params)
      commit(SET_PATIENTS, data.results)
      commit(SET_PATIENTS_COUNT, data.meta.total)
      commit(SET_PATIENTS_META, data.meta)
    } catch (error) {
      throw error.data || error
    }
  },

  async searchPatients({ commit, rootState }, params = {}) {
    try {
      const provider = rootState.auth.provider
      const { data } = await PatientsAPI.list(provider.id, params)
      commit(SET_PATIENTS, data.results)
    } catch (error) {
      throw error.data || error
    }
  },

  async getPatient({ commit, rootState }, id) {
    if (!id) return
    try {
      const provider = rootState.auth.provider
      const { data } = await PatientsAPI.get(provider.id, id)
      commit(SET_PATIENT_DATA, new Patient(data.data).getNormalizedView())
    } catch (error) {
      Vue.prototype.$utils.error(error)
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
      return data.data
    } catch (error) {
      Vue.prototype.$utils.error(error)
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
      Vue.prototype.$utils.error(error)
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
      Vue.prototype.$utils.error(error)
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
    } else {
      await dispatch('getPatient', id)
    }
  },

  async getMedicationRequests({ commit, rootState }, params = {}) {
    try {
      const provider = rootState.auth.provider
      const { data } = await MedicationAPI.list(provider.id, params)
      commit(SET_MEDICATION_REQUESTS, data)
    } catch (error) {
      throw error.data || error
    }
  },

  async createMedicationRequest({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await MedicationAPI.create(provider.id, payload)

      data.forEach(element => {
        commit(UPDATE_MEDICATION_REQUEST, element)
      })

      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async updateMedicationRequest({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await MedicationAPI.update(provider.id, payload)
      commit(UPDATE_MEDICATION_REQUEST, data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async deleteMedicationRequest({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      await MedicationAPI.delete(provider.id, id)
      commit(DELETE_MEDICATION_REQUEST, id)
    } catch (error) {
      Vue.prototype.$utils.error(error)
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
      const patient = state.currentPatient
      const { data } = await ServiceRequestsAPI.list(provider.id, {patient: patient.id})
      commit(SET_SERVICE_REQUESTS, data)
    } catch (error) {
      throw error.data || error
    }
  },

  async getPatientServiceRequests({ commit, rootState }, params) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ServiceRequestsAPI.list(provider.id, params)
      commit(SET_SERVICE_REQUESTS, data)
    } catch (error) {
      throw error.data || error
    }
  },

  async createServiceRequest({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ServiceRequestsAPI.create(provider.id, payload)
      data.forEach(service => {
        commit(UPDATE_SERVICE_REQUEST, service)
      })
      return data
    } catch (error) {
      throw error.data || error
    }
  },

  async updateServiceRequest({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ServiceRequestsAPI.update(provider.id, payload)
      commit(UPDATE_SERVICE_REQUEST, data)
    } catch (error) {
      throw error.data || error
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

      const { data } = await ObservationsAPI.create(provider.id, vitals)

      data.forEach(async observation => {
        commit(UPDATE_OBSERVATION, observation)
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
      const observations = new Observation(payload).getCreateMultipleObservationView(encounter, patient)

      observations.forEach(async observation => {
        const { data } = await ObservationsAPI.create(provider.id, observation)
        commit(UPDATE_OBSERVATION, data)
      })
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async createDiagnosticObservation({ commit, rootState }, payload ) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ObservationsAPI.create(provider.id, payload)
      commit(UPDATE_OBSERVATION, data)

      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async createMedicalHistory({ commit, rootState }, { patient, payload }) {
    try {
      const provider = rootState.auth.provider
      const encounter = rootState.encounters.currentEncounter
      const history = new Observation(payload).getCreateMultipleHistoryView(encounter, patient)

      history.forEach(async his => {
        const { data } = await ObservationsAPI.create(provider.id, his)
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
      const system = new Observation(payload).getCreateObservationView(encounter, patient, payload.unit, payload.value, 'exam')

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


  async createReferral({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await PatientsAPI.createReferral(provider.id, payload)
      commit(UPDATE_REFERRAL, data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async updateReferral({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await PatientsAPI.updateReferral(provider.id, payload)
      commit(UPDATE_REFERRAL, data)

    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async deleteReferral({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      await PatientsAPI.deleteReferral(provider.id, id)
      commit(DELETE_REFERRAL, id)

    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async getReferrals({ commit, rootState }, patient) {
    try {
      const provider = rootState.auth.provider
      const { data } = await PatientsAPI.getReferrals(provider.id, patient)
      commit(SET_REFERRALS, data)

    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async dispenseDrugs({ rootState }, {medicationRequests}) {
    try {
      const provider = rootState.auth.provider
      await MedicationAPI.dispense(provider.id, medicationRequests)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

}
