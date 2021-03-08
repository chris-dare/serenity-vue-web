import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/healthcare-services`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/healthcare-services`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/healthcare-services/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/healthcare-services/${id}`)
  },
}
