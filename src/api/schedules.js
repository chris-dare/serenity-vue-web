import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId, practitionerId='be0c4b4a-d5a5-4717-a8f4-edcbbc1b7c3c') {
    return http.get(`${this.url}${providerId}/practitioners/${practitionerId}/schedules`)
  },

  get(providerId, practitionerId, id) {
    return http.get(`${this.url}${providerId}/practitioners/${practitionerId}/schedules/${id}`)
  },

  create(providerId, practitionerId, params) {
    return http.post(`${this.url}${providerId}/practitioners/${practitionerId}/schedules`, params)
  },

  update(providerId, practitionerId, params) {
    return http.patch(`${this.url}${providerId}/practitioners/${practitionerId}/schedules/${params.id}`, params)
  },

  delete(providerId, practitionerId, id) {
    return http.delete(`${this.url}${providerId}/practitioners/${practitionerId}/schedules/${id}`)
  },
}
