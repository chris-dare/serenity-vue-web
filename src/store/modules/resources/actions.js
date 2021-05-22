/* eslint-disable no-unused-vars */
import ResourceAPI from '@/api/resources'
import SpecialtiesAPI from '@/api/specialties'
import axios from 'axios'
import { SET_RESOURCES, SET_SPECIALTIES, SET_CATEGORIES, SET_CLINICAL_OPTIONS, SET_CODES, SET_SERVICE_TYPES, SET_PAYMENT_METHODS, SET_ENCOUNTER_CLASSES, SET_MARITAL_STATUSES, SET_MEDICATION_OPTIONS, SET_ENCOUNTER_STATUSES, SET_RELIGIOUS_AFFLIATIONS } from './mutation-types'

export default {
  async getResources({ commit, rootState }) {
    const provider = rootState.auth.provider
    const { data } = await ResourceAPI.list(provider.id).catch((error) => {
      throw error
    })
    commit(SET_RESOURCES, data.data)
  },

  async getSpecialties({ commit, rootState }) {
    const provider = rootState.auth.provider
    const { data } = await SpecialtiesAPI.list(provider.id).catch((error) => {
      throw error
    })
    commit(SET_SPECIALTIES, data.data)
  },

  async getCategories({ commit }) {
    const { data } = await ResourceAPI.categories().catch((error) => {
      throw error
    })
    commit(SET_CATEGORIES, data.data)
  },

  async getCodes({ commit }) {
    const { data } = await ResourceAPI.codes().catch((error) => {
      throw error
    })
    commit(SET_CODES, data.data)
  },

  async getServiceTypes({ commit }) {
    const { data } = await ResourceAPI.types().catch((error) => {
      throw error
    })
    commit(SET_SERVICE_TYPES, data.data)
  },

  async getPaymentMethods({ commit }) {
    const { data } = await ResourceAPI.paymentMethods().catch((error) => {
      throw error
    })
    commit(SET_PAYMENT_METHODS, data)
  },

  async getEncounterClasses({ commit }) {
    const { data } = await ResourceAPI.encounterClass().catch((error) => {
      throw error
    })
    commit(SET_ENCOUNTER_CLASSES, data)
  },

  async getMaritalStatuses({ commit }) {
    const { data } = await ResourceAPI.maritalStatuses().catch((error) => {
      throw error
    })
    commit(SET_MARITAL_STATUSES, data)
  },

  async getEncounterStatuses({ commit }) {
    const { data } = await ResourceAPI.encounterStatus().catch((error) => {
      throw error
    })
    commit(SET_ENCOUNTER_STATUSES, data)
  },

  async getReligiousAffliations({ commit }) {
    const { data } = await ResourceAPI.religiousAffiliations().catch((error) => {
      throw error
    })
    commit(SET_RELIGIOUS_AFFLIATIONS, data)
  },

  getMedicationOptions({ commit }) {
    axios.get('https://www.nhs.uk/medicines/')
      .then(function (response) {
        commit(SET_MEDICATION_OPTIONS, response.data)
      })
      .catch(function (error) {
        throw error
      })
  },

  getDiagnosisCodeOptions({ commit }, term) {
    axios.get('https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search')
      .then(function (response) {
        commit(SET_CLINICAL_OPTIONS, response.data)
      })
      .catch(function (error) {
        throw error
      })
  },
}
