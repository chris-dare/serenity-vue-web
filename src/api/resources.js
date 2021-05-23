import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/admin/resources`)
  },

  encounterClass() {
    return http.get(`${this.url}valueset/encounter-class`)
  },

  encounterStatus() {
    return http.get(`${this.url}valueset/encounter-status`)
  },

  religiousAffiliations() {
    return http.get(`${this.url}valueset/religious-affiliation`)
  },

  paymentMethods() {
    return http.get(`${this.url}valueset/payment-methods`)
  },

  maritalStatuses() {
    return http.get(`${this.url}valueset/marital-status`)
  },

  genders() {
    return http.get(`${this.url}valueset/administrative-gender`)
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
