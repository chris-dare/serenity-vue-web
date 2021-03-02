import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/locations`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/locations`, params)
  },

  update(providerId, params) {
    return http.put(`${this.url}${providerId}/locations/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/locations/${id}`)
  },
}
