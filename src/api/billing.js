import http from '@/http'

export default {
  url: 'providers/',

  list(providerId, params) {
    return http.get(`${this.url}${providerId}/finance/charge-items`, { params })
  },

  invoices(providerId, params) {
    return http.get(`${this.url}${providerId}/finance/invoices`, { params })
  },

  filter(providerId, params) {
    return http.get(`${this.url}${providerId}/finance/charge-items`, { params })
  },

  patientBills(providerId, patientId, params) {
    return http.get(`${this.url}${providerId}/patients/${patientId}/finance/charge-items`, { params })
  },

  patientAccounts(providerId, patientId, params) {
    return http.get(`${this.url}${providerId}/patients/${patientId}/payment-options`, { params, cache: false })
  },

  create(providerId, params) {
    return http.post(`${this.url}${providerId}/bills`, params)
  },

  transactions(providerId, corporateId, params) {
    return http.get(`${this.url}${providerId}/corporates/${corporateId}/transactions`, { params })
  },

  getCreditTotal(providerId, corporateId) {
    return http.get(`${this.url}${providerId}/corporates/${corporateId}/bills/total`)
  },

  export(providerId, billId) {
    return http.get(`${this.url}${providerId}/invoice/${billId}`)
  },

  topup(providerId, patientId, walletId, params) {
    return http.post(`${this.url}${providerId}/patients/${patientId}/wallets/${walletId}/deposit`, params)
  },

  userPay(providerId, patientId, chargeItemId, params) {
    return http.post(`providers/${providerId}/patients/${patientId}/charges/${chargeItemId}/pay`, params)
  },

  requestCancelBill(providerId, params) {
    return http.post(`providers/${providerId}/finance/charge-items/${params.charge}/actions`, params)
  },

  servicePay(providerId, params) {
    return http.post(`providers/${providerId}/pay/servicerequests`, params)
  },

  raiseBill(providerId, params) {
    return http.post(`providers/${providerId}/finance/raise-service-request-bill`, params)
  },

  raiseAdministrativeBill(providerId, params) {
    return http.post(`providers/${providerId}/finance/administrative-bill`, params)
  },

  invoicePay(providerId, invoiceId, params) {
    return http.post(`providers/${providerId}/finance/invoices/${invoiceId}/pay`, params)
  },

  multipleCharges(providerId, params) {
    return http.post(`providers/${providerId}/finance/receive-payment`, params)
  },

  corporatePay(patientId, chargeItemId, params) {
    return http.post(`finance/patients/${patientId}/charges/${chargeItemId}/pay`, params)
  },

  corporateSettle(providerId, corporateId, billId, params) {
    return http.post(`${this.url}${providerId}/corporates/${corporateId}/bills/${billId}`, params)
  },

  pendingBillsTotal(providerId, corporateId) {
    return http.get(`providers/${providerId}/corporates/${corporateId}/bills/total`)
  },

  getAccountHistory(providerId, patientId, walletId, params) {
    return http.get(`providers/${providerId}/patients/${patientId}/wallets/${walletId}/history`, { params })
  },

  update(providerId, params) {
    return http.patch(`${this.url}${providerId}/bills/${params.id}`, params)
  },

  delete(providerId,id) {
    return http.delete(`${this.url}${providerId}/bills/${id}`)
  },

  print(providerId, id, params = {}) {
    return http({
      method: 'get',
      url: `${this.url}${providerId}/finance/invoices/${id}/print`,
      params: {...params},
      responseType: 'blob',
    }).then((response) =>
    {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      window.printJS(url)
    })
  },

  printChargeItem(providerId, id, params) {
    return http({
      method: 'get',
      url: `${this.url}${providerId}/finance/charge-items/${id}/print`,
      params: { ...params },
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      window.printJS(url)
    })
  },

  printCorporateBill(providerId, params) {
    return http({
      method: 'get',
      url: `${this.url}${providerId}/finance/payer-bills/${params.payer}/print`,
      params: { ...params },
      responseType: 'blob',
    }).then((response) =>
    {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      window.printJS(url)
    })
  },

}
