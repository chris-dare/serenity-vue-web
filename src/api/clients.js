import http from '@/http'

export default {
  url: 'providers/',

  list() {
    return http.get(`${this.url}clients/`)
  },

  getClientBy(companyId = '') {
    return http.get(`${this.url}corporates/onboard/${companyId}/`)
  },

  getClientAccount({
    id = '',
    providerId = '',
  } = {}){
    return http.get(`${this.url}${providerId}/client-accounts/filter?companyId=${id}`)
  },

  getClientBills(providerId, clientId, params){
    return http.get(`${this.url}${providerId}/corporates/${clientId}/bills`, { params })
  },


  create(providerId, params) {
    return http.post(`${this.url}${providerId}/clients`, params)
  },

  deposit(params) {
    return http.post(`${this.url}client-accounts/deposit`, params)
  },

  providerAccount(providerId, params) {
    return http.post(`${this.url}${providerId}/client-accounts`, params)
  },

  update(params) {
    return http.patch(`corporates/onboard/${params.main_branch_id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/corporates/${id}`)
  },
}
