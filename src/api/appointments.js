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
    return http.get(`${this.url}${providerId}/slots/availableslots`, { params: { ...params }, cache: false })
  },
  doctors(providerId, params) {
    return http.get(`${this.url}${providerId}/slots/availableslots/grouped`, { params: { ...params }, cache: false })
  },

  nextSlot(providerId, params) {
    return http.get(`${this.url}${providerId}/slots/nextavailableslot`, { params: { ...params }, cache: false })
  },

  update(providerId, appointmentId, params) {
    return http.patch(`${this.url}${providerId}/appointment/${appointmentId}`, params)
  },

  reschedule(providerId, appointmentId, params) {
    return http.post(`${this.url}${providerId}/appointment/${appointmentId}/reschedule`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/appointment/${id}`)
  },
}
