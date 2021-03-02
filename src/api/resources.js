import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/resources`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/resources`, params)
  },

  update(providerId, params) {
    return http.put(`${this.url}${providerId}/resources/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/resources/${id}`)
  },
}
