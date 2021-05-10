import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/appointment`)
  },

  get(providerId, appointmentId) {
    return http.get(`${this.url}${providerId}/appointments/${appointmentId}`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/appointments`, params)
  },

  slots(providerId, params) {
    return http.get(`${this.url}${providerId}/slots/availableslots`, { params })
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/appointments/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/appointments/${id}`)
  },
}
