<template>
  <div class="space-y-4">
    <Search
      v-if="!hideSearch"
      v-model="params.search"
      placeholder="Search for patient"
      class="se-input-white mb-3"
      @input="searchData"
    />

  

    <BillingTableFilters
      v-model="lists"
      :begin-pos="true"
    >
      <FilterGroup
        v-model="params.status"
        :filters="filterOptions"
        @input="searchData"
      />
    </BillingTableFilters>

    <DataTable
      ref="table"
      :data="data"
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
              :label="row.patient_name | capitalize"
            />
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <p>{{ $date.formatDate(row.created_on, 'dd MMM, yyyy HH:mm a') || '-' }}</p>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <p>{{ row.service_or_product_name }}</p>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <p>{{ $currency(row.charge).format() }}</p>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <p class="capitalize">{{ row.payment_method | removeDash }}</p>
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
          <div class="flex items-center cursor-pointer space-x-4">
            <TableActions
              :actions="tableActions(row)"
              :loading="printLoading"
              @cancel="$trigger('billing:cancel:open', { bill: { ...row }, params })"
              @print="printBill(row)"
              @view="$trigger('billing:detail:open', { ...row })"
            />
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>
    <ViewBillingDetailsModal />
    <BillingSettlePaymentModal />
    <CancelBillingModal />
  </div>
</template>

<script>
import ViewBillingDetailsModal from '@/components/billing/ViewBillingDetailsModal'
import CancelBillingModal from '@/components/billing/CancelBillingModal'
import BillingTableFilters from '@/components/billing/BillingTableFilters'
import BillingSettlePaymentModal from '@/components/billing/BillingSettlePaymentModal'
import paymentMixin from '@/mixins/payment'
import DataMixin from '@/mixins/paginated'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'BillingTable',

  components: { ViewBillingDetailsModal, BillingSettlePaymentModal, CancelBillingModal, BillingTableFilters },

  mixins: [DataMixin, paymentMixin],

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
        'Date',
        'Service / Product',
        'Amount Recieved',
        'Payment Method',
        'Status',
        'Action',
      ],
      loading: false,
      paginate: true,
      filter: null,
      printLoading: false,
      lists: {},
      bill: {},
      params: {
        page: 1,
        page_size: 10,
      },
    }
  },

  computed: {
    ...mapState({
      bills: (state) => state.billing.billing,
    }),

    data() {
      return this.$date.sortByDate(this.bills, 'created_on', 'desc')
    },

    filterOptions() {
      return [
        { display: `All (${ this.dataCount })`, code: null },
        { display: 'Fully Paid', code: 'billed' },
        { display: 'Pending', code: 'billable' },
        { display: 'Cancelled', code: 'aborted' },
      ]
    },
  },

  watch: {
    lists: {
      handler(val, oldVal){
        if (val !== oldVal) {
          let values = val?.split(' to ')
          this.params.created_on__before = values && values[1] ? this.$date.formatQueryParamsDate(values[1]) : null
          this.params.created_on__after = values && values[0] ? this.$date.formatQueryParamsDate(values[0] || Date.now()) : null
          this.searchData()
        }
      },
    },
  },
  

  methods: {
    ...mapActions({
      getData: 'billing/getChargeItems',
      getPatientAccounts: 'billing/getPatientAccounts',
    }),

    tableActions(row) {
      return [
        { label: 'View bill', event: 'view', show: true },
        { label: row.status === 'billable' ? 'Print bill' : 'Print receipt', event: 'print', show: true },
        {
          label: 'Refund bill',
          event: 'cancel',
          show: row.status_display === 'Paid',
        },
        {
          label: 'Cancel Bill',
          event: 'cancel',
          show: row.status === 'cancelation-approved' && this.$userCan('bills.finishcancelation.write'),
        },
        {
          label: 'Approve Request',
          event: 'cancel',
          show: row.status === 'cancelation-requested' && this.$userCan('bills.approvecancelation.write'),
        },
        {
          label: 'Request Cancelation',
          event: 'cancel',
          show: row.status_display !== 'Paid' && row.status !== 'cancelation-requested' && row.status !== 'cancelation-approved' && this.$userCan('bills.requestcancelation.write'),
        },
      ]
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

    printBill(bill){
      this.bill = {...bill}
      this.print()
    },

    settle(bill) {
      if (bill.status !== 'billable') return
      this.getPatientAccounts({ id: bill.patientid })
      this.$trigger('billing:settle:open', bill)
    },
  },
}
</script>
