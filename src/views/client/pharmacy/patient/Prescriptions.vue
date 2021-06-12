<template>
  <div>
    <div class="text-xl font-bold mb-4">
      Prescribed Medications
    </div>
    <div class="space-x-2 flex items-center mb-2">
      <SeButton
        :variant="filteredStatus === '' ? 'primary' : 'white'"
        @click="filteredStatus = ''"
      >
        All ({{ prescriptionCount }})
      </SeButton>
      <SeButton
        :variant="filteredStatus === 'active' ? 'primary' : 'white'"
        @click="filteredStatus = 'active'"
      >
        <div class="w-2 h-2 rounded-full bg-green-700 mr-2" />
        Active ({{ activeMedicationCount }})
      </SeButton>
      <SeButton
        :variant="filteredStatus === 'completed' ? 'primary' : 'white'"
        @click="filteredStatus = 'completed'"
      >
        <div class="w-2 h-2 rounded-full bg-green-700 mr-2" />
        Complete ({{ completeMedicationCount }})
      </SeButton>
    </div>
    <div>
      <DataTable
        ref="table"
        :columns="columns"
        :data="filteredMedications"
        :loading="loading"
      >
        <template #default="{ row }">
          <cv-data-table-cell>
            <div>
              <p>{{ row.medication_detail[0].display }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.quantity }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.medication_request_notes[0].display }}</p>
            </div>
          </cv-data-table-cell>
          <cv-data-table-cell>
            <div>
              <p>{{ row.next_refill }}</p>
            </div>
          </cv-data-table-cell>
        </template>
      </DataTable>
    </div>
    <div class="flex items-center justify-between mt-4 mb-6">
      <cv-button
        class="border-gray-800 bg-gray-800 text-white focus:bg-gray-700 hover:bg-gray-700 px-6"
        kind="tertiary"
        @click="$router.back()"
      >
        Go Back
      </cv-button>
      <cv-button-skeleton
        v-if="loading"
      />
      <cv-button
        v-else
        kind="primary"
        class="bg-serenity-primary hover:bg-serenity-primary-highlight  ml-6"
        @click="$trigger('pharmacy:patient_prescription:open')"
      >
        Give drugs
      </cv-button>
    </div>
  </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Prescriptions',
  data() {
    return {
      filteredStatus: 'active',
      loading: false,
      columns: [
        'Drug Name',
        'Quantity',
        'Instruction',
        'Refill',
      ],

    }
  },
  computed: {
    ...mapState({
      patient: (state) => state.patients.currentPatient,
      workspaceType: (state) => state.global.workspaceType,
    }),
    ...mapGetters({
      patientMedications: 'patients/patientMedications',
    }),
    filteredMedications() {
      if(this.filteredStatus == '')return this.patientMedications
      return this.patientMedications.filter(el => el.status == this.filteredStatus)
    },
    activeMedicationCount() {
      return this.patientMedications.filter(el => el.status == 'active').length
    },
    completeMedicationCount() {
      return this.patientMedications.filter(el => el.status == 'completed').length
    },
    availableActions() {
      const types = [
        {
          label: 'View Prescription',
          description: 'See all prescribed drugs',
          type: 'medication',
          value: 'search',
        },
        {
          label: 'New prescription',
          description: 'See all prescribed drugs',
          type: 'medication',
          value: 'new',
        },
      ]

      return types
    },
    prescriptionCount() {
      return this.patientMedications.length
    },

    isSelected() {
      return (index) => this.initialSelected === index
    },
  },
}
</script>

