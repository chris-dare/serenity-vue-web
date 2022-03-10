import ResourceAPI from '@/api/resources'
import SpecialtiesAPI from '@/api/specialties'
import ObservationsAPI from '@/api/observations'
import PharmacyInventoryApi from '@/api/pharmacy-inventory'
import ServiceRequestAPI from '@/api/service-requests'
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
  SET_LANGUAGES,
  SET_VENDORS,
  SET_CURRENCIES,
  SET_REFERENCE_TYPES,
  SET_PHARMACY_INVENTORY_OPTIONS,
  SET_ENCOUNTER_PRIORITIES,
  SET_OBSERVATION_CATEGORIES,
  SET_DIAGNOSTIC_LAB_PROCEEDURES,
  SET_SERVICE_GENERIC_PERIOD_UNIT_TYPES,
  SET_SERVICE_REQUEST_CATEGORY_TYPES,
  SET_SERVICE_REQUEST_SECTION_TYPES,
  SET_OBSERVATION_INTERPRETATION_TYPES,
  SET_DOSAGE_ROUTES,
  SET_REVENUE_TAGS,
} from './mutation-types'

export default {
  async getResources({ commit, rootState, state }, refresh) {
    if (!refresh && state.resources.length) return
    const provider = rootState.auth.provider
    const { data } = await ResourceAPI.list(provider.id).catch((error) => {
      throw error
    })
    commit(SET_RESOURCES, data.data)
  },

  async getSpecialties({ commit }) {
    const { data } = await SpecialtiesAPI.list().catch((error) => {
      throw error
    })
    commit(SET_SPECIALTIES, data)
  },

  async getCategories({ commit, state }) {
    if (state.categories.length) {
      return
    }
    const { data } = await ResourceAPI.categories().catch((error) => {
      throw error
    })
    commit(SET_CATEGORIES, data)
  },

  async getEncounterPriorities({ commit, state }) {
    if (state.encounterPriorities.length) {
      return
    }

    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await ResourceAPI.encounterPriorities()
      commit(SET_ENCOUNTER_PRIORITIES, data)
    } catch (error) {
      throw error
    }
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

  async getDosageRoutes({ commit, state }) {
    if (state.dosageRoutes.length) {
      return
    }
    const { data } = await ResourceAPI.dosageRoutes().catch((error) => {
      throw error
    })
    commit(SET_DOSAGE_ROUTES, data)
  },

  async getServiceTypes({ commit, state }) {
    if (state.serviceTypes.length) {
      return
    }
    const { data } = await ResourceAPI.types().catch((error) => {
      throw error
    })
    commit(SET_SERVICE_TYPES, data)
  },

  async getRevenueTags({ commit, state,rootState }) {
    if (state.revenueTags.length) {
      return
    }
    const provider = rootState.auth.provider
    const { data } = await ResourceAPI.revenueTags(provider.id).catch((error) => {
      throw error
    })
    commit(SET_REVENUE_TAGS, data)
  },

  async getObservationCategory({ commit, state }) {
    if (state.observationCategories.length) {
      return
    }
    const { data } = await ResourceAPI.observationCategories().catch((error) => {
      throw error
    })
    commit(SET_OBSERVATION_CATEGORIES, data)
  },

  async getLanguages({ commit, state }) {
    if (state.languages.length) {
      return
    }
    const { data } = await ResourceAPI.languages().catch((error) => {
      throw error
    })
    commit(SET_LANGUAGES, data)
  },

  async getCurrencies({ commit, state }) {
    if (state.currencies.length) {
      return
    }
    const { data } = await ResourceAPI.currencies().catch((error) => {
      throw error
    })
    commit(SET_CURRENCIES, data)
  },

  async getReferenceTypes({ commit, state  }) {
    if (state.referenceTypes.length) {
      return
    }
    const { data } = await ResourceAPI.referenceTypes().catch((error) => {
      throw error
    })
    commit(SET_REFERENCE_TYPES, data)
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

  async getMobileMoneyVendors({ commit, state }) {
    if (state.vendors.length) {
      return
    }
    const { data } = await ResourceAPI.mobileMoneyVendors().catch((error) => {
      throw error
    })
    commit(SET_VENDORS, data)
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

  async getObservationInterpretationTypes({ commit, state }) {
    if (state.interpretationTypes.length) {
      return
    }
    try {
      const { data } = await ObservationsAPI
        .interpretationTypes()
      commit(SET_OBSERVATION_INTERPRETATION_TYPES, data)
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

  async getPharmacyInventoryOptions({ commit, state }) {
    if (state.pharmacyInventory.length) {
      return
    }
    try {
      const { data } = await PharmacyInventoryApi.list()
      commit(SET_PHARMACY_INVENTORY_OPTIONS, data)
      return data
    } catch (error) {
      throw error || error.message
    }
  },

  async getDiagnosticLabProceedures({ commit, state }) {
    if (state.diagnosticLabProceedures.length) {
      return
    }
    try {
      const { data } = await ServiceRequestAPI.getServiceRequestProceedures()
      commit(SET_DIAGNOSTIC_LAB_PROCEEDURES, data)
      return data
    } catch (error) {
      throw error || error.message
    }
  },

  async getServiceRequestSectionTypes({ commit, state }) {
    if (state.serviceRequestSectionTypes.length) {
      return
    }
    try {
      const { data } = await ServiceRequestAPI.getServiceRequestSectionTypes()
      commit(SET_SERVICE_REQUEST_SECTION_TYPES, data)
      return data
    } catch (error) {
      throw error || error.message
    }
  },

  async getServiceRequestCategoryTypes({ commit, state }) {
    if (state.serviceRequestCategoryTypes.length) {
      return
    }
    try {
      const { data } = await ServiceRequestAPI.getServiceRequestCategoryTypes()
      commit(SET_SERVICE_REQUEST_CATEGORY_TYPES, data)
      return data
    } catch (error) {
      throw error || error.message
    }
  },

  async getGenericPeriodUnitTypes({ commit, state }) {
    if (state.serviceGenericPeriodUnits.length) {
      return
    }
    try {
      const { data } = await ServiceRequestAPI.getGenericPeriodUnitTypes()
      commit(SET_SERVICE_GENERIC_PERIOD_UNIT_TYPES, data)
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
    axios.get(`https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?maxList=&&sf=code,name&authenticity_token=&terms=${search}`)
      .then((response) => {
        commit(SET_CLINICAL_OPTIONS, response.data[3])
        return response
      })
      .catch(function (error) {
        throw error
      })
  },
}
