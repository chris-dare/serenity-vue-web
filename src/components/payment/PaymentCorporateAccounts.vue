<template>
  <div class="space-y-2">
    <MultiSelect
      v-model="localValue.account_id"
      :options="corporateAccounts"
      title="Corporate accounts"
      track-by="id"
      :custom-label="customLabel"
      custom-field="id"
      preselect
      :multiple="false"
      :error-message="$utils.validateRequiredField(v, 'account_id')"
      @input="v.$touch()"
    >
      <p slot="noOptions">This patient has no corporate wallet</p>
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
  name: 'PaymentCorporateAccounts',

  mixins: [modelMixin],

  props: {
    v: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    ...mapGetters({
      corporateAccounts: 'billing/corporateAccounts',
    }),

    balance() {
      return this.corporateAccounts.find(el => el.id === this.localValue.account_id)?.balance
    },
  },

  methods: {
    customLabel (value) {
      return `${value.description || '-' } - ${this.$currency(value.balance, value.currency).format()}`
    },
  },
}
</script>
