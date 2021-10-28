import http from '@/http'

export default {
  url: 'providers/',

  registerPatientAsBeneficiary(providerId, clientId, params) {
    return http.post(`${this.url}${providerId}/clients/${clientId}/beneficiaries`, params)
  },

  insurancePolicies(providerId, clientId) {
    return http.get(`${this.url}${providerId}/clients/${clientId}/health-policies`)
  },
}
