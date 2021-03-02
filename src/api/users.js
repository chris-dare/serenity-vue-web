import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    console.log('here')
    return http.get(`${this.url}${providerId}/practitioners`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/practitioners`, params)
  },

  update(providerId, params) {
    return http.put(`${this.url}${providerId}/practitioners/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/practitioners/${id}`)
  },
}
