<template>
  <div class="space-y-4">
    <Search
      v-model="params.search"
      placeholder="Search for a history"
      @input="searchData"
    />

    <div class="bg-white p-3">
      <div class="flex items-center justify-between mb-4">
        <p class=" text-gray-500">Account history</p>
      </div>


      <DataTable
        ref="table"
        :columns="columns"
        :pagination="pagination"
        :data="data"
        class="transparent-table"
        :no-data-label="noDataLabel('account history')"
        :loading="loading"
        @pagination="actionOnPagination"
      >
        <template #default="{ row }">
          <cv-data-table-cell>
            {{ $date.formatDate(row.created_at, 'MMM dd, yyyy') }}
          </cv-data-table-cell>
          <cv-data-table-cell>
            <p>{{ row.reference_type | removeUnderscore }}</p>
          </cv-data-table-cell>
          <cv-data-table-cell>
            {{ $currency(row.debug_balance).format() }}
          </cv-data-table-cell>
          <cv-data-table-cell>
            {{ $currency(row.delta).format() }}
          </cv-data-table-cell>
          <cv-data-table-cell>
            <Tag
              show-icon
              :variant="getStatusVariant(row.action_type)"
              class="cursor-pointer"
            >
              {{ row.action_type | capitalize }}
            </Tag>
          </cv-data-table-cell>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import DataMixin from '@/mixins/paginated'
import BillingAPI from '@/api/billing'
// import debounce from 'lodash/debounce'

export default {
  name: 'PatientAccountHistory',

  mixins: [DataMixin],

  data() {
    return {
      columns: [
        'Date',
        'Reference',
        'Debug type',
        'Delta',
        'Action Type',
      ],
      visible: false,
      order: {},
      data: [],
    }
  },

  computed: {
    ...mapState({
      patient: state => state.patients.currentPatient,
    }),

    ...mapGetters({
      noDataLabel: 'patients/getCurrentPatientNoDataLabel',
      getStatusVariant: 'billing/getStatusVariant',
      userAccounts: 'billing/userAccounts',
    }),
  },

  async mounted() {
    await this.getPatientAccounts({ id: this.$route.params.id })
    this.refresh()
  },

  methods: {
    ...mapActions({
      getPatientAccounts: 'billing/getPatientAccounts',
    }),

    async getData(params) {
      this.loading = true
      try {

        const { data } = await BillingAPI.getAccountHistory(this.$providerId, this.$route.params.id, this.userAccounts[0].uuid, params)
        this.data = data.results
        
        this.loading = false
        return data
      } catch (error) {
        this.loading = false
      }
    },

    showOrder(data) {
      this.order = data
      this.$trigger('order:details:open', data)
      this.visible = true
    },
  },
}
</script>
