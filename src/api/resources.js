import http from '@/http'

export default {
  url: 'providers/',
  
  list(providerId) {
    return http.get(`${this.url}${providerId}/admin/resources`)
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
