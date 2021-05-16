<template>
  <div>
    <Search
      v-model="search"
      placeholder="Search for patient, enter name or MR number"
    />
    <div class="my-4 flex items-center justify-between">
      <div>
        <cv-button
          kind="primary"
          size="field"
          class="px-4 bg-serenity-primary hover:bg-serenity-primary-highlight mr-2"
          @click="search = ''"
        >
          All ({{ patientsCount }})
        </cv-button>
        <!-- <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white mr-2 text-serenity-placeholder"
          v-if="workspaceType !== 'Reception'"
        >
          <div class="w-2 h-2 rounded-full bg-green-700 mr-2"></div>
          Delayed ({{ 1 }})
        </cv-button> -->
        <cv-button
          size="field"
          kind="ghost"
          class="px-4 bg-white hover:bg-white mr-2 text-serenity-placeholder"
          @click="search = 'in-patient'"
        >
          <div class="w-2 h-2 rounded-full bg-green-700 mr-2" />
          Active ({{ 1 }})
        </cv-button>
      </div>
    </div>

    <div>
      <DataTable
        ref="table"
        :columns="columns"
        :pagination="{
          numberOfItems: patientsCount,
        }"
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
              :to="{name: 'Pharmacy:Patient', params: {id: row.id}}"
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

  mounted() {
    this.paginate = true
    this.searchTerms = ['name', 'mr_number', 'mobile']
    this.refresh()
  },

  methods: {
    ...mapActions({
      getData: 'patients/getPatients',
    }),
  },
}
</script>
