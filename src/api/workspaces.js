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
    return http.patch(`${this.url}${providerId}/workspaces/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/workspaces?workspace_id=${id}`)
  },
}
