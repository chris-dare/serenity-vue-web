<template>
  <div class="space-y-4">
    <Search
      v-model="search"
      placeholder="Search for patient, enter name or MR number"
    />
    <div
      v-if="!modal"
      class="my-4 flex items-center justify-between"
    >
      <div class="space-x-2 flex items-center">
        <SeButton
          :variant="search === '' ? 'primary' : 'white'"
          @click="search = ''"
        >
          All ({{ patientsCount }})
        </SeButton>
        <!-- <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white mr-2 text-serenity-placeholder"
          v-if="workspaceType !== 'Reception'"
        >
          <div class="w-2 h-2 rounded-full bg-green-700 mr-2"></div>
          Delayed ({{ 1 }})
        </cv-button> -->
        <SeButton
          :variant="search === 'in-patient' ? 'primary' : 'white'"
          @click="search = 'in-patient'"
        >
          <div class="w-2 h-2 rounded-full bg-green-700 mr-2" />
          In-patient ({{ 1 }})
        </SeButton>
        <!-- <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white mr-2 text-serenity-placeholder"
          v-if="workspaceType !== 'Reception'"
        >
          <div class="w-2 h-2 rounded-full bg-warning mr-2"></div>
          Urgent ({{ 1 }})
        </cv-button> -->
        <SeButton
          :variant="search === 'male' ? 'primary' : 'white'"
          @click="search = 'male'"
        >
          Male({{ maleCount }})
          <img
            src="@/assets/img/gender--male 1.svg"
            class="ml-2"
            alt=""
          >
        </SeButton>
        <SeButton
          :variant="search === 'female' ? 'primary' : 'white'"
          @click="search = 'female'"
        >
          Female({{ femaleCount }})
          <img
            src="@/assets/img/gender--female 1.svg"
            class="ml-2"
            alt=""
          >
        </SeButton>
      </div>
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
  },

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

    maleCount() {
      return this.data.filter((p) => p.gender == 'MALE').length
    },

    femaleCount() {
      return this.data.filter((p) => p.gender == 'FEMALE').length
    },
  },

  beforeMount() {
    if (this.modal) {
      this.pageSizes = [5, 10, 15]
      this.pageLength = 5
    }
  },

  mounted() {
    this.paginate = true
    this.searchTerms = ['name', 'mr_number', 'mobile', 'gender']
    this.refresh(false)
  },

  methods: {
    ...mapActions({
      getData: 'patients/getPatients',
    }),
  },
}
</script>
