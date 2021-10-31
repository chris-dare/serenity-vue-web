<template>
  <SeForm>
    <div class="space-y-6">
      <div class="border-b border-secondary flex justify-between items-center">
        <InfoImageBlock
          size="large"
          :label="localValue.patient.name"
          :url="localValue.patient.photo"
        >
          <div class="space-y-1">
            <p class="text-sm text-secondary">{{ localValue.patient.gender_age_description }}</p>
            <p class="text-sm text-secondary">MR No. {{ localValue.patient.mr_number }}</p>
          </div>
        </InfoImageBlock>
      </div>

      <div>
        <ModeOfPayment
          v-model="localValue.payment"
          show-cash-options
          :v="v"
          :total="totalSelectedBills"
          :patient="localValue.patient"
        />
      </div>

      <div class="space-y-4 mt-6">
        <div class="flex justify-between items-center">
          <p class="font-bold">
            Pending bills
            <span>(Click on pending bills to pay for them)</span>
          </p>

          <div>
            <p class="text-right">{{ $currency($utils.getTotalValue(pendingBills, 'charge')).format() }}</p>
            <p class="text-secondary text-xs"> Total Pending Bill </p>
          </div>
        </div>

        <div>
          <p v-if="!hasPendingBills">Patient has no pending bills</p>
          <div
            v-for="(bill, index) in pendingBills"
            :key="bill.id"
            class="flex space-x-2 cursor-pointer p-4"
            :class="{'bg-serenity-primary-highlight bg-opacity-20': localValue.selectedBills.find(b => b.id === bill.id)}"
            @click="manageCheck(bill)"
          >
            <p>{{ index + 1 }}.</p>
            <div class="flex-1 flex items-center justify-between">
              <div>
                <p>{{ bill.service_or_product_name }}</p>
                <p class="text-secondary text-xs"> Service / Product </p>
              </div>
              <div class="text-right">
                <p class="">{{ $currency(bill.charge).format() }} </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex items-center justify-end"
        >
          <div>
            <p class="text-right">{{ $currency($utils.getTotalValue(localValue.selectedBills, 'charge')).format() }}</p>
            <p class="text-secondary text-xs"> Total Selected Bill </p>
          </div>
        </div>
      </div>
    </div>
  </SeForm>
</template>

<script>
import modelMixin from '@/mixins/model'
import ModeOfPayment from '@/components/payment/ModeOfPayment'

export default {
  name: 'BillingTopUpReceivePayment',

  components: {ModeOfPayment},

  mixins: [modelMixin],

  props: {
    v: {
      type: Object,
      default: null,
    },

    bills: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    hasPendingBills() {
      return this.pendingBills.length > 0
    },

    pendingBills() {
      return this.bills.filter(b => b.status == 'billable')
    },

    totalSelectedBills() {
      return this.$utils.getTotalValue(this.localValue.selectedBills, 'charge')
    },
  },

  methods: {
    manageCheck(bill) {
      let available = this.localValue.selectedBills.find(b => b.id == bill.id)
      if (available) {
        this.localValue.selectedBills = this.localValue.selectedBills.filter(b => b.id !== bill.id)
      } else {
        this.localValue.selectedBills.push(bill)
      }
    },
  },
}
</script>
