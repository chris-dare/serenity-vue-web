import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId, params = {}) {
    return http.get(`${this.url}${providerId}/encounter-prescriptions`, {params})
  },

  getPatientPrescriptions(providerId, patientId){
    return http.get(`${this.url}${providerId}/patients/${patientId}/encounter-prescriptions`)
  },
}
