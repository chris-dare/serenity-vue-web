import http from '@/http'

export default {
  url: 'providers/',
  list(providerId, params = {}) {
    return http.get(`${this.url}${providerId}/servicerequests`, { params: {...params } })
  },

  reports(providerId, params = {}) {
    return http.get(`${this.url}${providerId}/diagnosticreports`, { params: {...params } })
  },

  get(providerId, id) {
    return http.get(`${this.url}${providerId}/diagnosticreports/${id}`)
  },

  printLabel(providerId, id) {
    return http.get(`${this.url}${providerId}/diagnosticreports/${id}`)
  },

  createResult(providerId, params = {}) {
    return http.post(`${this.url}${providerId}/diagnosticreports`, params)
  },

  updateResultStatus(providerId, params = {}) {
    return http.post(`${this.url}${providerId}/diagnosticreports/${params.id}/actions`, params.payload)
  },

  listSpecimen(providerId, params) {
    return http.gett(`${this.url}${providerId}/service-requests/${params}/collected-samples`)
  },
  

  createSpecimen(providerId, params = {}) {
    return http.post(`${this.url}${providerId}/specimen`, params)
  },

  create(providerId, params) {
    // TODO: find out why priority is passed as uppercase
    params[0].priority = params[0].priority.toLowerCase()
    return http.post(`${this.url}${providerId}/servicerequests`, params)
  },

  duplicate(providerId, params) {
    return http.post(`${this.url}${providerId}/servicerequests/${params.id}`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/servicerequests/${params.id}`, params)
  },

  getServiceType(params) {
    return http.get(`${this.url}valueset/specimen-type`, params)
  },

  updateReport(providerId, params) {
    return http.patch(`${this.url}${providerId}/diagnosticreports/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/servicerequests/${id}`)
  },
}
