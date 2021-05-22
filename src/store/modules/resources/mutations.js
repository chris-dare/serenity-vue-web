import { SET_RESOURCES, UPDATE_RESOURCE, SET_ENCOUNTER_STATUSES, SET_RELIGIOUS_AFFLIATIONS, SET_CLINICAL_OPTIONS, DELETE_RESOURCE, SET_SPECIALTIES, SET_CATEGORIES, SET_CODES, SET_SERVICE_TYPES, SET_PAYMENT_METHODS, SET_ENCOUNTER_CLASSES, SET_MARITAL_STATUSES, SET_MEDICATION_OPTIONS } from './mutation-types'

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

  [SET_SPECIALTIES](state, specialties) {
    state.specialties = specialties
  },

  [SET_CATEGORIES](state, categories) {
    state.categories = categories
  },

  [SET_CODES](state, codes) {
    state.codes = codes
  },

  [SET_SERVICE_TYPES](state, types) {
    state.serviceTypes = types
  },

  [SET_PAYMENT_METHODS](state, methods) {
    state.paymentMethods = methods
  },

  [SET_ENCOUNTER_CLASSES](state, classes) {
    state.encounterClasses = classes
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
}
