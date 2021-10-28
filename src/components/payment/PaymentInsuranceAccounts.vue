<template>
  <div class="space-y-2">
    <MultiSelect
      v-model="localValue.account_id"
      :options="insuranceAccounts"
      title="Insurance accounts"
      track-by="id"
      label="description"
      custom-field="uuid"
      :multiple="false"
      :error-message="$utils.validateRequiredField(v, 'account_id')"
      @input="v.$touch()"
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
          @click="$trigger('insurance:add:open', localValue.patient)"
        >
          Add new insurance account
        </SeButton>
      </div>
    </MultiSelect>
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
  },

  computed: {
    ...mapGetters({
      insuranceAccounts: 'billing/insuranceAccounts',
    }),
  },

  methods: {
    customLabel (value) {
      return `${value.description || '-' } - ${this.$currency(value.balance, value.currency).format()}`
    },
  },
}
</script>
