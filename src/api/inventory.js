import http from '@/http'

export default {
  url: 'providers/',

  list(providerId, params = {}){
    return http.get(`${this.url}${providerId}/pharmacy/inventory`, { params: { ...params } })
  },

  filter(providerId, params) {
    return http.get(`${this.url}${providerId}/pharmacy/inventory`, { params })
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/pharmacy/inventory`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/pharmacy/inventory/${params.id}/`, params)
  },

  delete(providerId, id) {
    return http.delete(`${this.url}${providerId}/pharmacy/inventory/${id}/`)
  },
}
