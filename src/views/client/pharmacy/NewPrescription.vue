<template>
  <div class="max-w-7xl mx-auto">
    <UserDetailsHeader />
    <div class="my-12 flex items-center justify-between">
      <p class="text-xl font-bold">New prescription</p>
    </div>
    <div
      v-if="$route.name == 'Pharmacy:PatientNew'"
      class="bg-white py-8 px-4 my-2 flex items-center justify-between"
    >
      <div class="flex">
        <div class="flex items-center space-x-4">
          <ImageBlock
            :url="patient.url"
            :alt="patient.name"
          />
          <div>
            <p>{{ patient.name }}</p>
            <p class="text-secondary  capitalize">
              {{ patient.gender_age_description }}
            </p>
            <div class="mt-2 flex items-center">
              <div class="bg-green-700 w-3 h-3 rounded-full mr-2" />
              <p>MR No: {{ patient.mr_number }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <SeButton
          @click="newPrescription"
        >
          <Medication class="w-4 h-4 mr-2" />
          New Prescription
        </SeButton>
      </div>
    </div>
    <div
      v-if="$route.name == 'Pharmacy:PatientNew'"
      class="flex bg-white p-2 mb-8"
    >
      <div class="w-1/4 border-r border-serenity-subtle-border border-solid pt-4 px-6">
        <div class="bx--tabs__nav-item--selected mb-2"><div class="bx--tabs__nav-link border-none">Allergies</div></div>
        <div>
          <p
            v-if="!patientAllergies.length"
            class="text-sm py-8 text-gray-400"
          >
            No allergies
          </p>
          <span
            v-for="(allergy, index) in patientAllergies"
            :key="index"
            class="inline-block px-2 bg-gray-200 mr-2 mb-1 rounded-full"
          >
            {{ allergy.code }}
          </span>
        </div>
      </div>
      <div class="w-2/4 px-6  border-r border-serenity-subtle-border border-solid">
        <cv-tabs
          class="se-tabs"
          :container="false"
          aria-label="navigation tab label"
        >
          <cv-tab
            id="tab-1"
            label="Final Diagnosis"
          >
            <div class="py-3 font-bold text-gray-500">
              <div
                v-for="diag in finalDiagnosis"
                :key="diag.id"
                class="py-1"
              >
                {{ diag.condition }}
              </div>
            </div>
          </cv-tab>
          <cv-tab
            id="tab-2"
            label="Provisional Diagnosis"
          >
            <div class="py-3 font-bold text-gray-500">
              <div
                v-for="diag in finalDiagnosis"
                :key="diag.id"
                class="py-1"
              >
                {{ diag.condition }}
              </div>
            </div>
          </cv-tab>
        </cv-tabs>
      </div>
      <div class="w-1/4 pt-4 px-6">
        <div class="bx--tabs__nav-item--selected"><div class="bx--tabs__nav-link border-none">Doctor</div></div>
        <div />
        <div
          v-if="doctor"
          class="py-4 font-bold text-gray-500"
        >
          {{ doctor.name }}
        </div>
      </div>
    </div>
    <ConfirmPrescriptionModal mode="walk-in" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ConfirmPrescriptionModal from '@/components/pharmacy/modals/ConfirmPrescriptionModal'

export default {
  name: 'NewPrescription',

  components: {
    ConfirmPrescriptionModal,
  },

  data() {
    return {
      selected: 'search',
      visible: false,
      visitVisible: false,
      columns: [
        'Brand Name',
        'Drug',
        'Type',
        'Price (GHS)',
        'Action',
      ],
      inventory: {
        loading: false,
        data: [],
      },
    }
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
      provider: (state) => state.auth.provider,
      patient: (state) => state.patients.currentPatient,
      patientAllergies: state => state.patientAllergies.allergies,
    }),
    ...mapGetters({
      cartItemCount: 'checkout/cartItemCount',
      cartItemIds: 'checkout/cartItemIds',
      patientMedications: 'patients/patientMedications',
      currentEncounterDiagnosis: 'encounters/currentEncounterDiagnosis',
    }),
    provisionalDiagnosis() {
      return this.currentEncounterDiagnosis
    },
    finalDiagnosis() {
      return this.currentEncounterDiagnosis
    },
    doctor() {
      const medications = this.activeMedications.filter(el => !!el.practitioner_detail)
      return medications.length > 0 ? medications[0].practitioner_detail : null
    },

    activeMedications() {
      return this.patientMedications.filter(el => el.status == 'active')
    },

    availableActions() {
      const types = [
        {
          label: 'Find a patient',
          description: 'Quickly search for a patient by name',
          type: 'search',
          value: 'search',
        },
        {
          label: 'Non Patient',
          description: 'Dispense drugs to non-hospital patients',
          type: 'search',
          value: 'nonpatient',
        },
      ]

      return types
    },
  },
}
</script>
