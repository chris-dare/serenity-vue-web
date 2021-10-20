<template>
  <div class="space-y-4">
    <Search
      v-model="filter"
      placeholder="Search for patient, enter name or MR number"
    />
    <div
      v-if="!modal"
      class="my-4 flex items-center justify-between"
    >
      <FilterGroup
        v-model="search"
        :filters="filters"
      />
      <FilterDropdown
        v-if="false"
        v-model="selectedFilter"
      />
    </div>

    <div>
      <DataTable
        ref="table"
        :columns="columns"
        :pagination="pagination"
        :data="filteredData || []"
        :loading="loading"
        @pagination="actionOnPagination"
      >
        <template #default="{ row }">
          <cv-data-table-cell>
            <div class="flex items-center py-2">
              <InfoImageBlock
                :label="row.name"
                :description="row.gender_age_description"
                :url="row.photo"
                size="base"
              />
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.phone }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ $date.formatDate(row.last_encounter) || 'N/A' }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.mr_number }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <router-link
              tag="div"
              :to="{ name: route, params: { id: row.id} }"
              class="flex items-center cursor-pointer"
              :disabled="!$userCan('patient.read')"
            >
              View
              <div class="ml-2 w-5 h-5 rounded-full bg-gray-200 flex justify-center items-center">
                <img
                  src="@/assets/img/view 1.svg"
                  alt=""
                >
              </div>
            </router-link>
          </cv-data-table-cell>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import DataMixin from '@/mixins/data'
import debounce from 'lodash/debounce'
export default {
  name: 'PatientsTable',

  mixins: [DataMixin],

  props: {
    modal: {
      type: Boolean,
      default: false,
    },

    route: {
      type: String,
      default: 'PatientSummary',
    },

    filters: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      rowSelects: null,
      columns: [
        'Patient',
        'Mobile',
        'Last encounter',
        'MR No.',
        'Action',
      ],
      selectedFilter: '',
      filter: '',
      searchTerms: ['gender'],
    }
  },
  
  computed: {
    ...mapState({
      patientsCount: (state) => state.patients.patientsCount,
      workspaceType: (state) => state.global.workspaceType,
    }),

    ...mapGetters({
      data: 'patients/patients',
    }),

    maleCount() {
      return this.data.filter((p) => p.gender == 'MALE').length
    },

    femaleCount() {
      return this.data.filter((p) => p.gender == 'FEMALE').length
    },
  },

  watch: {
    filter(search) {
      this.searchPatients(search)
    },
  },

  mounted() {
    this.paginate = true
    this.pageLength = 10
    this.refresh(false)
  },

  methods: {
    ...mapActions({
      getData: 'patients/getPatients',
      searchPatientsStore: 'patients/searchPatients',
    }),

    searchPatients: debounce(function(search) {
      this.searchPatientsStore({ search })
    }, 300, false),
  },
}
</script>
