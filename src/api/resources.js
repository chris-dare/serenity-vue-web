import http from '@/http'

export default {
  url: 'providers/',

  list(providerId) {
    return http.get(`${this.url}${providerId}/admin/resources`)
  },

  countries() {
    return http.get(`${this.url}valueset/country`)
  },

  encounterClass() {
    return http.get(`${this.url}valueset/encounter-class`)
  },

  encounterStatus() {
    return http.get(`${this.url}valueset/encounter-status`)
  },
  encounterPriorities() {
    return http.get(`${this.url}valueset/act-priority-type`)
  },

  religiousAffiliations() {
    return http.get(`${this.url}valueset/religious-affiliation`)
  },

  paymentMethods() {
    return http.get(`${this.url}valueset/payment-method`)
  },

  mobileMoneyVendors() {
    return http.get(`${this.url}valueset/mobile-money-vendor`)
  },

  maritalStatuses() {
    return http.get(`${this.url}valueset/marital-status`)
  },

  genders() {
    return http.get(`${this.url}valueset/administrative-gender`)
  },

  languages() {
    return http.get(`${this.url}valueset/language-type`)
  },

  categories() {
    return http.get('/providers/valueset/healthcare-service-category-type')
  },

  observationCategories() {
    return http.get('/providers/valueset/observation-category-unit-type')
  },

  codes() {
    return http.get('FHIR/healthcare-service-provision-codes')
  },

  types() {
    return http.get('providers/valueset/service-type')
  },

  currencies() {
    return http.get('/providers/valueset/currency-type')
  },

  referenceTypes(){
    return http.get(`${this.url}valueset/user-wallet-reference-type`)
  },

  dosageRoutes(){
    return http.get(`${this.url}valueset/dosage-route-type`)
  },
}
