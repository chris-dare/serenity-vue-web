import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId, params) {
    return http.get(`${this.url}${providerId}/appointments`, { params: {...params } })
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

  slots(providerId, params) {
    return http.get(`${this.url}${providerId}/slots/availableslots`, { params: { ...params } })
  },

  update(providerId, appointmentId, params) {
    return http.patch(`${this.url}${providerId}/appointment/${appointmentId}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/appointment/${id}`)
  },
}
