<template>
  <div>
    <Search
      v-model="search"
      placeholder="Search for medication or date or condition"
    />
    <div class="my-4 flex items-center justify-between">
      <div class="space-x-2 flex items-center">
        <SeButton>
          All ({{ dataCount }})
        </SeButton>
        <SeButton
          v-if="false"
          variant="white"
          @click="visible = !visible"
        >
          <div class="w-2 h-2 rounded-full bg-green-700 mr-2" />
          Medications ({{ 1 }})
        </SeButton>
        <SeButton
          v-if="false"
          variant="white"
          @click="treatmentVisible = !treatmentVisible"
        >
          <div class="w-2 h-2 rounded-full bg-warning mr-2" />
          Treatment plans ({{ 1 }})
        </SeButton>
      </div>
    </div>
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
    <PrescriptionModal />
    <TreatmentPlanModal :visible.sync="treatmentVisible" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import data from '@/mixins/data'

export default {
  name: 'PatientPrescriptions',

  components: {
    PrescriptionModal: () => import('@/components/patients/modals/PrescriptionModal'),
    TreatmentPlanModal: () => import('@/components/patients/modals/TreatmentPlanModal') },

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
    }
  },

  

  computed: {
    ...mapGetters({
      data: 'patients/patientMedications',
      hasActiveEncounter: 'encounters/hasActiveEncounter',
    }),
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
