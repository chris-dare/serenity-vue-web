import http from '@/http'

export default {
  url: 'providers/',

  list(providerId, params) {
    return http.get(`${this.url}${providerId}/encounter`, { params: { ...params }, cache: false })
  },

  get(providerId, encounterId) {
    return http.get(`${this.url}${providerId}/encounter/${encounterId}`, { cache:false })
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/encounter`, params)
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/encounter/${params.id}`, params)
  },

  start(providerId, encounterId) {
    return http.post(`${this.url}${providerId}/encounter/${encounterId}/start`)
  },

  delete(providerId, id) {
    return http.delete(`${this.url}${providerId}/encounter/${id}/`)
  },

  updateDiagnosis(providerId, params) {
    return http.patch(`${this.url}${providerId}/encounter-patient-diagnosis/${params.id}`, params)
  },

  printPrescription(providerId,id) {
    return http({
      method: 'get',
      url: `${this.url}${providerId}/medicationrequests/print/${id}`,
      responseType: 'blob',
    }).then((response) =>
    {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      window.printJS(url)
    })
  },

  deleteDiagnosis(providerId, id) {
    return http.delete(`${this.url}${providerId}/encounter-patient-diagnosis/${id}`)
  },

  encounterActions(providerId, payload) {
    return http.post(`${this.url}${providerId}/encounter-actions`, payload)
  },
}
