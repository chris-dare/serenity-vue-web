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
      exportBill: 'billing/exportCorporateBills',
    }),

    async print() {
      if (this.currency) {
        let filters = { ...omit(this.filters, ['page', 'page_size', 'payername', 'payer']) }
        let id = this.$route.params.id
        if (!filters.date_from) {
          delete filters.date_from
        }
        if (!filters.date_to) {
          delete filters.date_to
        }

        let payload = { ...filters, currency: this.currency }
        try {
          this.printLoading = true
          await this.exportBill({ payer:id, params: payload })
          this.printLoading = false
          this.open()
        }
        catch (error) {
          this.printLoading = false
        }
      } else {
        this.$toast.open({
          message: 'Please select currency',
          type: 'error',
        })
      }
    },

  },
}
</script>
