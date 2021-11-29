import {mapActions} from 'vuex'
export default {
  data() {
    return {
      settled: false,
    }
  },

  watch: {
    bill: {
      deep: true,
      immediate: true,
      handler(val) {
        this.settled = val?.status === 'billed'
      },
    },
  },

  methods: {
    ...mapActions({
      payForInvoice: 'billing/payForInvoice',
      payForMultipleChargeItems: 'billing/payForMultipleChargeItems',
      exportBill: 'billing/exportBill',
      exportChargeItem: 'billing/exportChargeItem',
    }),

    async pay() {
      this.loading = true
      try {
        await this.payForInvoice({
          patientId: this.bill.patientid,
          invoiceId: this.bill.invoice_id || this.bill.uuid,
          params: this.getPaymentParams(this.form),
        })
        this.$toast.open('Bill successfully settled')
        this.settled = true
        this.close()
      } catch (error) {
        this.loading = false
        this.settled = false
      } finally {
        this.loading = false
      }
    },

    async payChargeItems(bills) {
      this.loading = true
      try {
        await this.payForMultipleChargeItems({
          patient: this.bill.patientid,
          charge_items: bills.map(b => b.id),
          payment_info: this.getPaymentParams(this.form),
        })
        this.$toast.open('Bill successfully settled')
        this.settled = true
        this.close()
      } catch (error) {
        this.loading = false
        this.settled = false
      } finally {
        this.loading = false
      }
    },

    getPaymentParams(details) { 
      if (details.transaction_type === this.$global.CASH_TYPE) {
        return {
          amount: details.amount,
          currency: details.currency,
          transaction_type: this.$global.CASH_TYPE,
        }
      }
      if (details.transaction_type === this.$global.INSURANCE_TYPE) {
        let paymentInfo = { transaction_type: details.transaction_type, account_id: details.account_id }
        if (details.copayment_info) {
          paymentInfo.copayment_info = this.getPaymentParams(details.copayment_info)
        }
        return paymentInfo
      }

      return { transaction_type: details.transaction_type, account_id: details.account_id }
    },

    async print() {
      try {
        this.printLoading = true
        if (this.bill.status_display === 'Unpaid') {
          await this.exportBill(this.bill.invoice_id || this.bill.id)
        } else {
          await this.exportChargeItem(this.bill.id || this.bill.invoice_id)
        }
        

        this.printLoading = false
      } catch (error) {
        this.printLoading = false
      }
    },

    getValidationMessages(v) {
      if (v.amount?.$invalid) {
        return 'Please enter a valid amount'
      }
      if (v.currency?.$invalid) {
        return 'Please select a currency'
      }
      if (v.account_id?.$invalid) {
        return 'Please select an account'
      }

      return 'Please fill in all valid fields'
    },
  },
}
