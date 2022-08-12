<template>
  <div class="space-y-4">
    <!-- <Search
      v-model="search"
      placeholder="Search for patient, enter name or MR number"
      @input="searchData"
    />-->

    <BillingTableFilters v-model="params">
      <SeButton
        variant="primary"
        :icon="icon"
        :loading="printLoading"
        :disable="!data"
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
                :label="$utils.customNameLabel(row || row.user) | capitalize"
                :description="`${$utils.concatData(row, ['gender', 'age'], ', ')} ${row.age ? 'years' : ''}`"
                :url="row.photo"
                size="base"
              />
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.mobile }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ $date.formatDate(row.last_encounter) || 'N/A' }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.mr_number }}</p>
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
              <SeButton
                variant="link"
                @click="print(row.mr_number, row._currency)"
              >
                Print <Printer class="ml-2" />
              </SeButton>
            </div>
          </cv-data-table-cell>
        </template>
        <!-- <template #expand="{ row }">
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
        </template> -->
      </DataTable>
    </div>

    <BillingSettlePaymentModal />
    <PrintBillModal />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import DataMixin from '@/mixins/paginated'
import BillingSettlePaymentModal from '@/components/billing/BillingSettlePaymentModal'
import BillingTableFilters from '@/components/billing/BillingTableFilters'
import PrintBillModal from '@/components/billing/topup/PrintBill'
import ClientAPI from '@/api/clients'
import Printer from '@carbon/icons-vue/es/printer/16'
import pickBy from 'lodash/pickBy'
import isNil from 'lodash/isNil'

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
        'Mobile',
        'Last encounter',
        'MR No.',
        '',
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
      dateFields: ['date_from', 'date_to'],
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
    'params.date': {
      immediate: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          let values = val?.split(' to ')
          this.params[this.dateFields[0]] = values && values[0] ? this.$date.formatQueryParamsDate(values[0]) : null
          this.params[this.dateFields[1]] = values && values[1] ? this.$date.formatQueryParamsDate(values[1] || Date.now()) : null
          this.refresh()
        }
      },
    },
  },

  mounted() {
    this.params = { ...this.params, payer: this.id }
    this.refresh()
  },

  methods: {
    ...mapActions({
      exportCorporateBills: 'billing/exportCorporateBills',
      exportInvoiceBill: 'billing/exportBill',
      exportChargeItem: 'billing/exportChargeItem',
    }),

    async getData(params) {
      try {
        this.loading = true
        const { data } = await ClientAPI.getClientFinanceBills(this.$providerId, params)
        this.data = data.results
        this.dataMeta = data.meta
        this.loading = false
      } catch (error) {
        this.loading = false
      }
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

    async print(patient, currency) {
      let filters = { ...pickBy(this.params, !isNil), currency, patient__mr_number: patient }
      let id = this.$route.params.id
      delete filters.payer

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
