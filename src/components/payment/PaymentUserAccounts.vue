<template>
  <div class="space-y-2">
    <p
      v-if="isInsufficient"
      class="text-red-600 text-sm"
    >
      You have insufficient funds
    </p>
    <MultiSelect
      v-model="localValue.account_id"
      :options="userAccounts"
      title="User accounts"
      track-by="uuid"
      :custom-label="customLabel"
      custom-field="uuid"
      :multiple="false"
      :error-message="$utils.validateRequiredField(v, 'account_id')"
      @input="v.$touch()"
    >
      <p slot="noOptions">This patient has no user wallet</p>
    </MultiSelect>
    <div class="flex justify-end">
      <p class="text-serenity-primary text-sm">Available account balance <span class="text-lg font-semibold">{{ $currency(balance).format() }}</span></p>
    </div>
  </div>
</template>

<script>
import modelMixin from '@/mixins/model'
import { mapGetters } from 'vuex'
export default {
  name: 'PaymentUserAccounts',

  mixins: [modelMixin],

  props: {
    v: {
      type: Object,
      default: () => {},
    },
    total: {
      type: [String, Number],
      default: null,
    },
  },

  computed: {
    ...mapGetters({
      userAccounts: 'billing/userAccounts',
    }),

    balance() {
      return this.userAccounts.find(el => el.uuid === this.localValue.account_id)?.balance
    },

    isInsufficient() {
      if (!this.total) return false
      return parseFloat(this.balance) < parseFloat(this.total)
    },
  },

  methods: {
    customLabel (value) {
      return `${value.description || '-' } - ${this.$currency(value.balance, value.currency).format()}`
    },
  },
}
</script>
