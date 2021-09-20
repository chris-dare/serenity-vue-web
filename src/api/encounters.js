import http from '@/http'

export default {
  url: 'providers/',

  list(providerId, params) {
    return http.get(`${this.url}${providerId}/encounter`, { params })
  },

  get(providerId, encounterId) {
    return http.get(`${this.url}${providerId}/encounter/${encounterId}`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/encounter`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/encounter/${params.id}`, params)
  },

  start(providerId, encounterId) {
    return http.post(`${this.url}${providerId}/encounter/${encounterId}/start`)
  },

  delete(providerId, id) {
    return http.delete(`${this.url}${providerId}/encounter/${id}/`)
  },

  updateDiagnosis(providerId, params) {
    return http.patch(`${this.url}${providerId}/encounter-patient-diagnosis/${params.id}`, params)
  },

  deleteDiagnosis(providerId, id) {
    return http.delete(`${this.url}${providerId}/encounter-patient-diagnosis/${id}`)
  },
}
