<template>
  <div class="space-y-4">
    <!-- <Search
      v-model="search"
      placeholder="Search for patient, enter name or MR number"
      @input="searchData"
    />-->

    <BillingTableFilters v-model="lists">
      <SeButton
        variant="primary"
        :icon="icon"
        :loading="printLoading"
        @click="$trigger('printbill:update:open', {...filters})"
      >
        Print all
      </SeButton>
    </BillingTableFilters>

    <div>
      <DataTable
        ref="table"
        :data="data"
        :columns="columns"
        :pagination="pagination"
        :loading="loading"
        @pagination="actionOnPagination"
      >
        <template #default="{ row }">
          <cv-data-table-cell>
            <div class="flex items-center py-2">
              <InfoImageBlock
                :label="row.patient_name | capitalize"
                size="base"
              />
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.cashier_name }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ $currency(row.total_amount, row.currency || 'GHS').format() }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <CurrencySelect
                :value="row.currency"
                hide-close
                class="w-20"
                title=""
                @input="row._currency = $event"
              />
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.payer_bill_claims.length }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <SeButton
                variant="link"
                @click="printInvoice(row.id, row._currency)"
              >
                Print <Printer class="ml-2" />
              </SeButton>
            </div>
          </cv-data-table-cell>
        </template>
        <template #expand="{ row }">
          <div class="px-8">
            <DataTable
              ref="table"
              :data="row.payer_bill_claims"
              :columns="nestedTableColumns"
              :has-expand-all="true"
              small
            >
              <template #default="request">
                <cv-data-table-cell>
                  <div>{{ $date.formatDate(request.row.created_at, 'dd MMM, yyyy') }}</div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <div>
                    <p>{{ request.row.payer_bill }}</p>
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <div>
                    <p>{{ request.row.payee_type }}</p>
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <div>
                    <p>{{ $currency(request.row.amount).format() }}</p>
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <div>
                    <CurrencySelect
                      :value="request.row.currency"
                      hide-close
                      class="w-20"
                      title=""
                      @input="request.row._currency = $event"
                    />
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <div>
                    <Tag
                      :variant="getStatusVariant(row.status)"
                      class="cursor-pointer"
                    >
                      {{ request.row.status | capitalize }}
                    </Tag>
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <div>
                    <SeButton
                      variant="link"
                      @click="printChargeItem(request.row.id, request.row._currency)"
                    >
                      Print <Printer class="ml-2" />
                    </SeButton>
                  </div>
                </cv-data-table-cell>
              </template>
            </DataTable>
          </div>
        </template>
      </DataTable>
    </div>

    <BillingSettlePaymentModal />
    <PrintBillModal />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import DataMixin from '@/mixins/paginated'
import debounce from 'lodash/debounce'
import BillingSettlePaymentModal from '@/components/billing/BillingSettlePaymentModal'
import BillingTableFilters from '@/components/billing/BillingTableFilters'
import PrintBillModal from '@/components/billing/topup/PrintBill'
import ClientAPI from '@/api/clients'
import Printer from '@carbon/icons-vue/es/printer/16'

export default {
  name: 'ClientBills',

  components: { BillingSettlePaymentModal, BillingTableFilters, PrintBillModal, Printer },


  mixins: [DataMixin],

  props: {
    id: {
      type: [String, Number],
      default: null,
    },
  },

  data() {
    return {
      rowSelects: null,
      columns: [
        'Patient',
        'Cashier',
        'Total Bill',
        '',
        'Items',
        'Action',
      ],
      icon: Printer,
      nestedTableColumns: ['Date', 'Bill ID', 'Payee Type', 'Amount', 'Currency', 'Status', 'Action'],
      selectedFilter: '',
      searchTerms: ['patient_detail.name'],
      data: [],
      lists: {},
      filters: {},
      paginate: true,
      printLoading: false,
      total: 0,
      meta: 0,
    }
  },

  computed: {
    ...mapGetters({
      noDataLabel: 'clients/getCurrentClientNoDataLabel',
    }),
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
    }),
  },

  watch: {
    $route: {
      immediate: true,
      handler() {
        this.filters = { payer: this.id, page: this.page, page_size: this.pageLength }
        this.getData()
      },
    },

    lists: {
      handler(val){
        if (val) {
          let values = val?.date?.split(' to ')
          this.filters = { ...this.filters, ...val}
          this.filters.date_to = values && values[1] ? this.$date.formatQueryParamsDate(values[1]) : null
          this.filters.date_from = values && values[0] ? this.$date.formatQueryParamsDate(values[0] || Date.now()) : null
          delete this.filters.date
          this.getData()
        }
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    ...mapActions({
      exportCorporateBills: 'billing/exportCorporateBills',
      exportInvoiceBill: 'billing/exportBill',
      exportChargeItem: 'billing/exportChargeItem',
    }),

    actionOnPagination(ev) {
      this.page = ev.page
      this.pageLength = ev.length
      let id = this.$route.params.id
      this.filters = { payer: id, page: ev.page, page_size: ev.length }
      this.getData()
    },

    async getData() {
      try {
        this.loading = true
        const { data } = await ClientAPI.getClientClaims(this.$providerId, this.filters)
        this.data = data.results
        this.meta = data.meta
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    searchInvoices: debounce(function (search) {
      this.refresh({ search, page: this.page, page_size: this.pageLength })
    }, 300, false),

    searchByDate(val) {
      let filters = { ...this.filters }

      if (val.end) {
        filters.date_to = this.$date.formatQueryParamsDate(val.end)
        delete filters.end
        filters.date_from = this.$date.formatQueryParamsDate(val.start || Date.now())
        delete filters.start
      }

      this.filters = { ...filters }
      this.getData()
    },


    settle(bill) {
      this.$trigger('corporate:settle:open', bill)
    },

    getStatusVariant(status) {
      if (status === 'billable') {
        return 'primary'
      }

      if (status === 'CANCELLED') {
        return 'error'
      }

      return 'success'
    },
  
    async printInvoice(id, currency) {
      try {
        this.printLoading = true
        await this.exportInvoiceBill({ id, params: { currency }})
        this.printLoading = false
      } catch (error) {
        this.printLoading = false
      }
    },

    async printChargeItem(id, currency) {
      try {
        this.printLoading = true
        await this.exportChargeItem({ id, params: { currency }})
        this.printLoading = false
      } catch (error) {
        this.printLoading = false
      }
    },

    async print() {
      let filters = { ...this.filters }
      let id = this.$route.params.id
      if (!filters.date_from) {
        delete filters.date_from
      }
      if (!filters.date_to) {
        delete filters.date_to
      }
      if (!filters.page) {
        delete filters.page
      }
      if (!filters.page_size) {
        delete filters.page_size
      }

      let payload = { payer: id, ...filters }
      try {
        this.printLoading = true
        await this.exportCorporateBills(payload)
        this.printLoading = false
      } catch (error) {
        this.printLoading = false
      }
    },

  },
}
</script>
