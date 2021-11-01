<template>
  <div class="space-y-4">
    <Search
      v-model="filter"
      placeholder="Search for patient, enter name or MR number"
    />

    <div>
      <DataTable
        ref="table"
        :columns="columns"
        :pagination="pagination"
        :data="normalizedData"
        :loading="loading"
        @pagination="storePagination"
      >
        <template #default="{ row }">
          <cv-data-table-cell>
            <div class="flex items-center py-2">
              <InfoImageBlock
                :label="row.patient_name"
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
              <p>{{ row.payer_bill_claims.length }}</p>
            </div>
          </cv-data-table-cell>
          <!-- <cv-data-table-cell>
            <div
              v-if="row.total_amount > 0"
              class="flex items-center cursor-pointer"
              @click="$trigger('billing:invoices:settle:open', {invoice: })"
            >
              View
              <div class="ml-2 w-5 h-5 rounded-full bg-gray-200 flex justify-center items-center">
                <img
                  src="@/assets/img/view 1.svg"
                  alt=""
                >
              </div>
            </div>
          </cv-data-table-cell> -->
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
                  <div>
                    {{ $date.formatDate(request.row.created_at, 'dd MMM, yyyy') }}
                  </div>
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
                    <Tag
                      show-icon
                      :variant="getStatusVariant(row.status)"
                      class="cursor-pointer"
                    >
                      {{ request.row.status }}
                    </Tag>
                  </div>
                </cv-data-table-cell>
              </template>
            </DataTable>
          </div>
        </template>
      </DataTable>
    </div>

    <BillingSettlePaymentModal />
  </div>
</template>

<script>
import { mapGetters,mapState } from 'vuex'
import DataMixin from '@/mixins/data'
import debounce from 'lodash/debounce'
import BillingSettlePaymentModal from '@/components/billing/BillingSettlePaymentModal'
import ClientAPI from '@/api/clients'

export default {
  name: 'Cldata',

  components: {BillingSettlePaymentModal},


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
        'Items',
        // 'Action',
      ],
      nestedTableColumns: ['Date', 'Bill ID', 'Priority', 'Payee Type', 'Status' ],
      selectedFilter: '',
      filter: '',
      searchTerms: ['patient_detail.name'],
      data: [],
      filters: {},
      paginate: true,
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

    filters: {
      handler(val){
        if(val){
          this.getData()
        }
      },
    },
  },

  methods: {
    actionOnPagination(ev) {
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

    searchInvoices: debounce(function(search) {
      this.refresh({ search, page: this.page, page_size: this.pageLength })
    }, 300, false),

    settle(bill) {
      this.$trigger('corporate:settle:open', bill)
    },

    getStatusVariant(status) {
      if (status === 'billable') {
        return 'primary'
      }

      if (status === 'aborted') {
        return 'error'
      }

      return 'success'
    },  
    

  },
}
</script>
