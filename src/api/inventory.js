import http from '@/http'

export default {
  url: 'providers/pharmacy',

  list() {
    return http.get(`${this.url}/inventory`)
  },

  filter( params) {
    return http.get(`${this.url}/inventory`, { params })
  },

  create( params) {
    return http.post(`${this.url}/inventory`, params)
  },

  update( params) {
    return http.patch(`${this.url}/inventory/${params.id}`, params)
  },

  delete( id) {
    return http.delete(`${this.url}/inventory/${id}`)
  },
}
