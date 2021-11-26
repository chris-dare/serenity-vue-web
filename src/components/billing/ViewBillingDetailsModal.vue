<template>
  <BaseModal
    :name="name"
    height="auto"
    scrollable
  >
    <Tag
      slot="title"
      show-icon
      :variant="getStatusVariant(bill.status)"
      class="cursor-pointer"
    >
      {{ bill.status }}
    </Tag>
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
          :show-cart="false"
        />
        <ModeOfPayment
          v-if="canMakePayment"
          v-model="form"
          :v="$v"
          show-cash-options
          :total="bill.charge"
          :patient="patient"
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
              variant="secondary"
              :loading="printLoading"
              @click="print"
            >
              Print
            </SeButton>
            <SeButton
              v-if="canMakePayment"
              :loading="loading"
              @click="submit"
            >
              Settle payment
            </SeButton>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BillingSuccessful from '@/components/billing/BillingSuccessful'
import PaymentDetail from '@/components/payment/PaymentDetail'
import ModeOfPayment from '@/components/payment/ModeOfPayment'
import modalMixin from '@/mixins/modal'
import { required, minValue } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import paymentMixin from '@/mixins/payment'
import PatientAPI from '@/api/patients'

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
      form: {},
      isExportLoading: false,
      loading: false,
      printLoading: false,
      type: '',
      patient: null,
      name: 'view-billing-details-modal',
    }
  },

  events: {
    'billing:detail:open': async function(data){
      this.$modal.show(this.name)
      this.bill = data.params[0]
      this.bill.patient = {
        mobile: this.bill.patient_mobile,
        fullName: this.bill.patient_name,
      }
      this.getPatientAccounts({ id: this.bill.patientid })
      this.type = this.bill.line_items ? 'invoice' : 'charge'
      const patient = await PatientAPI.get(this.$providerId, this.bill.patientid)
      this.patient = patient.data.data
    },
    'billing:detail:close': function(){
      this.$modal.hide(this.name)
      this.close()
    },
  },

  validations() {
    if(this.form.transaction_type === 'cash'){
      return {
        form: {
          amount: { required, minValue: minValue(this.bill.charge) },
          currency: { required },
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
      getStatusVariant: 'billing/getStatusVariant',
    }),

    canMakePayment() {
      return !this.settled && this.bill.charge && this.bill.status === 'billable'
    },
  },

  methods: {
    ...mapActions({
      getPatientAccounts: 'billing/getPatientAccounts',
      exportBill: 'billing/exportBill',
      payForService: 'billing/payForService',
      corporatePayForService: 'billing/corporatePayForService',
      topUpUserAccount: 'billing/topUpUserAccount',
      resetPatientAccounts: 'billing/resetPatientAccounts',
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
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.isExportLoading = false
      }
    },

    submit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.error(this.getValidationMessages(this.$v.form))
        return
      }

      const bills = this.type === 'invoice' ? this.bill.line_items : [this.bill]

      this.payChargeItems(bills)
    },

    afterCloseFunction() {
      this.resetPatientAccounts()
    },
  },
}
</script>
