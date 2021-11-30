<template>
  <SeForm class="space-y-4">
    <p class="text-sm flex items-center">
      What is the preferred payment method?
      

      <cv-tooltip
        tip="You will only see payment methods that you have permission to access."
      >
        <Information class="ml-1 w-4" />
      </cv-tooltip>
    </p>
    <p v-if="hasNoOptions">
      You have no permissions to accept payments
    </p>
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
      :patient="patient"
    />
  </SeForm>
</template>

<script>
import PaymentTypeSelector from '@/components/payment/PaymentTypeSelector'
import Information from '@carbon/icons-vue/es/information/32'
import modelMixin from '@/mixins/model'

export default {
  name: 'ModeOfPayment',

  components: { PaymentTypeSelector, Information },

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

    patient: {
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
          hide: !this.$userCan('bills.acceptuseraccount.write'),
        },
        {
          label: 'Corporate Account',
          description: 'Select associated corporate account',
          type: 'momo',
          value: this.$global.CORPORATE_ACCOUNT_TYPE,
          hide: !this.$userCan('bills.acceptcorporate.write'),
        },
        {
          label: 'Insurance',
          description: 'Bills covered by third party insurance',
          type: 'insurance',
          value: this.$global.INSURANCE_TYPE,
          hide: !this.$userCan('bills.acceptinsurance.write'),
        },
        {
          label: 'Cash',
          description: 'Pay using patient personal account',
          type: 'cash',
          value: this.$global.CASH_TYPE,
          hide: !this.$userCan('bills.acceptcash.write'),
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

    hasNoOptions() {
      let availableOptions = this.options.find(option => !option.hide)
      return availableOptions.length === 0
    },
  },

  created() {
    if (!this.localValue?.transaction_type) {
      this.localValue.transaction_type = this.options.find(option => !option.hide)?.value
    }
    
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
