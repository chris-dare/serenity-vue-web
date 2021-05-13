import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/appointment`)
  },

  get(providerId, appointmentId) {
    return http.get(`${this.url}${providerId}/appointment/${appointmentId}`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/appointment`, params)
  },

  cancel(providerId, appointmentId, params) {
    return http.post(`${this.url}${providerId}/appointment/cancel/${appointmentId}`, params)
  },

  slots(providerId, specialty) {
    return http.get(`${this.url}${providerId}/slots/availableslots`, { params: { specialty } })
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/appointments/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/appointment/${id}`)
  },
}
