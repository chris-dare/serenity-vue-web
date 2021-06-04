import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId, params = {}) {
    return http.get(`${this.url}${providerId}/servicerequests`, {params})
  },

  reports(providerId, params = {}) {
    return http.get(`${this.url}${providerId}/diagnosticreports`, {params})
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

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/servicerequests/${id}`)
  },
}
