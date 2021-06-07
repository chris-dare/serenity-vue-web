import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/workspaces`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/workspaces`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/workspaces`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/workspaces`, {data: {id: id}})
  },
}
