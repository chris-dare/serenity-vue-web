<template>
  <div class="space-y-2 divide-y">
    <MultiSelect
      v-model="localValue.account_id"
      :options="insuranceAccounts"
      title="Insurance accounts"
      track-by="uuid"
      label="description"
      custom-field="uuid"
      :multiple="false"
      :error-message="$utils.validateRequiredField(v, 'account_id')"
      @input="onInput"
    >
      <p slot="noOptions">This patient has no insurance account</p>
      <div
        v-if="!hideAddInsurance"
        slot="afterList"
        class="p-4 w-full"
      >
        <SeButton
          full
          variant="secondary-outline"
          @click="$trigger('insurance:add:open', localValue.patient || patient)"
        >
          Add new insurance account
        </SeButton>
      </div>
    </MultiSelect>

    <div
      v-if="isCopayment"
      class="py-6 space-y-6"
    >
      <div
        v-if="selected.coverage"
        class="space-y-1"
      >
        <p class="text-secondary">The selected insurance policy is a {{ selected.coverage.contribution_type }} plan, select the payment method for remaining amount of </p>
        <h1 class="text-3xl font-bold">{{ this.$currency(amountLeft, localValue.currency).format() }}</h1>
      </div>
      <MultiSelect
        v-model="localValue.copayment_info.transaction_type"
        label="label"
        track-by="value"
        custom-field="value"
        title="Select payment method"
        :options="options"
      />

      <PaymentTypeSelector
        v-model="localValue.copayment_info"
        :v="v"
        :total="amountLeft"
        :selected="localValue.copayment_info.transaction_type"
        v-bind="$attrs"
        :patient="patient"
      />
    </div>
  </div>
</template>

<script>
import modelMixin from '@/mixins/model'
import { mapGetters } from 'vuex'

export default {
  name: 'PaymentInsuranceAccounts',

  mixins: [modelMixin],

  props: {
    v: {
      type: Object,
      default: () => {},
    },

    hideAddInsurance: {
      type: Boolean,
      default: false,
    },

    patient: {
      type: Object,
      default: null,
    },

    total: {
      type: [String, Number],
      default: 0.00,
    },
  },

  data() {
    return {
      options:[
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
          label: 'Cash',
          description: 'Pay using patient personal account',
          type: 'cash',
          value: this.$global.CASH_TYPE,
        },
      ],
      isCopayment: false,
    }
  },

  computed: {
    ...mapGetters({
      insuranceAccounts: 'billing/insuranceAccounts',
    }),

    selected() {
      if (!this.localValue.account_id) return {}
      return this.insuranceAccounts.find(insuranceAccount => insuranceAccount.uuid === this.localValue.account_id)
    },

    insuranceType() {
      if (!this.selected?.coverage?.contribution_type) return this.$global.COPAY
      return this.selected.coverage.contribution_type
    },

    amountLeft() {
      if (!this.selected.coverage) return 0
      const contributionValue = parseFloat(this.selected.coverage.contribution_value)
      let amount = this.insuranceType === this.$global.COINSURANCE ?
        (contributionValue / 100) * parseFloat(this.total) :
        contributionValue

      // check to make sure that the value isn't greater than the total
      if (amount > this.total) {
        amount = this.total
      }
      return amount > 0 ? amount : 0
    },

    hasToTopUp() {
      return this.amountLeft > 0
    },
  },

  created() {
    if (this.localValue?.copayment_info?.coverage) {
      this.isCopayment = true
    }
  },

  methods: {
    customLabel (value) {
      return `${value.description || '-' } - ${this.$currency(value.balance, value.currency).format()}`
    },

    onInput() {
      this.v.$touch()
      
      if (this.hasToTopUp) {
        this.isCopayment = true
        this.localValue.copayment_info = {
          transaction_type: this.$global.CASH_TYPE,
        }
      } else {
        this.isCopayment = false
        this.localValue.copayment_info = null
      }

      this.v.$reset()
    },
  },
}
</script>
