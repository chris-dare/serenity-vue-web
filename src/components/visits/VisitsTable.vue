<template>
  <div class="space-y-4">
    <Search
      v-if="!hideSearch"
      v-model="search"
      placeholder="Search for visit"
    />

    <DataTable
      :columns="columns"
      :data="filteredData"
      :loading="loading"
      no-data-label="You have no visits"
    >
      <template #default="{row}">
        <cv-data-table-cell>
          <div class="py-2">
            <InfoImageBlock
              :label="concatData(row.patient_detail, ['first_name', 'lastname'])"
              :description="row.patient_detail.mobile"
            />
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ $date.formatDate(row.arrived_at, 'yyyy/MM/dd') }}</p>
            <p class="text-secondary text-xs">{{ $date.formatDate(row.arrived_at, 'HH:mm a') }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <p>{{ row.visit_class | capitalize }}</p>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div>
            <Tag>{{ row.status }}</Tag>
          </div>
        </cv-data-table-cell>
        <cv-data-table-cell>
          <div class="flex items-center cursor-pointer space-x-6">
            <router-link
              class="flex items-center cursor-pointer space-x-2"
              :to="{ name: route, params: { id: row.patient }}"
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
            </router-link>
          </div>
        </cv-data-table-cell>
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataMixin from '@/mixins/data'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'VisitsTable',

  mixins: [DataMixin],

  props: {
    hideSearch: {
      type: Boolean,
      default: false,
    },

    route: {
      type: String,
      default: 'PatientSummary',
    },
  },

  data() {
    return {
      columns: [
        'Patient',
        'MR Number',
        'Type',
        'Service',
        'Action',
      ],
      selectedAppointment: {},
    }
  },

  computed: {
    ...mapState({
      data: (state) => state.visits.visits,
    }),
  },

  beforeMount() {
    if (this.hideSearch) {
      this.pageSizes = [5, 10, 15]
      this.pageLength = 5
    }
    this.paginate = true
    this.searchTerms = ['']
    this.refresh()
  },

  methods: {
    ...mapActions({
      getData: 'visits/getVisits',
    }),
  },
}
</script>
