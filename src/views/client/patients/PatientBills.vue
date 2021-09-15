<template>
  <div class="space-y-4">
    <Search
      v-model="search"
      placeholder="Search for bill"
    />

    <FilterGroup
      v-model="search"
      :filters="filters"
    />
    <div class="bg-white p-3">
      <div class="flex items-center justify-between mb-4">
        <p class=" text-gray-500">Bills</p>
      </div>


      <DataTable
        ref="table"
        :columns="columns"
        :pagination="pagination"
        :data="filteredData"
        class="transparent-table"
        :no-data-label="noDataLabel('bills')"
      >
        <template #default="{ row }">
          <cv-data-table-cell>
            {{ $date.formatDate(row.occurrence_date, 'MMM dd, yyyy') }}
          </cv-data-table-cell>
          <cv-data-table-cell>
            <InfoImageBlock :label="row.practitioner_name" />
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ row.service_or_product_name }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            {{ $currency(row.charge).format() }}
          </cv-data-table-cell>
          <cv-data-table-cell>
            {{ row.payment_method }}
          </cv-data-table-cell>
          <cv-data-table-cell>
            <Tag
              show-icon
              :variant="getStatusVariant(row.status)"
              class="cursor-pointer"
              @click="settle(row)"
            >
              {{ row.status }}
            </Tag>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div
              class="flex items-center cursor-pointer "
              @click="showOrder(row)"
            >
              View
              <div class="ml-2 w-5 h-5 rounded-full bg-gray-200 flex justify-center items-center">
                <img
                  src="@/assets/img/view 1.svg"
                  alt=""
                >
              </div>
            </div>
          </cv-data-table-cell>
        </template>
      </DataTable>
    </div>
    <OrderDetailsModal :visible.sync="visible" />
  </div>
</template>

<script>
import OrderDetailsModal from '@/components/patients/modals/OrderDetailsModal'
import { mapGetters, mapState, mapActions } from 'vuex'
import DataMixin from '@/mixins/data'

export default {
  name: 'PatientBills',

  components: { OrderDetailsModal },

  mixins: [DataMixin],

  data() {
    return {
      search: '',
      columns: [
        'Date',
        'Practitioner',
        'Service / Product',
        'Charge',
        // 'Amount Paid',
        // 'Balance',
        'Method',
        'Status',
        'Action',
      ],
      visible: false,
      order: {},
      searchTerms: ['status'],
    }
  },

  computed: {
    ...mapState({
      data: state => state.billing.billing,
    }),

    ...mapGetters({
      serviceRequests: 'patients/patientLabRequests',
      noDataLabel: 'patients/getCurrentPatientNoDataLabel',
      hasActiveEncounter: 'encounters/hasActiveEncounter',
      getStatusVariant: 'billing/getStatusVariant',
    }),

    filters() {
      return [
        { display: `All (${ this.dataCount })`, code: '' },
        { display: 'Fully Paid', code: 'billed' },
        { display: 'Pending', code: 'billable' },
        { display: 'Cancelled', code: 'cancelled' },
      ]
    },
  },

  mounted() {
    this.refresh(this.$route.params.id)
  },

  methods: {
    ...mapActions({
      getData: 'billing/getPatientBilling',
    }),

    showOrder(data) {
      this.order = data
      this.$trigger('order:details:open', data)
      this.visible = true
    },
  },
}
</script>
