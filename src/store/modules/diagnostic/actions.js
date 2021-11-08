import DiagnosticAPI from '@/api/diagnostic'
import ServiceRequestsAPI from '@/api/service-requests'
import Vue from 'vue'
import {
  SET_SERVICE_REQUESTS,
  DELETE_DIAGNOSTIC_REPORT,
  UPDATE_DIAGNOSTIC_REPORT,
  SET_DIAGNOSTIC_REPORTS,
  UPDATE_SERVICE_REQUEST,
  DELETE_SERVICE_REQUEST,
} from './mutation-types'

export default {
  async getServiceRequests({ commit, rootState }, params) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ServiceRequestsAPI.list(provider.id, params)
      let new_data = data.results.map((element) => {
        element.patient_name = element.patient_detail.first_name + ' ' + element.patient_detail.lastname
        return element
      })
      commit(SET_SERVICE_REQUESTS, new_data)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async createServiceRequest({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ServiceRequestsAPI.create(provider.id, payload)
      commit(UPDATE_SERVICE_REQUEST, data)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async updateServiceRequest({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await ServiceRequestsAPI.update(provider.id, payload)
      commit(UPDATE_SERVICE_REQUEST, data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async createSpecimen({ rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await DiagnosticAPI.createSpecimen(provider.id, payload)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async getServiceTypes(payload) {
    try {
      const { data } = await DiagnosticAPI.getServiceType(payload)
      return data
    } catch (error) {
      console.log(error)
      Vue.prototype.$utils.error(error)
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

  async getDiagnosticReports({ commit, rootState }, params) {
    try {
      const provider = rootState.auth.provider
      const { data } = await DiagnosticAPI.reports(provider.id, params)
      let new_data = data.results.map((element) => {
        element.patient_name = element.patient_detail.first_name + ' ' + element.patient_detail.lastname
        return element
      })
      commit(SET_DIAGNOSTIC_REPORTS, new_data)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async getPatientReports({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await DiagnosticAPI.reports(provider.id, payload)
      let new_data = data.results.map((element) => {
        element.patient_name = element.patient_detail.first_name + ' ' + element.patient_detail.lastname
        return element
      })
      commit(SET_DIAGNOSTIC_REPORTS, new_data)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async createDiagnostic({ commit, rootState}, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await DiagnosticAPI.create(provider.id, payload)
      commit(UPDATE_DIAGNOSTIC_REPORT, data.results)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async createDiagnosticResult({ commit, rootState}, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await DiagnosticAPI.createResult(provider.id, payload)
      commit(UPDATE_DIAGNOSTIC_REPORT, data)
    } catch (error) {
      throw error.data || error
    }
  },

  async updateDiagnosticReport({ commit, rootState}, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await DiagnosticAPI.updateReport(provider.id, payload)
      commit(UPDATE_DIAGNOSTIC_REPORT, data)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async updateResultStatus({ commit, rootState}, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await DiagnosticAPI.updateResultStatus(provider.id, payload)
      commit(UPDATE_DIAGNOSTIC_REPORT, data)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async deleteDiagnosticReport({ commit, rootState}, id) {
    try {
      const provider = rootState.auth.provider
      await DiagnosticAPI.delete(provider.id, id)
      commit(DELETE_DIAGNOSTIC_REPORT, id)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },
}
