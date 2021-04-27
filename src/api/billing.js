import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/bills/filter`)
  },

  filter(providerId, params) {
    return http.get(`${this.url}${providerId}/bills/filter?created_on_after=${params.created_on_after}&created_on=${params.created_on}&patient_mobile=${params.patient_mobile}&payerid=${params.payerid}&status=${params.status}`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/bills`, params)
  },

  duplicate(providerId, params) {
    return http.post(`${this.url}${providerId}/bills/${params.id}`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/bills/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/bills/${id}`)
  },
}
