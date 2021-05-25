import http from '@/http'

export default {
  url: 'providers/',
  
  list() {
    return http.get(`${this.url}clients/`)
  },

  getClientBy({
    companyId = '',
  } = {}) {
    return http.get(`${this.url}corporates/onboard/${companyId}/`)
  },

  getClientAccount({
    id = '',
    providerId = '',
  } = {}){
    return http.get(`${this.url}${providerId}/client-accounts?companyId=${id}`)
  },

  getClientBills({
    id = '',
    providerId = '',
  } = {}){
    return http.get(`${this.url}${providerId}/corporates/${id}/bills`)
  },


  create(providerId, params) {
    return http.post(`${this.url}${providerId}/clients`, params)
  },

  deposit(params) {
    return http.post(`${this.url}client-accounts/deposit`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/corporates/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/corporates/${id}`)
  },
}
