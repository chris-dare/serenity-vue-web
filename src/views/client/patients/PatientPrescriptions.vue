<template>
  <div class="py-4">
    <PrescriptionsTable :patient="$route.params.id">
      <template #action="{row}">
        <div
          class="flex items-center cursor-pointer "
          @click="showPrescription(row)"
        >
          View
          <div class="ml-2 w-5 h-5 rounded-full bg-gray-200 flex justify-center items-center">
            <img
              src="@/assets/img/view 1.svg"
              alt=""
            >
          </div>
        </div>
      </template>
    </PrescriptionsTable>
    <!-- TODO awaiting feedback for this-->
    <div v-if="false">
      <Search
        v-model="search"
        placeholder="Search for medication or date or condition"
      />

      <FilterGroup
        v-model="search"
        :filters="filters"
      />
      <div class="bg-white p-3">
        <div class="flex items-center justify-between mb-4">
          <p class=" text-gray-500">Prescriptions</p>
          <div
            v-if="hasActiveEncounter"
            class="bg-serenity-light-gray w-9 h-9 rounded-full ml-6 flex items-center justify-center"
            @click="$trigger('profile:medication:request:open')"
          >
            <img
              src="@/assets/img/pills--add 1.svg"
              class="w-4 h-4"
            >
          </div>
        </div>

        <DataTable
          ref="table"
          :columns="columns"
          :pagination="pagination"
          :data="filteredData"
          class="transparent-table"
          :no-data-label="noDataLabel('prescriptions')"
        >
          <template #default="{ row }">
            <cv-data-table-cell>
              <p class="text-serenity-primary ">{{ $utils.getFirstData(row.medication_detail) }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <p>{{ $utils.getFirstData(row.medication_request_category) }}</p>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>{{ $utils.getFirstData(row.medication_request_dosage_instruction, 'period') }} {{ $utils.getFirstData(row.medication_request_dosage_instruction, 'period_unit') }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div>
                <p>{{ $utils.getFirstData(row.medication_request_dosage_instruction, 'frequency') }} {{ $utils.getFirstData(row.medication_request_dosage_instruction, 'frequency_unit') }}</p>
              </div>
            </cv-data-table-cell>
            <cv-data-table-cell>
              <div
                class="flex items-center cursor-pointer "
                @click="showPrescription(row)"
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
    </div>
    
    <TreatmentPlanModal :visible.sync="treatmentVisible" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import data from '@/mixins/data'
import PrescriptionsTable from '@/components/pharmacy/PrescriptionsTable'

export default {
  name: 'PatientPrescriptions',

  components: {
    TreatmentPlanModal: () => import(/* webpackPrefetch: true */'@/components/patients/modals/TreatmentPlanModal'),
    PrescriptionsTable,
  },

  mixins: [data],

  data() {
    return {
      search: '',
      rowSelects: null,
      columns: [
        'Drug/Proceedure',
        'Type',
        'Duration',
        'Instructions',
        'Action',
      ],
      visible: false,
      prescription: {},
      treatmentVisible: false,
      paginate: true,
    }
  },

  

  computed: {
    ...mapGetters({
      data: 'patients/patientMedications',
      hasActiveEncounter: 'encounters/hasActiveEncounter',
      noDataLabel: 'patients/getCurrentPatientNoDataLabel',
    }),

    filters() {
      return [
        { display: `All (${ this.dataCount })`, code: '' },
        { display: 'Medications', code: 'medications' },
        { display: 'Treatment Plans', code: 'treatment-plans' },
      ]
    },
  },

  created() {
    this.paginate
    this.searchTerms = ['']
  },

  methods: {
    showPrescription(data) {
      this.prescription = data
      this.$trigger('prescription:detail:open', data)
    },
  },
}
</script>
