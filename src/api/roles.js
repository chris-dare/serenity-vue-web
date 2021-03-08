import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/roles`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/roles`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/roles/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/roles/${id}`)
  },
}
