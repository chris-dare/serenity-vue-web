import { SET_SERVICE_REQUESTS, UPDATE_SERVICE_REQUEST, DELETE_SERVICE_REQUEST, UPDATE_DIAGNOSTIC_REPORT, DELETE_DIAGNOSTIC_REPORT, SET_DIAGNOSTIC_REPORTS } from './mutation-types'

export default {
  [SET_SERVICE_REQUESTS](state, serviceRequests) {
    state.serviceRequests = serviceRequests
  },

  [UPDATE_SERVICE_REQUEST](state, serviceRequests) {
    const index = state.serviceRequests.findIndex(a => a.id === serviceRequests.id)
    if (index !== -1) {
      state.serviceRequests = state.serviceRequests.map(a => {
        if (a.id === serviceRequests.id) return serviceRequests
        return a
      })
    } else {
      state.serviceRequests.unshift(serviceRequests)
    }
  },

  [DELETE_SERVICE_REQUEST](state, requestId) {
    const index = state.serviceRequests.findIndex(a => a.id === requestId)
    if (index !== -1) {
      state.serviceRequests.splice(index, 1)
    }
  },

  [SET_DIAGNOSTIC_REPORTS](state, diagnosticReports) {
    state.diagnosticReports = diagnosticReports
  },

  [UPDATE_DIAGNOSTIC_REPORT](state, diagnosticReport) {
    const index = state.diagnosticReports.findIndex(a => a.id === diagnosticReport.id)
    if (index !== -1) {
      state.diagnosticReports = state.diagnosticReports.map(a => {
        if (a.id === diagnosticReport.id) return diagnosticReport
        return a
      })
    } else {
      state.diagnosticReports.unshift(diagnosticReport)
    }
  },

  [DELETE_DIAGNOSTIC_REPORT](state, diagnosticId) {
    const index = state.diagnosticReports.findIndex(a => a.id === diagnosticId)
    if (index !== -1) {
      state.diagnosticReports.splice(index, 1)
    }
  },
}
