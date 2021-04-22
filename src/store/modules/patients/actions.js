import PatientsAPI from '@/api/patients'
import Patient from '@/models/Patient'
// import { createPatients } from '@/services/helpers'

import {
  UPDATE_PATIENT,
  SET_PATIENTS,
  DELETE_PATIENT,
  // SET_PATIENTS_COUNT,
  ADD_PATIENT_DATA,
  SET_PATIENT_DATA,
} from './mutation-types'

export default {
  // getPatients({ commit }) {
  //   commit(SET_PATIENTS, createPatients())
  //   commit(SET_PATIENTS_COUNT, 10)
  //   // return PatientsAPI.list(id, page)
  //   //   .then(({ data: result }) => {
  //   //     commit(SET_PATIENTS, result.data)
  //   //     commit(SET_PATIENTS_COUNT, result.meta.total)
  //   //     return result.data
  //   //   })
  //   //   .catch(result => {
  //   //     throw result
  //   //   })
  // },

  async getPatients({ commit, rootState }) {
    try {
      const provider = rootState.auth.provider
      const { data } = await PatientsAPI.list(provider.id)
      commit(SET_PATIENTS, data.data)
    } catch (error) {
      throw error.data || error
    }
  },

  async createPatient({ commit, rootState }, payload) {
    const patient = new Patient(payload).getEmptyView()
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
}
