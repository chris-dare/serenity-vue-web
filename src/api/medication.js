import http from '@/http'
import moment from 'moment'

export default {
  url: 'providers/',

  list(providerId, params) {
    return http.get(`${this.url}${providerId}/medicationrequests`, { params })
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

  dispense(providerId, medicationRequests) {
    const categoryMap = {
      'inpatient': 'in-patient',
      'outpatient': 'out-patient',
    }
    const payload = medicationRequests.map(el => {
      const category = categoryMap[el.category] ? categoryMap[el.category] : el.category
      return {
        medication: el.medication.id,
        provider: providerId,
        prescription: el.id,
        // category: el.medication_request_category[0].display,
        category: category || 'out-patient',
        status: 'completed',
      }
    })
    return http.post(`${this.url}${providerId}/medication-dispenses`, payload)
  },


  createDispense(providerId, payload) {
    return http.post(`providers/${providerId}/medication-dispenses`, payload)
  },
}
