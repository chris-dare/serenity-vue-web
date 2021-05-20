import http from '@/http'

export default {
  url: 'providers/',
  
  list() {
    return http.get(`${this.url}clients/`)
  },

  create(providerId, params) {
    return http.post(`${this.url}corporates/onboard`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/corporates/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/corporates/${id}`)
  },
}
