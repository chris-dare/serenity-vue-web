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

        <div v-else>
          <div>
            <div class="divide-y divide-black divide-solid">
              <div class="w-full flex justify-center items-center flex-col space-y-1 mb-4">
                <img
                  class="w-32"
                  src="@/assets/img/qr.png"
                  alt=""
                >
                <p class="text-xl"> {{ bill.companyDetails.companyName }} </p>
                <p class="text-secondary text-xs"> {{ bill.companyDetails.location }} </p>
              </div>
              <div>
                <p class="text-lg font-bold pt-3"> Payment Receipt </p>
                <div class="flex items-center justify-between py-4">
                  <div>
                    <p>{{ bill.billInfo.createdBy || '-' }}</p>
                    <p class="text-secondary text-xs"> Created by </p>
                  </div>
                  <div>
                    <p>{{ $date.formatDate(bill.billInfo.created_at) || '-' }}</p>
                    <p class="text-secondary text-xs"> Created at </p>
                  </div>
                  <div>
                    <p>{{ bill.providerDetails.name || '-' }}</p>
                    <p class="text-secondary text-xs"> Provider </p>
                  </div>
                </div>
              </div>
              <div
                v-for="(transaction, index) in bill.transactions"
                :key="index"
                class="flex items-center justify-between pt-4 pb-7 border-b border-solid border-secondary"
              >
                <div>
                  <p>{{ transaction.transaction_type }}</p>
                  <p class="text-secondary text-xs"> Service / Product </p>
                </div>
                <div class="text-right">
                  <p class="text-xl font-bold">{{ $currency(transaction.amount).format() }} </p>
                  <p class="text-secondary text-xs"> Amount to be paid </p>
                </div>
              </div>

              <div
                class="flex items-center justify-end py-4"
              >
                <p class="text-secondary">Total <span class="text-primary text-xl font-semibold">{{ $currency(bill.billInfo.amount).format() }}</span> </p>
              </div>
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

            <div class="flex space-x-2">
              <SeButton
                variant="secondary"
                :loading="isExportLoading"
                @click="exportBillItem"
              >
                Export
              </SeButton>
              <SeButton
                v-if="bill.billInfo.status === 'open'"
                :loading="loading"
                @click="settleBill"
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
import modalMixin from '@/mixins/modal'
import { mapActions } from 'vuex'

export default {
  name: 'BillingCorporateSettlePayment',

  components: {
    BillingSuccessful,
  },

  mixins: [modalMixin],

  data() {
    return {
      bill: {
        billInfo: {},
        companyDetails: {},
        providerDetails: {},
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
    'corporate:settle:open': function(data){
      this.visible = true
      this.bill = data.params[0]
      this.form.transaction_type = this.$global.USER_ACCOUNT_TYPE
    },
    'corporate:settle:close': function(){
      this.close()
    },
  },

  methods: {
    ...mapActions({
      exportBill: 'billing/exportBill',
      corporateAccountSettle: 'billing/corporateAccountSettle',
    }),

    async exportBillItem() {
      try {
        this.isExportLoading = true
        await this.exportBill(this.bill.billInfo.id)
        this.isExportLoading = false
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.isExportLoading = false
      }
    },

    async settleBill() {
      try {
        this.loading = true
        const data =
          await this.corporateAccountSettle({
            corporateId: this.bill.billInfo.corporateId,
            billId: this.bill.billInfo.id,
            amount: this.bill.billInfo.amount,
          })

        this.$toast.open('Bill successfully settled' || data)

        this.done = true
        this.loading = false
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      }
    },
  },
}
</script>
