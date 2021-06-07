import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/practitioners`)
  },
  get(providerId, id) {
    return http.get(`${this.url}${providerId}/practitioners/${id}`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/practitioners`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/practitioners/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/practitioners/${id}`)
  },

  search( params) {
    return http.get('users', { params: { ...params } })
  },
}
