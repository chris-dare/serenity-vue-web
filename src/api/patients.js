import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/patients`)
  },

  get(providerId, patientId) {
    return http.get(`${this.url}${providerId}/patients/patients/${patientId}`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/patients`, params)
  },

  duplicate(providerId, params) {
    return http.post(`${this.url}${providerId}/patients/${params.id}`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/patients/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/patients/${id}`)
  },
}
