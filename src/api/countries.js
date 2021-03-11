import http from '@/http'

export default {
  url: '/api/announcements',

  list(id, page) {
    return http.get(`/api/facilities/${id}/announcements`, { params: { page } })
  },

  create(params) {
    return http.post(this.url, params)
  },

  update(params) {
    return http.patch(this.url + '/' + params.uuid, params)
  },

  delete(id) {
    return http.delete(this.url + '/' + id)
  },
}
