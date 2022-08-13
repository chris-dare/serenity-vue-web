<template>
  <BaseModal
    :name="name"
    title="Cancel Bill"
    @closed="close"
  >
    <template>
      <div>
        <div class="space-y-6">
          <PaymentDetail
            :details="bill"
            label="Payment Transaction"
            hide-total
            :show-cart="false"
          />
          <FormInput
            v-model="form.cancelation.reason"
            type="textarea"
            placeholder="Enter reason of cancellation"
            label="Reason of cancellation"
            class="w-full"
          />

          <div
            v-if="bill.cancelation" 
            class="grid grid-cols-2 items-center py-4 gap-6"
          >
            <div>
              <p>{{ bill.cancelation.requested_by_name || '-' }}</p>
              <p class="text-secondary text-xs"> Requested by</p>
            </div>
            <div>
              <p>{{ $date.formatDate(bill.cancelation.requested_date_time, 'dd MMM, yyyy hh:mm a') || '-' }}</p>
              <p class="text-secondary text-xs"> Requested date </p>
            </div>
            <div>
              <p>{{ bill.cancelation.approved_by_name || '-' }}</p>
              <p class="text-secondary text-xs"> Approved by</p>
            </div>
            <div>
              <p>{{ $date.formatDate(bill.cancelation.approved_date_time, 'dd MMM, yyyy hh:mm a') || '-' }}</p>
              <p class="text-secondary text-xs"> Approved date </p>
            </div>
            <div>
              <p>{{ bill.cancelation.canceled_by_name || '-' }}</p>
              <p class="text-secondary text-xs"> Cancelled by</p>
            </div>
            <div>
              <p>{{ $date.formatDate(bill.cancelation.canceled_date_time, 'dd MMM, yyyy hh:mm a') || '-' }}</p>
              <p class="text-secondary text-xs"> Cancelled date </p>
            </div>
          </div>

          <div class="flex items-center justify-between mt-4">
            <div class="flex items-center space-x-2">
              <SeButton
                variant="secondary"
                @click="close"
              >
                Cancel
              </SeButton>
            </div>

            <div 
              v-if="bill.status === 'cancelation-requested'"
              class="flex space-x-2" 
            >
              <SeButton
                variant="secondary"
                :loading="printLoading"
                @click="print"
              >
                Print
              </SeButton>
              <SeButton
                v-if="$userCan('bills.approvecancelation.write')"
                variant="warning"
                :loading="loading"
                @click="approveRequest"
              >
                Approve Request
              </SeButton>
            </div>

            <div
              v-else-if="bill.status === 'cancelation-approved'" 
              class="flex space-x-2"
            >
              <SeButton
                variant="secondary"
                :loading="printLoading"
                @click="print"
              >
                Print
              </SeButton>
              <SeButton
                v-if="$userCan('bills.finishcancelation.write')"
                variant="danger"
                :loading="loading"
                @click="cancelItemBill"
              >
                Cancel Bill
              </SeButton>
            </div>

            <div 
              v-else 
              class="flex space-x-2"
            >
              <SeButton
                variant="secondary"
                :loading="printLoading"
                @click="print"
              >
                Print
              </SeButton>
              <SeButton
                v-if="$userCan('bills.requestcancelation.write')"
                variant="primary"
                :loading="loading"
                @click="submitRequest"
              >
                Submit request
              </SeButton>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import PaymentDetail from '@/components/payment/PaymentDetail'
import modalMixin from '@/mixins/modal'
import { mapActions, mapGetters } from 'vuex'
import paymentMixin from '@/mixins/payment'
import PatientAPI from '@/api/patients'

export default {
  name: 'CancelBillingModal',

  components: {
    PaymentDetail,
  },

  mixins: [modalMixin, paymentMixin],

  data() {
    return {
      bill: {
        patient: {},
        cancelation : {
          reason: '',
        },
      },
      done: false,
      form: {
        transaction_type: '',
        cancelation: {
          reason: '',
        },
      },
      isExportLoading: false,
      loading: false,
      printLoading: false,
      type: '',
      patient: null,
      params: {},
      name: 'cancel-billing-modal',
    }
  },

  events: {
    'billing:cancel:open': async function(data){
      this.open()
      this.bill = data.params[0].bill
      this.params = data.params[0].params
      this.bill.patient = {
        mobile: this.bill.patient_mobile,
        fullName: this.bill.patient_name,
      }
      this.getPatientAccounts({ id: this.bill.patientid })
      this.form.transaction_type = this.$global.USER_ACCOUNT_TYPE
      this.form.cancelation.reason = this.bill?.cancelation?.reason || ''
      this.type = this.bill.line_items ? 'invoice' : 'charge'
      const patient = await PatientAPI.get(this.$providerId, this.bill.patientid)
      this.patient = patient.data.data
    },
    'billing:cancel:close': function(){
      this.close()
    },
  },

  computed: {
    ...mapGetters({
      userAccounts: 'billing/userAccounts',
    }),

    canMakePayment() {
      return !this.settled && this.bill.charge
    },
  },

  methods: {
    ...mapActions({
      getPatientAccounts: 'billing/getPatientAccounts',
      requestCancelBill: 'billing/requestCancelBill',
      approveCancelBill: 'billing/approveCancelBill',
      cancelBill: 'billing/cancelBill',
      exportBill: 'billing/exportBill',
      getBills: 'billing/getChargeItems',
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
        await this.exportBill({id:this.bill.invoice_id})

        this.isExportLoading = false
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.isExportLoading = false
      }
    },

    async submitRequest() {
      try {
        this.loading = true
        const data = await this.requestCancelBill({ charge: this.bill.id, action: 'request-charge-item-cancelation', reason: this.form.cancelation.reason})
        this.close()
        this.$toast.open({
          message: data.message,
        })
        this.getBills(this.params)
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      }
      this.loading = false
    },

    async approveRequest() {
      try {
        this.loading = true
        const data = await this.requestCancelBill({ charge: this.bill.id, action: 'approve-charge-item-cancelation-request', cancelation_request: this.bill.cancelation.uuid})
        this.close()
        this.$toast.open({
          message: data.message,
        })
        this.getBills(this.params)
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      }
      this.loading = false
    },

    async cancelItemBill() {
      try {
        this.loading = true
        const data = await this.requestCancelBill({ charge: this.bill.id, action: 'cancel-charge-item', cancelation_request: this.bill.cancelation.uuid})
        this.close()
        this.$toast.open({
          message: data.message,
        })
        this.getBills(this.params)
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      }
      this.loading = false
    },

    afterCloseFunction() {
      this.resetPatientAccounts()
    },
  },
}
</script>
