import http from '@/http'
import moment from 'moment'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/medicationrequests`)
  },

  get(providerId, patientId) {
    return http.get(`${this.url}${providerId}/medicationrequests/${patientId}`)
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/medicationrequests`, params)
  },

  update(providerId, params) {
    // TODO: use right format in form instead
    if(params.date){
      params.date = moment(params.date).format('YYYY-MM-DDThh:mm')
    }
    return http.patch(`${this.url}${providerId}/medicationrequests/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/medicationrequests/${id}`)
  },
}
