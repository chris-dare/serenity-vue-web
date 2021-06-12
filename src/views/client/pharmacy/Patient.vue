<template>
  <AppStatePage
    :loading="loading"
    :error="error"
    class="max-w-7xl mx-auto"
  >
    <div class="w-4/5 mx-auto">
      <div class="bg-white py-8 px-4 my-2 flex items-center justify-between">
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
          <div
            class="bg-serenity-light-gray w-10 h-10 rounded-full ml-6 flex items-center justify-center"
          >
            <img
              src="@/assets/img/edit 1.svg"
              class="w-4 h-4"
            >
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <SeButton
            @click="$trigger('pharmacy:patient_prescription:open', 'create')"
          >
            <Medication class="w-4 h-4 mr-2" />
            New Prescription
          </SeButton>
        </div>
      </div>

      <PatientDetailsNav
        class="mb-8"
        :links="links"
      />
      <router-view />
      <PatientPrescriptionModal :medication-requests="activeMedications" />
    </div>
  </AppStatePage>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import PatientDetailsNav from '@/components/patients/PatientDetailsNav'
import Medication from '@carbon/icons-vue/es/medication/32'
import PatientPrescriptionModal from '@/components/pharmacy/modals/PatientPrescriptionModal'

export default {
  name: 'Patient',

  components: { 
    PatientDetailsNav,
    Medication,
    PatientPrescriptionModal,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      error: null,
      hasEncounter: false,
      visible: false,
      admitModal: false,
      prescriptions: {
        data: [
          {
            drug: 'Hydrocodone 5MG / 500MG tabs',
            quantity: 24,
            instruction: 'Take 1 tablet orally every 4 to 5 hours as needed for pain',
            refill: new Date(),
          },
        ],
        state: null,
      },
      columns: [
        'Drug Name',
        'Quantity',
        'Instruction',
        'Refill',
      ],
      links: [
        { label: 'Prescriptions', path: 'Pharmacy:PatientPrescriptions' },
        { label: 'Summary', path: 'Pharmacy:PatientSummary' },
        { label: 'Chart', path: 'Pharmacy:PatientChart' },
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
    activeMedications() {
      return this.patientMedications.filter(el => el.status == 'active')
    },

    isSelected() {
      return (index) => this.initialSelected === index
    },
  },

  beforeRouteEnter (to, from, next) {
    next(async vm => {
      try {
        vm.loading = true
        await vm.initSinglePatientInformation(vm.id)
        vm.loading = false
      } catch (error) {
        vm.error = error.detail || 'Error loading page. Please check your internet connection and try again.'
        vm.loading = false
      }
      
      
    })
  },

  created() {
    this.findPatient(this.id)
  },

  methods: {
    ...mapActions({
      findPatient: 'patients/findPatient',
    }),
    async initSinglePatientInformation(id) {
      await this.$store.dispatch('patients/getPatient', id)
      this.$store.dispatch('appointments/getAppointments', { filters: { patient: id, ordering: '-start' } }, { root:true })
      this.$store.dispatch('patients/getServiceRequests', id)
      await this.$store.dispatch('patients/getMedicationRequests')
      this.$store.dispatch('patients/getObservations', { refresh:true, filters: { patient: id }})
      this.$store.dispatch('patients/getDiagnosis', id)
      this.$store.dispatch('patients/getNotes', id)
      this.$store.dispatch('patients/getDiagnosticReports')
      this.$store.dispatch('encounters/getEncounters', id , { root:true })
      this.$store.dispatch('resources/getEncounterStatuses', null, { root:true })
      this.$store.dispatch('patients/getReferrals', id , { root:true })
      this.$store.dispatch('resources/getObservationUnitTypes', null, { root:true })
      this.$store.dispatch('resources/getVitalsUnitTypes', null, { root:true })
      this.$store.dispatch('resources/getSocialHistoryUnitTypes', null, { root:true })
      this.$store.dispatch('resources/getSystemExamUnitTypes', null, { root:true })
    },
  },
}
</script>
