<template>
  <div class="space-y-4">
    <div class="flex justify-end">
      <DatePicker
        v-model="filters.date_generated"
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
      :no-data-label="noDataLabel('bills')"
      @pagination="actionOnPagination"
    >
      <template #default="{ row }">
        <cv-data-table-cell>
          {{ $date.formatDate(row.created_at, 'dd MMM, yyyy') }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            {{ row.charge_item }}
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.priority }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.payee_type }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <Tag>{{ row.status }}</Tag>
          </div>
        </cv-data-table-cell>
        <!-- <cv-data-table-cell>
          <div>
            <p
              v-if="row.status === 'open'"
              class="cursor-pointer"
              @click="settle(row)"
            >
              Settle
            </p>
          </div>
        </cv-data-table-cell> -->
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
        'Priority',
        'Payee Type',
        'Status',
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
        this.filters = { payer: this.id }
        this.getClientClaims()
      },
    },
    filters: {
      handler(val){
        if(val){
          this.getClientClaims()
        }
      },
    },
  },

  methods: {
    actionOnPagination(ev) {
      let id = this.$route.params.id
      this.filters = { payer: id, page: ev.page, page_size: ev.length }
      this.getClientClaims()
    },

    async getClientClaims() {
      try {
        this.loading = true
        const { data } = await ClientAPI.getClientClaims(this.$providerId, this.filters)
        this.bills = data.results
        console.log(this.bills)
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
