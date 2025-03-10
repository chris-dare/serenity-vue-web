import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId, params) {
    return http.get(`${this.url}${providerId}/encounter-patient-allergies`, { params: {...params } })
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/encounter-patient-allergies`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/encounter-patient-allergies/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/encounter-patient-allergies/${id}`)
  },
}
