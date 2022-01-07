<template>
  <div class="space-y-4">
    <Search
      v-model="params.search"
      placeholder="Search for bill"
      @input="searchData"
    />
    <BillingPatientFilters v-model="lists">
      <FilterGroup
        v-model="params.status"
        :filters="filters"
        @input="searchData"
      />
      <MultiSelect
        v-model="category"
        :options="serviceCategoryTypes"
        :multiple="false"
        placeholder="Select a service request category"
        label="display"
        track-by="code"
        custom-field="code"
        title="Service request category"
      />
    </BillingPatientFilters>
    <div class="bg-white p-3">
      <DataTable
        ref="table"
        :columns="columns"
        :pagination="pagination"
        :data="data"
        class="transparent-table"
        :no-data-label="noDataLabel('bills')"
        @pagination="actionOnPagination"
      >
        <template #default="{ row }">
          <cv-data-table-cell>
            {{ $date.formatDate(row.occurrence_date, 'MMM dd, yyyy') }}
          </cv-data-table-cell>
          <cv-data-table-cell>
            <InfoImageBlock :label="row.practitioner_name | capitalize" />
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
import BillingPatientFilters from '@/components/billing/BillingPatientFilters'
import DataMixin from '@/mixins/paginated'

export default {
  name: 'PatientBills',

  components: { OrderDetailsModal, BillingPatientFilters },

  mixins: [DataMixin],

  data() {
    return {
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
      lists: {},
      category: '',
    }
  },

  computed: {
    ...mapState({
      data: state => state.billing.billing,
      serviceCategoryTypes: (state) => state.resources.serviceRequestCategoryTypes,
    }),

    ...mapGetters({
      serviceRequests: 'patients/patientLabRequests',
      noDataLabel: 'patients/getCurrentPatientNoDataLabel',
      hasActiveEncounter: 'encounters/hasActiveEncounter',
      getStatusVariant: 'billing/getStatusVariant',
    }),

    filters() {
      return [
        { display: `All (${ this.dataCount })`, code: null },
        { display: 'Fully Paid', code: 'billed' },
        { display: 'Pending', code: 'billable' },
        { display: 'Cancelled', code: 'cancelled' },
      ]
    },
  },

  watch:{
    lists: {
      handler(val){
        if(val){

          if (val.end) {
            this.params.created_on__before = this.$date.formatQueryParamsDate(val.end)
            this.params.created_on__after = this.$date.formatQueryParamsDate(val.start || Date.now())
          }
          this.searchData()
        }
      },
    },

    category: {
      handler(val){
        if(val){
          if (val) {
            this.params.category = val
          }
          this.searchData()
        }
      },
    },
  },

  created() {
    this.params.id = this.$route.params.id
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
