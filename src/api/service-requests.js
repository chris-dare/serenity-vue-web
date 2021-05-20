import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/servicerequests`)
  },

  reports(providerId) {
    return http.get(`${this.url}${providerId}/diagnosticreports`)
  },

  create(providerId, params) {
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
