<template>
  <BaseModal
    :name="name"
    @closed="close"
  >
    <template>
      <p class="text-lg font-semibold">{{ label }}</p>
      <component
        :is="stepComponent"
        v-model="form"
        :bills="patientBills"
        :show-check="showCheck"
        :v="$v"
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
            @click="next"
          >
            {{ nextLabel }}
          </SeButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import modalMixin from '@/mixins/modal'
import BillingTopUpStepOne from '@/components/billing/topup/BillingTopUpStepOne'
import BillingTopUpStepTwo from '@/components/billing/topup/BillingTopUpStepTwo'
import BillingTopUpReceivePayment from '@/components/billing/topup/BillingTopUpReceivePayment'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { required, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapGetters, mapState } from 'vuex'
import BillingAPI from '@/api/billing'
// import pick from 'lodash/pick'
import paymentMixin from '@/mixins/payment'

export default {
  name: 'BillingTopUpModal',

  components: { BillingTopUpStepOne, BillingTopUpStepTwo, BillingTopUpReceivePayment },

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
      label: 'Top Up Accountount',
      showCheck: false,
      type: 'receive',
      name: 'billing-topup-modal',
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
        2: this.type === 'receive' ? 'BillingTopUpReceivePayment' : 'BillingTopUpStepTwo',
      }

      return steps[this.step]
    },

    nextLabel() {
      return this.step === 1 ? 'Next: payment' : this.label
    },

    canPayForBills() {
      if (this.type !== 'receive' || this.step === 1) return true
      if (!this.patientBills.length) return false
      return this.type === 'receive' && this.step === 2 
      // && (this.totalUserBalance > this.$utils.getTotalValue(this.form.selectedBills, 'charge'))
    },
  },

  events: {
    'billing:topup:open': function(){
      this.open()
      this.label = 'Top Up Account'
      this.showCheck = false
      this.type = 'topup'
    },

    'billing:receive:open': function(){
      this.open()
      this.label = 'Receive Payment'
      this.showCheck = true
      this.type = 'receive'
    },

    'billing:topup:open:two': function(data){
      this.step = 2
      this.form = { 
        patient: data.params[0], 
        payment: {
          currency: 'GHS',
          transaction_type: this.$global.CASH_TYPE,
          reference_type: 'CASH_DEPOSIT',
        },
      }
      this.initPaymentStep(data.params[0].id)
      this.open()
      this.showCheck = false
      this.label = 'Top Up Account'
      this.type = 'topup'
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
      if (this.form.payment.transaction_type !== 'cash') {
        form = Object.assign(form, {
          payment: {
            account_id: { required },
          },
        })
      }

      if(this.form.payment.transaction_type === 'cash'){
        form = Object.assign(form, {
          payment: {
            amount: { required },
            currency: { required },
          },
        })
      }

      if (this.type === 'receive') {
        form = Object.assign(form, {
          selectedBills: {required, minLength: minLength(1)},
        })
      }
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

      if (this.type === 'receive') {
        await this.payForPendingBills()
        return
      }

      this.save()
    },

    async initPaymentStep(id) {
      this.form.selectedBills = []
      this.getPatientAccounts({ id })
      const { data } = await BillingAPI.patientBills(this.$providerId, id, { status: 'billable' })
      this.patientBills = data?.results
    },

    async save() {
      this.loading = true
      try {
        this.form.payment.cashier = this.provider.practitionerRoleId
        await this.topUpUserAccount({
          patientId: this.form.patient.uuid,
          walletId: this.form.patient.payment_methods.corporate[0] ? this.form.patient.payment_methods.corporate[0].uuid : '',
          params: this.form.payment,
          location: this.$locationId,
        })

        this.loading = false
        this.$toast.success('Payment received successfully')


        this.close()
        this.$resetData()

      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      }
    },

    async payForPendingBills() {
      try {
        this.loading = true
        await this.payForMultipleChargeItems({
          patient: this.form.patient.uuid,
          charge_items: this.form.selectedBills.map(b => b.id),
          payment_info: this.getPaymentParams(this.form.payment),
          location: this.$locationId,
        })

        
        this.$toast.success('Payment received successfully')


        this.close()
        this.$resetData()
      } catch (error) {
        // 
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
      } finally {
        this.loading = false
      }
      

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
