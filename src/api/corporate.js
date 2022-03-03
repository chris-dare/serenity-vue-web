import http from '@/http'

export default {
  url: 'corporates/',
  
  list(id) {
    return http.get(`${this.url}${id}/employees`)
  },

  // filter(providerId, params) {
  //   return http.get(`${this.url}${providerId}/bills/filter?created_on_after=${params.created_on_after}&created_on=${params.created_on}&patient_mobile=${params.patient_mobile}&payerid=${params.payerid}&status=${params.status}`)
  // },

  filter(id, params) {
    return http.get(`${this.url}${id}/employees/filter`, { params })
  },

  create(params) {
    return http.post(`${this.url}${params.id}/employees`, params.form)
  },
  listDependent(id) {
    return http.post(`users/${id}/dependents`)
  },

  createDependent(params) {
    return http.post(`users/${params.id}/dependents`, params.form)
  },

  updateDependent(params) {
    return http.patch(`users/${params.id}/dependents`, params)
  },

  updateClientAccount(params) {
    return http.post(`users/prepaid-accounts/${params.id}/deposit`, params.form)
  },

  update(params) {
    return http.patch(`${this.url}${params.companyId}/employees/${params.uuid}`, params)
  },

  updateBeneficiary(params) {
    return http.patch(`providers/${params.providerId}/clients/${params.companyId}/beneficiaries/${params.beneficiary[0].id}/${params.uuid}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/bills/${id}`)
  },
}
