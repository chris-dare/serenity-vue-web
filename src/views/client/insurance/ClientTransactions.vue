<template>
  <div class="space-y-4">
    <div class="flex justify-end">
      <DatePicker
        v-model="filters.date"
        type="range"
        class="w-40"
      />
    </div>
    <DataTable
      ref="table"
      :columns="columns"
      :loading="loading"
      :pagination="{
        numberOfItems: meta.total,
        pageSizes: [10, 15, 20, 25]
      }"
      :data="transactions"
      :no-data-label="noDataLabel('transactions')"
      @pagination="actionOnPagination"
    >
      <template #default="{ row }">
        <cv-data-table-cell>
          {{ $date.formatDate(row.transactionData.created_at, 'yyyy/MM/dd') }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            {{ row.transactionData.id }}
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.providerDetails.name }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ $currency(row.transactionData.amount).format() }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <Tag :variant="row.transactionData.transaction_type === 'deposit' ? 'error' : 'success'">{{ row.transactionData.transaction_type }}</Tag>
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>
    <BillingCorporateSettlePayment />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import BillingCorporateSettlePayment from '@/components/billing/BillingCorporateSettlePayment'
import BillingAPI from '@/api/billing'

export default {
  name: 'ClientTransactions',

  components: { BillingCorporateSettlePayment },

  props: {
    id: {
      type: [String, Number],
      default: null,
    },
  },

  data() {
    return {
      filters: {
        page: 1, page_size: localStorage.getItem('pageSize') || 10,
      },
      columns: [
        'Date',
        'Bill ID',
        'Service Provider',
        'Price',
        'Status',
      ],
      loading: false,
      transactions: [],
      meta: {
        total: 0,
      },
    }
  },

  computed: {
    ...mapState({
      provider: (state) => state.auth.provider,
    }),

    ...mapGetters({
      noDataLabel: 'clients/getCurrentClientNoDataLabel',
    }),
  },

  watch: {
    $route: {
      immediate: true,
      handler() {
        this.getClientTransactions()
      },
    },
  },

  methods: {
    actionOnPagination(ev) {
      this.page = ev.page
      this.pageLength = ev.length
      this.filters = { page: ev.page, page_size: ev.length }
      this.getClientTransactions()
    },

    async getClientTransactions() {
      try {
        this.loading = true
        const { data } = await BillingAPI.transactions(this.provider.id, this.id, this.filters)
        this.transactions = data.results
        this.meta = data.meta
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log('error', error)
      }
      this.loading = false
    },
  },
}
</script>
