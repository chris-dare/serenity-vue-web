import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/medicationrequests`)
  },

  get(providerId, patientId) {
    return http.get(`${this.url}${providerId}/medicationrequests/${patientId}`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/medicationrequests`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/medicationrequests/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/medicationrequests/${id}`)
  },
}
