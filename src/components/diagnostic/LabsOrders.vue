<template>
  <div class="space-y-4">
    <Search
      v-if="!hideSearch"
      v-model="params.search"
      placeholder="Search for patient, enter name or MR number"
      @input="searchData"
    />
    <FilterGroup
      v-model="search"
      :filters="filtering"
    />

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
          {{ row.display }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ row.accession_number }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ $date.formatDate(row.occurence, 'dd MMM, yyyy HH:mm a') || '-' }}
        </cv-data-table-cell>
        <cv-data-table-cell>
          {{ row.patient_name | capitalize }}
        </cv-data-table-cell>
        <!-- <cv-data-table-cell class="text-center">
          {{ $utils.getFirstData(row.specimen, 'display' ) || '-' }}
        </cv-data-table-cell> -->
        <cv-data-table-cell>
          <Tag
            :variant="getStatusVariant(row.status)"
            :label="row.status"
          />
        </cv-data-table-cell>
        <cv-data-table-cell v-if="!$isCurrentWorkspace('RECEPT')">
          <div v-if="row.status !== 'draft' && $isCurrentWorkspace('BILL')">
            settled
          </div>
          <div
            v-else
            class="flex items-center cursor-pointer"
            :disabled="!$userCan('diagnostic.requests.read')"
            @click="$trigger('diagnostic-order:add:open', {...row})"
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
    <DiagnosticOrder :params="params" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DataMixin from '@/mixins/paginated'
import DiagnosticOrder from '@/components/diagnostic/modals/DiagnosticOrderModal'

export default {
  name: 'LabsOrders',

  components: { DiagnosticOrder },

  mixins: [DataMixin],

  props: {
    hideSearch: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      search: '',
      selected: 'all',
      loading: false,
      filters: {},
      paginate: true,
      total: 0,
      meta: 0,
    }
  },

  computed: {
    ...mapState({
      data: (state) => state.diagnostic.serviceRequests,
    }),

    filtering() {
      return [
        { display: `All (${ this.dataCount })`, code: '' },
        { display: 'Active', code: 'active' },
        { display: 'Draft', code: 'draft' },
        { display: 'Completed', code: 'completed' },
      ]
    },
    columns(){
      let column = [
        'Service',
        'Accession no.',
        'Request time',
        'Patient',
        'Status',
      ]
      if (!this.$isCurrentWorkspace('RECEPT') || !this.$isCurrentWorkspace('OPD')) {
        column.push('Action')
      }
      return column

    },
  },

  watch: {
    search: {
      handler(val) {
        if (val) {
          this.loading = true
          this.getData({search: val}).finally(() =>  this.loading = false)
        }
      },
    },
  },

  created() {
    this.refresh()
  },

  methods: {
    ...mapActions({
      getData: 'diagnostic/getServiceRequests',
    }),
    getStatusVariant(status) {
      if (status === 'sample-collected') {
        return 'primary'
      }

      if (status === 'draft' || status === 'revoked') {
        return 'error'
      }

      return 'success'
    },
  },
}
</script>
