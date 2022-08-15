<template>
  <BaseModal
    :name="name"
    title="Select bill currency"
    @closed="close"
  >
    <template slot="title">
      <div>
        <h2>The bill would be printed in the selected currency</h2>
      </div>
    </template>
    <template>
      <SeForm class="space-y-8">
        <CurrencySelect v-model="currency" />
      </SeForm>

      <div class="flex items-center justify-between mt-12">
        <SeButton
          full
          :loading="printLoading"
          :disabled="!currency"
          @click="print"
        >
          Print Bill
        </SeButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import modalMixin from '@/mixins/modal'
import omit from 'lodash/omit'
import omitBy from 'lodash/omitBy'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'PrintBillCurrency',
  mixins: [modalMixin],
  data() {
    return {
      currency: 'GHS',
      mode: 'create',
      loading: false,
      printLoading: false,
      name: 'print-bill-modal',
    }
  },
  events: {
    'printbill:update:open': function (data) {
      this.open()
      this.filters = data.params[0]
    },
  },
  computed: {
    ...mapState({
      currencies: state => state.resources.currencies,
    }),
  },
  methods: {
    ...mapActions({
      exportCorporateBills: 'billing/exportCorporateBills',
    }),

    async print() {
      if (!this.currency) {
        this.$toast.open({
          message: 'Please select currency',
          type: 'error',
        })
        return
      }

      const filters = { ...omitBy(this.filters, isEmpty), currency: this.currency }

      const payload = {
        ...omit(filters, ['payer', 'page', 'page_size', 'search', 'date', 'payername']),
      }

      try {
        this.loading = true
        await this.exportCorporateBills({ payer: this.$route.params.id, params: payload })
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
  },
}
</script>
