<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    @modal-hidden="close"
  >
    <template slot="content">
      <p class="text-lg font-semibold">{{ label }}</p>
      <component
        :is="stepComponent"
        v-model="form"
        :bills="patientBills"
        :show-check="showCheck"
      />

      <div class="flex items-center justify-between mt-12">
        <SeButton
          variant="secondary-outline"
          @click="back"
        >
          Go back
        </SeButton>
        <div class="flex items-center space-x-2">
          <SeButton
            v-if="canPayForBills"
            :icon="icon"
            :loading="loading"
            :disabled="!form.selectedBills.length"
            @click="payForPendingBills($global.USER_ACCOUNT_TYPE)"
          >
            Pay for selected bills
          </SeButton>
          <SeButton
            :icon="icon"
            :loading="loading"
            @click="next"
          >
            {{ nextLabel }}
          </SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import modalMixin from '@/mixins/modal'
import BillingTopUpStepOne from '@/components/billing/topup/BillingTopUpStepOne'
import BillingTopUpStepTwo from '@/components/billing/topup/BillingTopUpStepTwo'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters, mapState } from 'vuex'
import BillingAPI from '@/api/billing'
// import pick from 'lodash/pick'
import paymentMixin from '@/mixins/payment'

export default {
  name: 'BillingTopUpModal',

  components: { BillingTopUpStepOne, BillingTopUpStepTwo },

  mixins: [modalMixin, paymentMixin],

  data() {
    return {
      step: 1,
      icon: ChevronRight,
      loading: false,
      form: {
        patient: {},
        payment: {
          currency: 'GHS',
          transaction_type: 'cash',
          reference_type: 'CASH_DEPOSIT',
        },
        selectedBills: [],
      },
      patientBills: [],
      label: 'Top Up Account',
      showCheck: false,
    }
  },

  computed: {
    ...mapState({
      provider: state => state.auth.provider,
    }),
    ...mapGetters({
      userAccounts: 'billing/userAccounts',
      totalUserBalance: 'billing/totalUserBalance',
    }),

    stepComponent() {
      let steps = {
        1: 'BillingTopUpStepOne',
        2: 'BillingTopUpStepTwo',
      }

      return steps[this.step]
    },

    nextLabel() {
      return this.step === 1 ? 'Next: payment' : this.label
    },

    canPayForBills() {
      if (!this.form.selectedBills.length) return false
      return this.showCheck && this.step === 2 && (this.totalUserBalance > this.$utils.getTotalValue(this.form.selectedBills, 'charge'))
    },
  },

  events: {
    'billing:topup:open': function(){
      this.visible = true
      this.label = 'Top Up Account'
      this.showCheck = false
    },

    'billing:receive:open': function(){
      this.visible = true
      this.label = 'Receive Payment'
      this.showCheck = true
    },

    'billing:topup:open:two': function(data){
      this.step = 2
      this.form = { patient:data.params[0], payment: {} }
      this.initPaymentStep(data.params[0].id)
      this.visible = true
      this.showCheck = false
      this.label = 'Top Up Account'
    },

    'billing:topup:close': function(){
      this.close()
    },
  },

  validations() {
    let form = {
      patient: {
        required,
      },
    }

    if (this.step === 2) {
      form = Object.assign(form, {
        payment: {
          amount: { required },
          name: { required },
        },
      })
    }

    return { form }
  },

  methods: {
    ...mapActions({
      getPatientAccounts: 'billing/getPatientAccounts',
      topUpUserAccount: 'billing/topUpUserAccount',
      payForInvoice: 'billing/payForInvoice',
    }),

    async next() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.error('Please fill all required fields')
        return
      }

      if (this.step === 1) {
        await this.initPaymentStep(this.form.patient.id)
        this.step ++
        return
      }

      if (!this.userAccounts.length) {
        this.$toast.error('The top up process requires a user account which this patient does not have.')
        return
      }

      this.save()
    },

    async initPaymentStep(id) {
      this.form.selectedBills = []
      this.getPatientAccounts({ id })
      const { data } = await BillingAPI.patientBills(this.$providerId, id)
      this.patientBills = data?.data
    },

    async save() {
      this.loading = true
      try {
        this.form.payment.cashier = this.provider.practitionerRoleId
        await this.topUpUserAccount({
          patientId: this.form.patient.id,
          walletId: this.userAccounts[0].uuid,
          params: this.form.payment,
        })

        await this.payForPendingBills()

      } catch (error) {
        this.loading = false
      }
    },

    async payForPendingBills() {
      for (const bill of this.form.selectedBills) {
        await this.payForInvoice(
          {
            patientId: bill.patientid,
            invoiceId: bill.invoice_id,
            params: this.getPaymentParams({...this.form.payment, transaction_type: this.$global.USER_ACCOUNT_TYPE, amount: bill.charge, account_id: this.userAccounts[0].uuid}),
          },
        )
      }

      this.loading = false
      this.$toast.success('Payment received successfully')


      this.close()
      this.$resetData()

    },

    back() {
      if (this.step === 1) {
        this.close()
      }

      this.step = 1
    },
  },
}
</script>
