import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/admin/resources`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/resources`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/resources/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/resources/${id}`)
  },
}
