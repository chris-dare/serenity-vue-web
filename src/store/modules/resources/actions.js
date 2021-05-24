import ResourceAPI from '@/api/resources'
import SpecialtiesAPI from '@/api/specialties'
import ObservationsAPI from '@/api/observations'
import axios from 'axios'

import {
  SET_RESOURCES,
  SET_SPECIALTIES,
  SET_CATEGORIES,
  SET_CLINICAL_OPTIONS,
  SET_CODES,
  SET_SERVICE_TYPES,
  SET_PAYMENT_METHODS,
  SET_ENCOUNTER_CLASSES,
  SET_MARITAL_STATUSES,
  SET_MEDICATION_OPTIONS,
  SET_ENCOUNTER_STATUSES,
  SET_RELIGIOUS_AFFLIATIONS,
  SET_GENDERS,
  SET_OBSERVATION_UNIT_TYPES,
  SET_SYSTEM_EXAM_UNIT_TYPES,
  SET_SOCIAL_HISTORY_UNIT_TYPES,
  SET_VITALS_UNIT_TYPES,
} from './mutation-types'

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

  async getCategories({ commit, state }) {
    if (state.categories.length) {
      return
    }
    const { data } = await ResourceAPI.categories().catch((error) => {
      throw error
    })
    commit(SET_CATEGORIES, data.data)
  },

  async getCodes({ commit, state }) {
    if (state.codes.length) {
      return
    }
    const { data } = await ResourceAPI.codes().catch((error) => {
      throw error
    })
    commit(SET_CODES, data.data)
  },

  async getGenders({ commit, state }) {
    if (state.genders.length) {
      return
    }
    const { data } = await ResourceAPI.genders().catch((error) => {
      throw error
    })
    commit(SET_GENDERS, data)
  },

  async getServiceTypes({ commit, state }) {
    if (state.serviceTypes.length) {
      return
    }
    const { data } = await ResourceAPI.types().catch((error) => {
      throw error
    })
    commit(SET_SERVICE_TYPES, data.data)
  },

  async getPaymentMethods({ commit, state }) {
    if (state.paymentMethods.length) {
      return
    }
    const { data } = await ResourceAPI.paymentMethods().catch((error) => {
      throw error
    })
    commit(SET_PAYMENT_METHODS, data)
  },

  async getEncounterClasses({ commit, state}) {
    if (state.encounterClasses.length) {
      return
    }
    const { data } = await ResourceAPI.encounterClass().catch((error) => {
      throw error
    })
    commit(SET_ENCOUNTER_CLASSES, data)
  },

  async getMaritalStatuses({ commit, state }) {
    if (state.maritalStatuses.length) {
      return
    }
    const { data } = await ResourceAPI.maritalStatuses().catch((error) => {
      throw error
    })
    commit(SET_MARITAL_STATUSES, data)
  },

  async getEncounterStatuses({ commit, state }) {
    if (state.encounterStatuses.length) {
      return
    }
    const { data } = await ResourceAPI.encounterStatus().catch((error) => {
      throw error
    })
    commit(SET_ENCOUNTER_STATUSES, data)
  },

  async getReligiousAffliations({ commit, state }) {
    if (state.religiousAffiliations.length) {
      return
    }
    const { data } = await ResourceAPI.religiousAffiliations().catch((error) => {
      throw error
    })
    commit(SET_RELIGIOUS_AFFLIATIONS, data)
  },

  async getObservationUnitTypes({ commit, state }) {
    if (state.unitTypes.length) {
      return
    }
    try {
      const { data } = await ObservationsAPI
        .unitTypes()
      commit(SET_OBSERVATION_UNIT_TYPES, data)
      return data
    } catch (error) {
      throw error || error.message
    }
  },

  async getSystemExamUnitTypes({ commit, state }) {
    if (state.examUnitTypes.length) {
      return
    }
    try {
      const { data } = await ObservationsAPI
        .systemTypes()
      commit(SET_SYSTEM_EXAM_UNIT_TYPES, data)
      return data
    } catch (error) {
      throw error || error.message
    }
  },

  async getSocialHistoryUnitTypes({ commit, state }) {
    if (state.socialUnitTypes.length) {
      return
    }
    try {
      const { data } = await ObservationsAPI
        .socialTypes()
      commit(SET_SOCIAL_HISTORY_UNIT_TYPES, data)
      return data
    } catch (error) {
      throw error || error.message
    }
  },
  async getVitalsUnitTypes({ commit, state }) {
    if (state.vitalsUnitTypes.length) {
      return
    }
    try {
      const { data } = await ObservationsAPI
        .vitalTypes()
      commit(SET_VITALS_UNIT_TYPES, data)
      return data
    } catch (error) {
      throw error || error.message
    }
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

  getDiagnosisCodeOptions({ commit }, search) {
    axios.get(`https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&&terms=${search}`)
      .then((response) => {
        commit(SET_CLINICAL_OPTIONS, response.data[3])
        return response
      })
      .catch(function (error) {
        throw error
      })
  },
}
