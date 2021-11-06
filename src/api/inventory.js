import http from '@/http'

export default {
  url: 'providers/',

  list(providerId, params = {}){
    return http.get(`${this.url}${providerId}/get-inventory`, { params: { ...params } })
  },

  filter( params) {
    return http.get(`${this.url}/get-inventory`, { params })
  },

  create( params) {
    return http.post(`${this.url}pharmacy/inventory`, params)
  },

  update( params) {
    return http.patch(`${this.url}pharmacy/inventory/${params.id}/`, params)
  },

  delete( id) {
    return http.delete(`${this.url}pharmacy/inventory/${id}/`)
  },
}
