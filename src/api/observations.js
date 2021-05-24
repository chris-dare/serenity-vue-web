import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/observations`)
  },

  get(providerId, patientId) {
    return http.get(`${this.url}${providerId}/observations/${patientId}`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/observations`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/observations/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/observations/${id}`)
  },

  // valuesets
  unitTypes() {
    return http.get(`${this.url}valueset/observation-unit-type`)
  },

  systemTypes() {
    return http.get(`${this.url}valueset/system-exam-review-type`)
  },

  socialTypes() {
    return http.get(`${this.url}valueset/social-history-unit-type`)
  },

  vitalTypes() {
    return http.get(`${this.url}valueset/vitals-unit-type`)
  },
}
