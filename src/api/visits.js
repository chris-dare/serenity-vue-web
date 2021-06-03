import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/visits`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/visits`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/visits/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/visits/${id}`)
  },
}
