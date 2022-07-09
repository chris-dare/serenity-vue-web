import Vue from 'vue'
import omit from 'lodash/omit'
import BillingAPI from '@/api/billing'
import { SET_BILLING, DELETE_BILLING, UPDATE_BILLING, SET_ACCOUNTS } from './mutation-types'

export default {
  async getChargeItems({ commit, rootState }, params={}) {
    try {
      const provider = rootState.auth.provider
      const { data } = await BillingAPI.list(provider.id, params)
      commit(SET_BILLING, data.results || data.data)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error 
    }
  },

  async getPatientBilling({ commit, rootState }, params={}) {
    try {
      const provider = rootState.auth.provider
      let patientId = params.id
      const { data } = await BillingAPI.patientBills(provider.id, patientId, omit(params, ['id']))
      commit(SET_BILLING, data.results || data.data)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error 
    }
  },

  async createChargeItem({ commit, rootState}, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await BillingAPI.create(provider.id, payload)
      commit(UPDATE_BILLING, data.results)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error 
    }
  },

  async updateChargeItem({ commit, rootState}, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await BillingAPI.update(provider.id, payload)
      commit(UPDATE_BILLING, data.results)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error 
    }
  },

  async deleteChargeItem({ commit, rootState}, id) {
    try {
      const provider = rootState.auth.provider
      await BillingAPI.delete(provider.id, id)
      commit(DELETE_BILLING, id)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error 
    }
  },

  async requestCancelBill({ rootState}, params) {
    try {
      const provider = rootState.auth.provider
      const { data } = await BillingAPI.requestCancelBill(provider.id, params)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error 
    }
  },

  async exportBill({ rootState }, id) {
    try {
      const provider = rootState.auth.provider
      const data = await BillingAPI.print(provider.id, id)

      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async exportChargeItem({ rootState }, id) {
    try {
      const provider = rootState.auth.provider
      const data = await BillingAPI.printChargeItem(provider.id, id)

      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async exportCorporateBills({ rootState }, params) {
    try {
      const provider = rootState.auth.provider
      const {data} = await BillingAPI.printCorporateBill(provider.id, params)
      const url = window.URL.createObjectURL(new Blob([data]))
      window.printJS(url)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async getPatientAccounts({ commit, rootState }, { id, params }) {
    try {
      const provider = rootState.auth.provider
      const { data } = await BillingAPI.patientAccounts(provider.id, id, params)
      commit(SET_ACCOUNTS, data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error 
    }
  },

  async resetPatientAccounts({ commit }) {
    commit(SET_ACCOUNTS, [])
  },

  async topUpUserAccount({ dispatch, rootState }, { patientId, walletId, params }) {
    try {
      const provider = rootState.auth.provider
      await BillingAPI.topup(provider.id, patientId, walletId, params)
      dispatch('getPatientAccounts', { id: patientId })
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async payForInvoice({ commit, rootState }, { invoiceId, params }) {
    try {
      const provider = rootState.auth.provider
      const { data } = await BillingAPI.invoicePay(provider.id, invoiceId, params)
      commit(UPDATE_BILLING, data.data)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async payForMultipleChargeItems({ commit, rootState }, params) {
    try {
      const provider = rootState.auth.provider
      const { data } = await BillingAPI.multipleCharges(provider.id, params)
      data.data.forEach(element => {
        commit(UPDATE_BILLING, element)
      })
      
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async payForService({ commit, rootState }, { patientId, chargeItemId, params }) {
    try {
      const provider = rootState.auth.provider
      const { data } = await BillingAPI.userPay(provider.id, patientId, chargeItemId, params)
      commit(UPDATE_BILLING, data[0])
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async userPayService({ rootState }, params ) {
    try {
      const provider = rootState.auth.provider
      const { data } = await BillingAPI.servicePay(provider.id, params)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async raiseBill({ rootState }, params ) {
    try {
      const provider = rootState.auth.provider
      const { data } = await BillingAPI.raiseBill(provider.id, params)
      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },
  
  async raiseAdministrativeBill({ rootState }, params ) {
    try {
      const provider = rootState.auth.provider
      const { data } = await BillingAPI.raiseAdministrativeBill(provider.id, params)
      return data.data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async corporatePayForService({ commit }, { patientId, chargeItemId, params }) {
    try {
      const { data } = await BillingAPI.corporatePay(patientId, chargeItemId, params)
      commit(SET_ACCOUNTS, data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },


  async corporateAccountSettle({ commit, rootState }, { corporateId, billId, amount }) {
    try {
      const provider = rootState.auth.provider
      const { data } = await BillingAPI.corporatePay(provider.id, corporateId, billId, {amount})
      commit(SET_ACCOUNTS, data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },
}
