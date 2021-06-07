<template>
  <div>
    <div class="w-4/5 mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Bills ({{ dataCount }})</p>
      </div>

      <Search
        v-model="search"
        placeholder="Search for patient"
      />

      <div class="my-4 flex items-center space-x-2">
        <SeButton>
          All (5)
        </SeButton>
        <SeButton
          variant="white"
        >
          Fully Paid
        </SeButton>
        <SeButton
          variant="white"
        >
          Pending
        </SeButton>
        <SeButton
          variant="white"
        >
          Canceled
        </SeButton>
      </div>

      <DataTable
        ref="table"
        :data="filteredData"
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
                :label="row.patientname"
              />
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ row.service_or_product_name }}</p>
          </cv-data-table-cell>
            
            
          <cv-data-table-cell>
            <p>{{ $currency(Math.round(Math.random())).format() }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ row.paymentMethod }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p class="camelcase">{{ row.status }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div
              class="flex items-center cursor-pointer"
              @click="$trigger('billing:detail:open', { ...row })"
            >
              View bill
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
    </div>
    <ViewBillingDetails />
  </div>
</template>

<script>
import ViewBillingDetails from '@/components/admin/modals/ViewBillingDetails'
import { mapActions, mapState } from 'vuex'
import DataMixin from '@/mixins/data'

export default {
  name: 'Billing',

  components: { ViewBillingDetails },

  mixins: [DataMixin],

  data() {
    return {
      search: '',
      columns: [
        'Patient',
        'Service / Product',
        'Amount Recieved',
        'Payment Method',
        'Status',
        'Action',
      ],
      loading: false,
    }
  },

  computed: {
    ...mapState({
      data: (state) => state.billing.billing,
    }),
  },

  created() {
    this.paginate = true
    this.searchTerms = ['patientname']
    this.refresh()
  },

  methods: {
    ...mapActions({
      getData: 'billing/getBilling',
    }),
  },
}
</script>
