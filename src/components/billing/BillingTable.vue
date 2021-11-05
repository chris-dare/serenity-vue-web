<template>
  <div class="space-y-4">
    <Search
      v-if="!hideSearch"
      v-model="filter"
      placeholder="Search for patient"
      class="se-input-white"
    />

    <FilterGroup
      v-model="search"
      :filters="filtering"
    />

    <DataTable
      ref="table"
      :data="filteredData || []"
      :columns="columns"
      :loading="loading"
      :pagination="pagination"
      @pagination="actionOnPagination"
    >
      <template #default="{row}">
        <cv-data-table-cell>
          <div class="flex items-center py-4 space-x-2">
            <InfoImageBlock
              :url="row.photo"
              :label="row.patient_name"
            />
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <p>{{ row.service_or_product_name }}</p>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <p>{{ $currency(row.charge).format() }}</p>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <p>{{ row.paymentMethod }}</p>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <Tag
            show-icon
            :variant="getStatusVariant(row.status)"
            class="cursor-pointer"
            @click="settle(row)"
          >
            {{ row.status_display }}
          </Tag>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div
            class="flex items-center cursor-pointer"
            @click="$trigger('billing:detail:open', { ...row })"
          >
            View
            <div
              class="ml-2 w-5 h-5 rounded-full bg-gray-200 flex justify-center items-center"
            >
              <img
                src="@/assets/img/view 1.svg"
                alt=""
              >
            </div>
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>
    <ViewBillingDetailsModal />
    <BillingSettlePaymentModal />
  </div>
</template>

<script>
import ViewBillingDetailsModal from '@/components/billing/ViewBillingDetailsModal'
import BillingSettlePaymentModal from '@/components/billing/BillingSettlePaymentModal'
import DataMixin from '@/mixins/data'
import debounce from 'lodash/debounce'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'BillingTable',

  components: { ViewBillingDetailsModal, BillingSettlePaymentModal },

  mixins: [DataMixin],

  props: {
    hideSearch: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      columns: [
        'Patient',
        'Service / Product',
        'Amount Recieved',
        'Payment Method',
        'Status',
        'Action',
      ],
      loading: false,
      searchTerms: ['patient_name', 'status'],
      paginate: true,
      filter: null,
      filters: {},
    }
  },

  computed: {
    ...mapState({
      bills: (state) => state.billing.billing,
    }),

    data() {
      return this.$date.sortByDate(this.bills, 'created_on', 'desc')
    },

    filtering() {
      return [
        { display: `All (${ this.dataCount })`, code: '' },
        { display: 'Fully Paid', code: 'billed' },
        { display: 'Pending', code: 'billable' },
        { display: 'Cancelled', code: 'cancelled' },
      ]
    },
  },

  watch: {
    filter(search) {
      this.searchBills(search)
    },

    filters: {
      handler(val){
        if(val){
          this.getData()
        }
      },
    },
  },

  created() {
    this.filters = { page: this.page, page_size: this.pageLength }
    this.refresh()
  },

  methods: {
    ...mapActions({
      getChargeItems: 'billing/getChargeItems',
      getPatientAccounts: 'billing/getPatientAccounts',
    }),

    actionOnPagination(ev) {
      this.filters = { page: ev.page, page_size: ev.length }
      this.getData()
    },

    async getData() {
      try {
        this.loading = true
        const { data } = await this.getChargeItems(this.filters)
        this.meta = data.meta
        this.loading = false
      } catch (error) {
        this.loading = false
      }
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

    settle(bill) {
      if (bill.status !== 'billable') return
      this.getPatientAccounts({ id: bill.patientid })
      this.$trigger('billing:settle:open', bill)
    },

    searchBills: debounce(function(search) {
      this.refresh({ search, page: this.page, page_size: this.pageLength })
    }, 300, false),
  },
}
</script>
