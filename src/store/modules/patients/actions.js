// import PatientsAPI from '@/api/announcements'
// import Vue from 'vue'
import { createPatients } from '@/services/helpers'
import {
//   SET_PATIENT,
  SET_PATIENTS,
//   DELETE_PATIENT,
  SET_PATIENTS_COUNT,
} from './mutation-types'

export default {
  getPatients({ commit }) {
    commit(SET_PATIENTS, createPatients())
    commit(SET_PATIENTS_COUNT, 10)
    // return PatientsAPI.list(id, page)
    //   .then(({ data: result }) => {
    //     commit(SET_PATIENTS, result.data)
    //     commit(SET_PATIENTS_COUNT, result.meta.total)
    //     return result.data
    //   })
    //   .catch(result => {
    //     throw result
    //   })
  },

//   createPatient({ commit }, params) {
//     return PatientsAPI.create(params)
//       .then(({ data: result }) => {
//         commit(SET_PATIENT, result.data)
//         return result.data
//       })
//       .catch(result => {
//         throw result
//       })
//   },

//   updatePatient({ commit }, params) {
//     return PatientsAPI.update(params)
//       .then(({ data: result }) => {
//         commit(SET_PATIENT, result.data)
//         return result.data
//       })
//       .catch(result => {
//         throw result
//       })
//   },

//   deletePatient({ commit }, id) {
//     return PatientsAPI.delete(id)
//       .then(({ data: result }) => {
//         commit(DELETE_PATIENT, id)
//         return result.data
//       })
//       .catch(result => {
//         throw result
//       })
//   },
}
