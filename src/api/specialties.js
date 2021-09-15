import http from '@/http'

export default {
  url: 'providers/',
  // OLD API for specialties
  // list(providerId) {
  //   return http.get(`${this.url}${providerId}/practitioner-specialties`)
  // },

  list() {
    return http.get(`${this.url}valueset/practitioner-specialty-type`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/practitioner-specialties`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/practitioner-specialties/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/practitioner-specialties/${id}`)
  },
}
