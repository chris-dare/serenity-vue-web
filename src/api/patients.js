import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/patients`)
  },

  get(providerId, patientId) {
    return http.get(`${this.url}${providerId}/patients/${patientId}`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/patients`, params)
  },

  duplicate(providerId, params) {
    return http.post(`${this.url}${providerId}/patients/${params.id}`, params)
  },

  update(providerId, params) {
    delete params['user']
    delete params['name']
    return http.patch(`${this.url}${providerId}/patients/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/patients/${id}`)
  },

  getMedication(providerId) {
    return http.get(`${this.url}${providerId}/patients`)
  },

  getDiagnosis(providerId, patientId) {
    return http.get(`${this.url}${providerId}/encounter-patient-diagnosis`, { params: { patient: patientId } })
  },

  getNotes(providerId, patientId) {
    return http.get(`${this.url}${providerId}/encounter-patient-notes`, { params: { patient: patientId } })
  },

  getReferrals(providerId, patient) {
    return http.get(`${this.url}${providerId}/referral-requests`, { params: { patient } })
  },

  createReferral(providerId, params) {
    return http.post(`${this.url}${providerId}/referral-requests`, params)
  },

  updateReferral(providerId, params) {
    return http.patch(`${this.url}${providerId}/referral-requests/${params.id}`, params)
  },
}
