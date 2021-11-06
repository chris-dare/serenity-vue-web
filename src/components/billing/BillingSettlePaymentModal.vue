<template>
  <cv-modal
    close-aria-label="Close"
    :visible="visible"
    size="small"
    class="se-no-title-modal"
    @modal-hidden="close"
  >
    <template slot="content">
      <div class="space-y-4">
        <p class="text-lg font-semibold">Settle payment -  {{ bill.patientname }}</p>
        <div
          v-if="type === 'bill'"
          class="flex justify-between items-center"
        >
          <p>{{ bill.service_or_product_name }}</p>
          <p>{{ $currency(bill.charge).format() }}</p>
        </div>
        <div v-if="type === 'invoice'">
          <div
            v-for="(line, index) in bill.line_items"
            :key="index"
            class="flex justify-between items-center"
          >
            <p>{{ line.service_or_product_name }}</p>
            <p>{{ $currency(line.charge).format() }}</p>
          </div>
        </div>

        <div class="flex justify-end">
          <div>
            <p class="text-secondary text-sm">Total cost</p>
            <p class="text-2xl font-semibold">{{ $currency(bill.charge).format() }}</p>
          </div>
        </div>

        <ModeOfPayment
          v-if="!settled"
          v-model="form"
          show-cash-options
          :v="$v"
          :total="bill.charge"
          :patient="patient"
        />

        <div class="flex justify-between pt-12">
          <SeButton
            variant="secondary-outline"
            @click="close"
          >
            Cancel
          </SeButton>
          <div class="flex items-center space-x-2">
            <SeButton
              :to="{ name: currentWorkspacePatientPage, params: { id: bill.patientid }}"
              variant="secondary"
            >
              View patient profile
            </SeButton>
            <SeButton
              v-if="settled"
              :loading="printLoading"
              @click="print"
            >
              Print
            </SeButton>
            <SeButton
              v-else
              :icon="icon"
              :loading="loading"
              @click="submit"
            >
              Settle payment
            </SeButton>
          </div>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import modalMixin from '@/mixins/modal'
import paymentMixin from '@/mixins/payment'
import ModeOfPayment from '@/components/payment/ModeOfPayment'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapActions, mapGetters, mapState } from 'vuex'
import { required, minValue } from 'vuelidate/lib/validators'
import PatientAPI from '@/api/patients'

export default {
  name: 'BillingSettlePaymentModal',

  components: {ModeOfPayment},

  mixins: [modalMixin, paymentMixin],

  data() {
    return {
      bill: {},
      form: {
        transaction_type: '',
      },
      icon: ChevronRight,
      selected: 'user',
      loading: false,
      printLoading: false,
      type: 'bill',
      patient: null,
    }
  },

  events: {
    'billing:settle:open': async function(data){
      this.visible = true
      this.bill = data.params[0]
      this.getPatientAccounts({ id: this.bill.patientid })
      this.form.transaction_type = this.$global.USER_ACCOUNT_TYPE
      this.type = 'bill'
      const patient = await PatientAPI.get(this.$providerId, this.bill.patientid)
      this.patient = patient.data.data
    },
    'billing:invoices:settle:open': async function(_ev, { invoice }){
      this.bill = {
        ...invoice,
        patientname: invoice.patient_detail.name,
        charge: invoice.total_gross_value,
        patientid: invoice.patient_detail.id,
      }
      await this.getPatientAccounts({ id: this.bill.patientid })
      this.form.transaction_type = this.$global.USER_ACCOUNT_TYPE
      this.form.amount = this.bill.charge
      this.visible = true
      this.type = 'invoice'
      const patient = await PatientAPI.get(this.$providerId, this.bill.patientid)
      this.patient = patient.data.data
    },
    'billing:settle:close': function(){
      this.close()
    },
  },

  validations() {
    if (this.form.transaction_type !== 'cash') {
      return {
        form: {
          account_id: { required },
        },
      }
    }

    if(this.form.transaction_type === 'cash'){
      return {
        form: {
          amount: { required, minValue: minValue(this.bill.charge) },
          currency: { required },
        },
      }
    }
  },

  computed: {
    ...mapState({
      provider: state => state.auth.provider,
    }),

    ...mapGetters({
      currentWorkspacePatientPage: 'global/currentWorkspacePatientPage',
      userAccounts: 'billing/userAccounts',
    }),
  },

  methods: {
    ...mapActions({
      payForService: 'billing/payForService',
      payForInvoice: 'billing/payForInvoice',
      corporatePayForService: 'billing/corporatePayForService',
      getPatientAccounts: 'billing/getPatientAccounts',
      topUpUserAccount: 'billing/topUpUserAccount',
      resetPatientAccounts: 'billing/resetPatientAccounts',
    }),

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
