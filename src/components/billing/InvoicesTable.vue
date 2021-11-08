<template>
  <div class="space-y-4">
    <Search
      v-model="params.search"
      placeholder="Search for patient, enter name or MR number"
      @input="searchData"
    />

    <div>
      <DataTable
        ref="table"
        :columns="columns"
        :pagination="pagination"
        :data="data"
        :loading="loading"
        @pagination="actionOnPagination"
      >
        <template #default="{ row }">
          <cv-data-table-cell>
            <div class="flex items-center py-2">
              <InfoImageBlock
                :label="row.patient_detail.name | capitalize"
                :url="row.patient_detail.photo"
                :description="$utils.concatData(row.patient_detail, ['age', 'gender'])"
                size="base"
              />
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.cashier }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <Tag
                show-icon
                :variant="getStatusVariant(row.status)"
                class="cursor-pointer"
              >
                {{ row.status_display }}
              </Tag>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ $currency(row.total_gross_value, row.total_gross_currency || 'GHS').format() }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.line_items.length }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div
              v-if="row.total_gross_value > 0"
              class="flex items-center cursor-pointer"
              @click="$trigger('billing:invoices:settle:open', {invoice:row})"
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
        <template #expand="{ row }">
          <div class="px-8">
            <DataTable
              ref="table"
              :data="row.line_items"
              :columns="nestedTableColumns"
              :has-expand-all="true"
              small
            >
              <template #default="request">
                <cv-data-table-cell>
                  <div>
                    <InfoImageBlock
                      :label="request.row.practitioner_name | capitalize"
                    />
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <div>
                    <p>{{ request.row.service_or_product_name }}</p>
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <div>
                    <p>{{ $currency(request.row.charge).format() }}</p>
                  </div>
                </cv-data-table-cell>
                <cv-data-table-cell>
                  <div>
                    <Tag
                      show-icon
                      :variant="getStatusVariant(request.row.status)"
                      class="cursor-pointer"
                    >
                      {{ request.row.status_display }}
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
import { mapState } from 'vuex'
import DataMixin from '@/mixins/paginated'
import BillingAPI from '@/api/billing'
import BillingSettlePaymentModal from '@/components/billing/BillingSettlePaymentModal'

export default {
  name: 'InvoicesTable',

  components: {BillingSettlePaymentModal},

  mixins: [DataMixin],

  data() {
    return {
      rowSelects: null,
      columns: [
        'Patient',
        'Cashier',
        'Status',
        'Total Bill',
        'Items',
        'Action',
      ],
      nestedTableColumns: ['Practitioner', 'Service/Product', 'Charge', 'Status'],
      selectedFilter: '',
      data: [],
    }
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
    }),
  },

  mounted() {
    this.refresh()
  },

  methods: {
    async getData(params) {
      const { data } = await BillingAPI.invoices(this.$providerId, params)
      this.data = data.results
      return data
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
