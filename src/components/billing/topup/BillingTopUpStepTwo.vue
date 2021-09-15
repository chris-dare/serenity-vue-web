<template>
  <SeForm>
    <div class="border-b border-secondary flex justify-between items-center">
      <InfoImageBlock
        size="large"
        :label="localValue.patient.name"
      >
        <div class="space-y-1">
          <p class="text-sm text-secondary">{{ localValue.patient.gender_age_description }}</p>
          <p class="text-sm text-secondary">MR No. {{ localValue.patient.mr_number }}</p>
        </div>
      </InfoImageBlock>

      <div>
        <p class="text-sm text-secondary">Current balance</p>
        <p
          class="text-2xl font-semibold"
          :class="{'text-red-500': parseInt(totalUserBalance) === 0}"
        >
          {{ $currency(totalUserBalance).format() }}
        </p>
      </div>
    </div>

    <div class="space-y-4 py-4">
      <p>What is the preferred payment method?</p>

      <div class="grid grid-cols-6 items-end">
        <FormInput
          v-model="localValue.payment.amount"
          placeholder="Enter the amount to load"
          label="Enter amount"
          type="number"
          class="se-input-gray col-span-5"
          required
        />
        <MultiSelect
          v-model="localValue.payment.currency"
          :options="currencies"
          track-by="code"
          label="display"
          custom-field="code"
          title="Currency"
        />
      </div>

      <PaymentMomo
        v-if="localValue.payment.transaction_type === 'MOBILE_MONEY'"
        v-model="localValue.payment"
      />

      <FormInput
        v-model="localValue.payment.name"
        label="Name of Depositor"
        placeholder="Enter the name of the depositor"
        required
      />
    </div>

    <div class="space-y-4 mt-6">
      <div class="flex justify-between items-center">
        <p class="font-bold">
          Pending bills
          <span v-if="showCheck">(Click on pending bills to pay for it)</span>
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
        v-if="showCheck"
        class="flex items-center justify-end"
      >
        <div>
          <p class="text-right">{{ $currency($utils.getTotalValue(localValue.selectedBills, 'charge')).format() }}</p>
          <p class="text-secondary text-xs"> Total Selected Bill </p>
        </div>
      </div>
    </div>
  </SeForm>
</template>

<script>
import PaymentMomo from '@/components/payment/PaymentMomo'
import modelMixin from '@/mixins/model'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'BillingTopUpStepTwo',

  components: { PaymentMomo },

  mixins: [modelMixin],

  props: {
    bills: {
      type: Array,
      default: () => [],
    },
    showCheck: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      options: [
        { display: 'Cash', code: 'CASH' },
        { display: 'Mobile Money', code: 'MOBILE_MONEY' },
      ],
      patientChargeItems: [],
    }
  },

  computed: {
    ...mapState({
      currencies: state => state.resources.currencies,
    }),
    ...mapGetters({
      totalUserBalance: 'billing/totalUserBalance',
    }),

    hasPendingBills() {
      return this.pendingBills.length > 0
    },

    pendingBills() {
      return this.bills.filter(b => b.status == 'billable' && b.invoice_id)
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
