import http from '@/http'

export default {
  url: 'providers/',

  list(providerId, params) {
    return http.get(`${this.url}${providerId}/clients`, { params: {...params } })
  },

  getClientBy(provider, companyId) {
    return http.get(`${this.url}${provider}/clients/${companyId}`)
  },

  getClientAccount({
    id = '',
    providerId = '',
  } = {}){
    return http.get(`${this.url}${providerId}/client-accounts?owner=${id}`)
  },

  getClientPolicies({
    id = '',
    providerId = '',
  } = {}){
    return http.get(`${this.url}${providerId}/clients/${id}/health-policies`)
  },

  getClientBills(providerId, clientId, params){
    return http.get(`${this.url}${providerId}/corporates/${clientId}/bills`, { params })
  },

  createBenefactor(providerId, params) {
    return http.post(`${this.url}${providerId}/clients/${params.id}/beneficiaries`, params.form)
  },

  createPolicy(providerId, params) {
    console.log(params)
    return http.post(`${this.url}${providerId}/clients/${params?.id}/health-policies`, params.form)
  },


  create(providerId, params) {
    return http.post(`${this.url}${providerId}/clients`, params)
  },

  deposit(providerId, params) {
    return http.post(`${this.url}${providerId}/client-accounts/${params.id}/actions`, params)
  },

  providerAccount(providerId, params) {
    return http.post(`${this.url}${providerId}/client-accounts`, params)
  },

  clientAccountUpdate(providerId, params) {
    return http.post(`${this.url}${providerId}/client-accounts/${params.id}/actions`, { action: params.action})
  },

  update(params) {
    return http.patch(`corporates/onboard/${params.main_branch_id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/corporates/${id}`)
  },
}
