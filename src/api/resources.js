import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/admin/resources`)
  },

  encounterClass() {
    return http.get(`${this.url}valueset/encounter-class`)
  },

  paymentMethods() {
    return http.get(`${this.url}valueset/payment-methods`)
  },

  maritalStatuses() {
    return http.get(`${this.url}valueset/marital-status`)
  },

  categories() {
    return http.get('FHIR/healthcare-service-categories')
  },

  codes() {
    return http.get('FHIR/healthcare-service-provision-codes')
  },

  types() {
    return http.get('FHIR/healthcare-service-types')
  },
}
