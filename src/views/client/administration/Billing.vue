<template>
  <div>
    <div class="w-4/5 mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Bills ({{ filteredBilling.length || 0 }})</p>
      </div>

      <cv-form autocomplete="off">
        <cv-search
          v-model="search"
          placeholder="Search for patient"
        />
      </cv-form>

      <div class="my-4 flex items-center space-x-2">
        <cv-button
          kind="primary"
          size="field"
          class="px-4 bg-serenity-primary hover:bg-serenity-primary-highlight mr-2"
        >
          All (5)
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white text-serenity-placeholder"
        >
          Fully Paid
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white text-serenity-placeholder"
        >
          Pending
        </cv-button>
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white text-serenity-placeholder"
        >
          Canceled
        </cv-button>
      </div>

      <cv-data-table
        ref="table"
        :data="filteredBilling"
        :columns="columns"
        :pagination="{ itemsPerPage:10, numberOfItems: filteredBilling.length, pageSizes: [10, 15, 20, 25] }"
      >
        <template slot="data">
          <cv-data-table-row
            v-for="(row, rowIndex) in filteredBilling"
            :key="`${rowIndex}`"
            :value="`${rowIndex}`"
          >
            <cv-data-table-cell>
              <div class="flex items-center py-4 space-x-2">
                <Avatar :name="row.patientname" />
                <div>
                  <p>{{ row.patientname }}</p>
                  <!-- <p class="text-secondary text-xs">
                    {{ $faker().random.boolean() ? 'male' : 'female' }}, {{ $utils.createRandom(100) }} years
                  </p> -->
                </div>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ row.service_or_product_name }}</p>
            </cv-data-table-cell>
            
            
            <cv-data-table-cell>
              <p>{{ Math.round(Math.random()) }}</p>
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
          </cv-data-table-row>
        </template>
      </cv-data-table>
    </div>
    <ViewBillingDetails />
  </div>
</template>

<script>
// import Add from '@carbon/icons-vue/es/add/32'
import ViewBillingDetails from '@/components/admin/modals/ViewBillingDetails'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Clients',

  components: { ViewBillingDetails },

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
      billing: (state) => state.billing.billing,
    }),
    filteredBilling() {
      return this.billing.filter(data => !this.search || data.patientname.toLowerCase().includes(this.search.toLowerCase()))
    },
  },

  created() {
    this.refresh()
    console.log(this.billing)
  },

  methods: {
    ...mapActions({
      getBilling: 'billing/getBilling',
    }),
    async refresh() {
      this.loading = true
      await this.getBilling()
      this.loading = false
    },
  },
}
</script>
