import http from '@/http'

export default {
  url: '/api/announcements',

  list(providerId, userId) {
    return http.get(`providers/${providerId}/users/${userId}/dependents`)
  },

  create(providerId, userId,params) {
    return http.post(`providers/${providerId}/users/${userId}/dependents`, params)
  },

  update(providerId, userId, params) {
    return http.patch(`providers/${providerId}/users/${userId}/dependents/${params.id}`, params)
  },

  delete(providerId, userId, id) {
    return http.delete(`providers/${providerId}/users/${userId}/dependents/${id}`)
  },
}
