import {
  SET_RESOURCES,
  UPDATE_RESOURCE,
  SET_ENCOUNTER_STATUSES,
  SET_GENDERS,
  SET_RELIGIOUS_AFFLIATIONS,
  SET_CLINICAL_OPTIONS,
  DELETE_RESOURCE,
  SET_SPECIALTIES,
  SET_CATEGORIES,
  SET_CODES,
  SET_SERVICE_TYPES,
  SET_PAYMENT_METHODS,
  SET_ENCOUNTER_CLASSES,
  SET_MARITAL_STATUSES,
  SET_MEDICATION_OPTIONS,
  SET_OBSERVATION_UNIT_TYPES,
  SET_SYSTEM_EXAM_UNIT_TYPES,
  SET_SOCIAL_HISTORY_UNIT_TYPES,
  SET_VITALS_UNIT_TYPES,
  SET_LANGUAGES,
  SET_VENDORS,
  SET_PHARMACY_INVENTORY_OPTIONS,
  SET_CURRENCIES,
  SET_REFERENCE_TYPES,
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
  [SET_RESOURCES](state, resources) {
    state.resources = resources
  },

  [UPDATE_RESOURCE](state, resource) {
    const index = state.resources.findIndex(a => a.id === resource.id)
    if (index !== -1) {
      state.resources = state.resources.map(a => {
        if (a.id === resource.id) return resource
        return a
      })
    } else {
      state.resources.push(resource)
    }
  },

  [DELETE_RESOURCE](state, resourceId) {
    const index = state.resources.findIndex(a => a.id === resourceId)
    if (index !== -1) {
      state.resources.splice(index, 1)
    }
  },

  [SET_DIAGNOSTIC_LAB_PROCEEDURES](state, diagnosticLabProceedures) {
    state.diagnosticLabProceedures = diagnosticLabProceedures
  },

  [SET_SERVICE_GENERIC_PERIOD_UNIT_TYPES](state, serviceGenericPeriodUnits) {
    state.serviceGenericPeriodUnits = serviceGenericPeriodUnits
  },

  [SET_SERVICE_REQUEST_CATEGORY_TYPES](state, serviceRequestCategoryTypes) {
    state.serviceRequestCategoryTypes = serviceRequestCategoryTypes
  },

  [SET_SERVICE_REQUEST_SECTION_TYPES](state, serviceRequestSectionTypes) {
    state.serviceRequestSectionTypes = serviceRequestSectionTypes
  },

  [SET_SPECIALTIES](state, specialties) {
    state.specialties = specialties
  },

  [SET_DOSAGE_ROUTES](state, dosageRoutes){
    state.dosageRoutes = dosageRoutes
  },

  [SET_CATEGORIES](state, categories) {
    state.categories = categories
  },

  [SET_REFERENCE_TYPES](state, referenceTypes) {
    state.referenceTypes = referenceTypes
  },

  [SET_CODES](state, codes) {
    state.codes = codes
  },

  [SET_SERVICE_TYPES](state, types) {
    state.serviceTypes = types
  },
  [SET_REVENUE_TAGS](state, types) {
    state.revenueTags = types
  },

  [SET_PAYMENT_METHODS](state, methods) {
    state.paymentMethods = methods
  },

  [SET_ENCOUNTER_CLASSES](state, classes) {
    state.encounterClasses = classes
  },

  [SET_OBSERVATION_CATEGORIES](state, categories) {
    state.observationCategories = categories
  },

  [SET_MARITAL_STATUSES](state, classes) {
    state.maritalStatuses = classes
  },

  [SET_MEDICATION_OPTIONS](state, classes) {
    state.medicationOptions = classes
  },

  [SET_CLINICAL_OPTIONS](state, classes) {
    state.clinicalOptions = classes
  },

  [SET_ENCOUNTER_STATUSES](state, statuses) {
    state.encounterStatuses = statuses
  },

  [SET_RELIGIOUS_AFFLIATIONS](state, religions) {
    state.religiousAffiliations = religions
  },

  [SET_GENDERS](state, genders) {
    state.genders = genders
  },

  [SET_OBSERVATION_UNIT_TYPES](state, unitTypes) {
    state.unitTypes = unitTypes
  },

  [SET_OBSERVATION_INTERPRETATION_TYPES](state, interpretationTypes) {
    state.interpretationTypes = interpretationTypes
  },

  [SET_SYSTEM_EXAM_UNIT_TYPES](state, examUnitTypes) {
    state.examUnitTypes = examUnitTypes
  },

  [SET_SOCIAL_HISTORY_UNIT_TYPES](state, socialUnitTypes) {
    state.socialUnitTypes = socialUnitTypes
  },

  [SET_VITALS_UNIT_TYPES](state, vitalsUnitTypes) {
    state.vitalsUnitTypes = vitalsUnitTypes
  },

  [SET_LANGUAGES](state, languages) {
    state.languages = languages
  },
  [SET_VENDORS](state, vendors) {
    state.vendors = vendors
  },

  [SET_PHARMACY_INVENTORY_OPTIONS](state, inventory) {
    state.pharmacyInventory = inventory
  },

  [SET_CURRENCIES](state, currencies) {
    state.currencies = currencies
  },

  [SET_ENCOUNTER_PRIORITIES](state, encounterPriorities) {
    state.encounterPriorities = encounterPriorities
  },
}
