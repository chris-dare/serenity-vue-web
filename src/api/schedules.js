import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId, practitionerId) {
    return http.get(`${this.url}${providerId}/practitioners/${practitionerId}/schedule`)
  },

  get(providerId, practitionerId, id) {
    return http.get(`${this.url}${providerId}/practitioners/${practitionerId}/schedules/${id}`)
  },

  create(providerId, practitionerId='be0c4b4a-d5a5-4717-a8f4-edcbbc1b7c3c', params) {
    return http.post(`${this.url}${providerId}/practitioners/${practitionerId}/schedule`, params)
  },

  update(providerId, practitionerId, scheduleId, params) {
    return http.patch(`${this.url}${providerId}/practitioners/${practitionerId}/schedules/${scheduleId}`, params)
  },

  delete({ providerId, practitionerId, scheduleId }) {
    return http.delete(`${this.url}${providerId}/practitioners/${practitionerId}/schedules/${scheduleId}`)
  },
}
