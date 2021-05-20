import http from '@/http'

export default {
  url: 'providers/',

  list(providerId, patient) {
    return http.get(`${this.url}${providerId}/encounter`, { params: { patient } })
  },

  get(providerId, encounterId) {
    return http.get(`${this.url}${providerId}/encounter/${encounterId}`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/encounter`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/encounter/${params.id}`, params)
  },

  delete(providerId, id) {
    return http.delete(`${this.url}${providerId}/encounter/${id}/`)
  },
}
