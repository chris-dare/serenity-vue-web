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
      :pagination="{
        numberOfItems: meta.total,
        pageSizes: [10, 15, 20, 25]
      }"
      :data="bills"
      no-data-label="No policies"
      @pagination="actionOnPagination"
    >
      <template #default="{ row }">
        <cv-data-table-cell>
          {{ $date.formatDate(row.billInfo.created_at, 'dd MMM, yyyy') }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            {{ row.billInfo.corporateId }}
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.providerDetails.name }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ $currency(row.billInfo.amount).format() }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.billInfo.createdBy }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <Tag>{{ row.billInfo.status }}</Tag>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p
              v-if="row.billInfo.status === 'open'"
              class="cursor-pointer"
              @click="settle(row)"
            >
              Settle
            </p>
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>
    <BillingCorporateSettlePayment />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BillingCorporateSettlePayment from '@/components/billing/BillingCorporateSettlePayment'
import ClientAPI from '@/api/clients'

export default {
  name: 'ClientBills',


  components: { BillingCorporateSettlePayment },

  props: {
    id: {
      type: [String, Number],
      default: null,
    },
  },

  data() {
    return {
      filters: {},
      columns: [
        'Date',
        'Bill ID',
        'Service Provider',
        'Price',
        'Practitioner',
        'Status',
        'Action',
      ],
      loading: false,
      bills: [],
      meta: {
        total: 0,
      },
    }
  },

  computed: {
    ...mapGetters({
      noDataLabel: 'clients/getCurrentClientNoDataLabel',
    }),
  },

  watch: {
    $route: {
      immediate: true,
      handler() {
        this.getClientBills()
      },
    },
  },

  methods: {
    actionOnPagination(ev) {
      this.filters = { page: ev.page, page_size: ev.length }
      this.getClientBills()
    },

    async getClientBills() {
      try {
        this.loading = true
        const { data } = await ClientAPI.getClientBills(this.$providerId, this.id, this.filters)
        this.bills = data.results
        this.meta = data.meta
        this.loading = false
      } catch (error) {
        this.loading = false
      }
      this.loading = false
    },

    settle(bill) {
      this.$trigger('corporate:settle:open', bill)
    },
  },
}
</script>
