import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/practitioner-specialties`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/practitioner-specialties`, params)
  },

  update(providerId, params) {
    return http.put(`${this.url}${providerId}/practitioner-specialties/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/practitioner-specialties/${id}`)
  },
}
