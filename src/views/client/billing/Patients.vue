<template>
  <div>
    <div class="w-4/5 mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Patients ({{ patientsCount }})</p>
      </div>

      <Search
        v-model="search"
        placeholder="Search for patient, enter name or MR number"
      />

      <div>
        <DataTable
          ref="table"
          :columns="columns"
          :pagination="pagination"
          :data="filteredData"
          :loading="loading"
          @pagination="actionOnPagination"
        >
          <template #default="{ row }">
            <cv-data-table-cell>
              <div class="flex items-center py-2">
                <InfoImageBlock
                  :label="row.name"
                  :description="row.gender_age_description"
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
                <p>{{ row.recent }}</p>
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
                :to="{ name: 'Billing:Patient', params: { id:row.id } }"
                class="flex items-center cursor-pointer"
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
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import DataMixin from '@/mixins/data'

export default {
  name: 'Patients',

  mixins: [DataMixin],

  data() {
    return {
      rowSelects: null,
      columns: [
        'Patient',
        // 'Weight/Height',
        'Mobile',
        'Last encounter',
        'MR No.',
        'Action',
      ],
      selectedFilter: '',
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
  },

  beforeMount() {
    this.paginate = true
    this.searchTerms = ['name', 'mr_number', 'mobile', 'gender']
    this.refresh(false)
  },

  methods: {
    ...mapActions({
      getData: 'patients/getPatients',
      refreshCurrentPatient: 'patients/refreshCurrentPatient',
    }),
  },
}
</script>]
