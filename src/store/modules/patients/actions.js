import PatientsAPI from '@/api/patients'
import Patient from '@/models/Patient'

import {
  UPDATE_PATIENT,
  SET_PATIENTS,
  DELETE_PATIENT,
  SET_PATIENTS_COUNT,
  ADD_PATIENT_DATA,
  SET_PATIENT_DATA,
} from './mutation-types'

export default {
  async getPatients({ commit, rootState }) {
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
      commit(SET_PATIENT_DATA, data)
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

  findPatient({commit, state}, id) {
    const patient = state.patients.find(patient => patient.id === id)

    if (patient) {
      const pat = new Patient(patient).getNormalizedView()
      commit(SET_PATIENT_DATA, pat)
    }
  },
}
