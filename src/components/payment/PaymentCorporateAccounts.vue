<template>
  <div class="space-y-2">
    <MultiSelect
      v-model="localValue.account_id"
      :options="formattedAccounts"
      title="Corporate accounts"
      track-by="uuid"
      :custom-label="customLabel"
      custom-field="uuid"
      preselect
      :multiple="false"
      :error-message="$utils.validateRequiredField(v, 'account_id')"
      @input="v.$touch()"
    >
      <template
        slot="option"
        slot-scope="{option}"
      >
        <div
          :class="{'hover:bg-transparent cursor-not-allowed': option.status !== 'ACTIVE'}"
          class="flex justify-between items-center"
        >
          <span>
            {{ option.description || '-' }} - {{ $currency(option.balance, option.currency).format() }}
          </span>
          <span
            v-if="option.status !== 'ACTIVE'"
            class="text-red-500 font-bold"
          >
            INACTIVE
          </span>
        </div>
      </template>
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

    formattedAccounts() {
      return this.corporateAccounts.map(account => {
        account.$isDisabled = account.status !== 'ACTIVE'
        return account
      })
    },
  },

  methods: {
    customLabel (value) {
      return `${value.description || '-' } - ${this.$currency(value.balance, value.currency).format()}`
    },
  },
}
</script>
