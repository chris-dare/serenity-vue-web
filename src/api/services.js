import http from '@/http'

export default {
  url: 'providers/',

  list(providerId) {
    return http.get(`${this.url}${providerId}/administration/healthcareservices`)
  },

  get(providerId, id) {
    return http.get(`${this.url}${providerId}/administration/healthcareservices/${id}`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/administration/healthcareservices`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/administration/healthcareservices/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/administration/healthcareservices/${id}`)
  },

  getWards(providerId) {
    return http.get(`${this.url}${providerId}/administration/healthcareservices`)
  },
}
