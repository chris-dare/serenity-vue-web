<template>
  <div v-if="$userCan('bills.acceptcash.write')">
    <p

      class="text-secondary text-sm"
    >
      Patient should pay <span class="text-lg font-semibold">{{ $currency(total).format() }}</span> to cashier
    </p>
    <div class="mt-2 grid grid-cols-6 items-end">
      <cv-text-input
        v-model="localValue.amount"
        type="number"
        label="Amount Received"
        class="col-span-5"
        @input="v.$touch()"
      />
      <CurrencySelect v-model="localValue.currency" />

      <p
        v-if="false"
        class="text-secondary"
      >
        Balance: {{ remainingBalance }}
      </p>

      <p
        v-if="$utils.validateRequiredField(v, 'amount') || isValueInvalid"
        class="error col-span-6"
      >
        {{ $utils.validateRequiredField(v, 'amount') || `Amount should not be less than ${total}` }}
      </p>
    </div>
  </div>
  <div v-else>
    <p>You do not have permission to receive cash</p>
  </div>
</template>

<script>
import modelMixin from '@/mixins/model'

export default {
  name: 'PaymentCash',

  mixins: [modelMixin],

  props: {
    total: {
      type: [String, Number],
      default: 0.00,
    },
    v: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    isValueInvalid() {
      return Number(this.localValue.amount) < Number(this.total)
    },

    remainingBalance() {
      return 0
    },
  },

}
</script>
