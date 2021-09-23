<template>
  <SeForm>
    <PaymentUserAccounts
      v-if="selected === $global.USER_ACCOUNT_TYPE"
      v-model="localValue"
      :v="v"
      v-bind="$attrs"
    />
    <PaymentCorporateAccounts
      v-else-if="selected === $global.CORPORATE_ACCOUNT_TYPE"
      v-model="localValue"
      :v="v"
    />
    <PaymentMomo
      v-else-if="selected === 'mobile-money'"
      v-model="localValue"
    />
    <PaymentCash
      v-else-if="selected === 'cash'"
      v-model="localValue"
      :v="v"
      v-bind="$attrs"
    />
    <div
      v-else-if="selected === 'card'"
      class="grid grid-cols-2 gap-4 mt-8"
    >
      <cv-text-input
        v-model="localValue.number"
        class="inherit-full-input"
        type="text"
        label="Card Number"
        placeholder="0000 - 0000 - 0000 - 0000"
      />
      <cv-text-input
        v-model="localValue.name"
        class="inherit-full-input"
        type="text"
        label="Name on Card"
        placeholder="James Baduor"
      />
      <cv-text-input
        v-model="localValue.exp"
        class="inherit-full-input"
        label="Expiration (mm/yy)"
        type="text"
        placeholder="12/20"
      />
      <cv-text-input
        v-model="localValue.cvc"
        class="inherit-full-input"
        type="text"
        label="CVC"
      />
    </div>
  </SeForm>
</template>

<script>
import PaymentUserAccounts from '@/components/payment/PaymentUserAccounts'
import PaymentCorporateAccounts from '@/components/payment/PaymentCorporateAccounts'
import PaymentMomo from '@/components/payment/PaymentMomo'
import PaymentCash from '@/components/payment/PaymentCash'
import modelMixin from '@/mixins/model'

export default {
  name: 'PaymentTypeSelector',

  components: { PaymentUserAccounts, PaymentMomo, PaymentCorporateAccounts, PaymentCash },

  mixins: [modelMixin],

  props: {
    selected: {
      type: String,
      default: 'user-account',
    },

    v: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
