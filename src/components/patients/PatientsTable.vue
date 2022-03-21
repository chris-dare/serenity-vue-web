<template>
  <div class="space-y-4">
    <Search
      v-model="params.search"
      placeholder="Search for patient, enter name or MR number"
      @input="searchData"
    />
    <div
      v-if="!modal"
      class="my-4 flex items-center justify-between"
    >
      <!-- <FilterGroup
        v-model="params.status"
        :filters="filters"
        @input="refresh"
      /> -->
      <FilterDropdown
        v-if="false"
        v-model="selectedFilter"
        @input="refresh"
      />
      <SeButton
        v-if="selectedPatients.length"
        :icon="link"
        @click="$trigger('patients:link:open', selectedPatients)"
      >
        Link
      </SeButton>
    </div>

    <div>
      <DataTable
        ref="table"
        :columns="columns"
        :pagination="pagination"
        :data="data"
        :loading="loading"
        multiple-select
        :selected.sync="selectedPatients"
        @pagination="actionOnPagination"
      >
        <template #default="{ row }">
          <cv-data-table-cell>
            <div class="flex items-center py-2">
              <InfoImageBlock
                :label="$utils.customNameLabel(row || row.user) | capitalize"
                :description="`${$utils.concatData(row, ['gender', 'age'], ', ')} ${row.age ? 'years' : ''}`"
                :url="row.photo"
                size="base"
              />
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.mobile }}</p>
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
            <div
              v-if="$userCan('patient.read')"
              class="flex items-center cursor-pointer"
              @click="viewPatient({...row})"
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
    
    <LinkPatientsModal />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DataMixin from '@/mixins/paginated'
import Link from '@carbon/icons-vue/es/link/16'
import LinkPatientsModal from '@/components/patients/modals/LinkPatientsModal'

export default {
  name: 'PatientsTable',

  components: { LinkPatientsModal },

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

    query: {
      type: Object,
      default: null,
    },

    filters: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      selectedPatients: [],
      columns: [
        'Patient',
        'Mobile',
        'Last encounter',
        'MR No.',
        'Action',
      ],
      selectedFilter: '',
      link: Link,
    }
  },

  computed: {
    ...mapState({
      total: (state) => state.patients.patientsCount,
      data: (state) => state.patients.patients,
      meta: (state) => state.patients.patientsMeta,
      workspaceType: (state) => state.global.workspaceType,
    }),
  },

  beforeMount() {
    if (this.modal) {
      this.pageSizes = [5, 10, 15]
      // this.params.page_size = 5
      this.params.useStore = true
    }
  },

  mounted() {
    this.refresh()
  },

  methods: {
    ...mapActions({
      getData: 'patients/getPatients',
      searchPatientsStore: 'patients/searchPatients',
      addToStoreData: 'patients/addToCurrentPatient',
    }),

    viewPatient(row){
      this.addToStoreData({...row})
      this.$router.push({ name: this.route, params: { id: row.id}, query: this.query})
    },
  },
}
</script>
