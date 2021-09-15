<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="content">
      <div>
        <BillingSuccessful
          v-if="done"
          @click="close"
        />

        <div
          v-else
          class="space-y-6"
        >
          <PaymentDetail
            :details="bill"
            label="Payment Transaction"
            hide-total
          />
          <ModeOfPayment
            v-if="!settled"
            v-model="form"
            :v="$v"
            show-cash-options
            :total="bill.charge"
          />
          <div class="flex items-center justify-between mt-4">
            <div class="flex items-center space-x-2">
              <SeButton
                variant="secondary"
                @click="close"
              >
                Cancel
              </SeButton>
            </div>

            <div class="flex space-x-2">
              <SeButton
                v-if="settled"
                variant="secondary"
                :loading="loading"
                @click="print"
              >
                Print
              </SeButton>
              <SeButton
                v-else
                :loading="loading"
                @click="submit"
              >
                Settle payment
              </SeButton>
            </div>
          </div>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import BillingSuccessful from '@/components/billing/BillingSuccessful'
import PaymentDetail from '@/components/payment/PaymentDetail'
import ModeOfPayment from '@/components/payment/ModeOfPayment'
import modalMixin from '@/mixins/modal'
import { required, minValue } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import paymentMixin from '@/mixins/payment'

export default {
  name: 'ViewBillingDetailsModal',

  components: {
    BillingSuccessful,
    PaymentDetail,
    ModeOfPayment,
  },

  mixins: [modalMixin, paymentMixin],

  data() {
    return {
      bill: {
        patient: {},
      },
      done: false,
      form: {
        transaction_type: '',
      },
      isExportLoading: false,
      loading: false,
    }
  },

  events: {
    'billing:detail:open': function(data){
      this.visible = true
      this.bill = data.params[0]
      this.bill.patient = {
        mobile: this.bill.patient_mobile,
        fullName: this.bill.patient_name,
      }
      this.getPatientAccounts({ id: this.bill.patientid })
      this.form.transaction_type = this.$global.USER_ACCOUNT_TYPE
    },
    'billing:detail:close': function(){
      this.close()
    },
  },

  validations() {
    if(this.form.transaction_type === 'cash'){
      return {
        form: {
          amount: { minValue: minValue(this.bill.charge) },
        },
      }
    } else {
      return {
        form: {
          account_id: { required },
        },
      }
    }
  },

  computed: {
    ...mapGetters({
      userAccounts: 'billing/userAccounts',
    }),
  },

  methods: {
    ...mapActions({
      getPatientAccounts: 'billing/getPatientAccounts',
      exportBill: 'billing/exportBill',
      payForService: 'billing/payForService',
      corporatePayForService: 'billing/corporatePayForService',
      topUpUserAccount: 'billing/topUpUserAccount',
    }),

    async confirm(){
      await this.getPatientAccounts({ id: this.bill.patientid })
      this.settle = true
    },

    async exportBillItem() {
      try {
        this.isExportLoading = true
        await this.exportBill(this.bill.invoice_id)

        this.isExportLoading = false
      } catch (error) {
        this.isExportLoading = false
      }
    },

    submit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.error(this.form.transaction_type === 'cash' ? 'Please enter a valid amount' : 'Please select an account')
        return
      }

      // if (this.form.transaction_type === 'cash') {
      //   this.receiveCash()
      //   return
      // }

      this.pay()

      // this.settleBill()
    },

    // async settleBill() {
    //   try {
    //     this.loading = true

    //     this.form.transaction_type === this.$global.USER_ACCOUNT_TYPE ?
    //       await this.payForService({
    //         patientId: this.bill.patientid,
    //         chargeItemId: this.bill.id,
    //         params: { ...this.form, transaction_type: this.$global.USER_ACCOUNT_TYPE },
    //       })
    //       :
    //       await this.corporatePayForService({
    //         patientId: this.bill.patientid,
    //         chargeItemId: this.bill.id,
    //         params: {
    //           paymentType: 'corporate',
    //           paymentDetails: {
    //             prepaidAccountId: this.form.account_id,
    //             providerId: this.$providerId,
    //           },
    //         },
    //       })

    //     this.$toast.open('Bill successfully settled')

    //     this.done = true
    //     this.loading = false
    //   } catch (error) {
    //     this.loading = false
    //   }
    // },

    // async receiveCash() {
    //   if (!this.userAccounts.length) {
    //     this.$toast.error({ message: 'The user needs an account to proceed'})
    //     return
    //   }
    //   this.loading = true
    //   try {
    //     await this.topUpUserAccount({
    //       patientId: this.bill.patientid,
    //       walletId: this.userAccounts[0].uuid,
    //       params: {
    //         amount: this.form.amount,
    //         currency: this.userAccounts[0].currency,
    //         cashier: this.$providerId,
    //         transaction_type: this.$global.CASH_TYPE,
    //         name: this.bill.patientname,
    //         reference_type: 'CASH_DEPOSIT',
    //       },
    //     })
    //     this.form.account_id = this.userAccounts[0].uuid
    //     await this.payForService({
    //       patientId: this.bill.patientid,
    //       chargeItemId: this.bill.id,
    //       params: { ...this.form, amount: this.bill.charge, transaction_type: this.$global.USER_ACCOUNT_TYPE},
    //     })
    //     this.$toast.open('Bill successfully settled')
    //     this.done = true
    //     this.loading = false
    //   } catch (error) {
    //     this.loading = false
    //   }
    // },
  },
}
</script>
