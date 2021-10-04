import http from '@/http'

export default {
  url: 'providers/',

  list(providerId) {
    return http.get(`${this.url}${providerId}/clients`)
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

  getClientBills(providerId, clientId, params){
    return http.get(`${this.url}${providerId}/corporates/${clientId}/bills`, { params })
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
