<template>
  <SeForm class="space-y-4">
    <p class="text-sm">What is the preferred payment method?</p>
    <div class="grid grid-cols-4 gap-4">
      <InfoLinkCard
        v-for="(type, index) in options"
        :key="index"
        :is-selected="localValue.transaction_type === type.value"
        :details="type"
        :type="type.type"
        @click="onClick(type)"
      />
    </div>
    <slot />

    <PaymentTypeSelector
      v-model="localValue"
      :v="v"
      :selected="localValue.transaction_type"
      v-bind="$attrs"
    />
  </SeForm>
</template>

<script>
import PaymentTypeSelector from '@/components/payment/PaymentTypeSelector'
import modelMixin from '@/mixins/model'

export default {
  name: 'ModeOfPayment',

  components: { PaymentTypeSelector },

  mixins: [modelMixin],

  props: {
    showCashOptions: {
      type: Boolean,
      default: false,
    },

    v: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    options() {
      let options = [
        {
          label: 'User Account',
          description: 'Select associated user account',
          type: 'user',
          value: this.$global.USER_ACCOUNT_TYPE,
        },
        {
          label: 'Corporate Account',
          description: 'Select associated corporate account',
          type: 'momo',
          value: this.$global.CORPORATE_ACCOUNT_TYPE,
        },
        {
          label: 'Insurance',
          description: 'Bills covered by third party insurance',
          type: 'insurance',
          value: this.$global.INSURANCE_TYPE,
        },
        {
          label: 'Cash',
          description: 'Pay using patient personal account',
          type: 'cash',
          value: this.$global.CASH_TYPE,
        },
      ]

      if (this.showCashOptions && this.$userCan('bills.acceptcash.write')) {
        options.push(
        // {
        //   label: 'Mobile Money',
        //   description: 'Select associated corporate account',
        //   type: 'phone',
        //   value: 'mobile-money',
        // })
        )
      }

      return options
    },
  },

  methods: {
    onClick(type) {
      this.$set(this, 'localValue', {
        ...this.localValue,
        transaction_type: type.value,
      })
    },
  },
}
</script>
