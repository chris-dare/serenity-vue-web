<template>
  <AppStatePage
    :loading="loading"
    :error="error"
    class="max-w-7xl mx-auto"
  >
    <div class="space-y-2">
      <PatientInfoCard :editable="false">
        <SeButton
          @click="newPrescription"
        >
          <Medication class="w-4 h-4 mr-2" />
          New Prescription
        </SeButton>
      </PatientInfoCard>

      <DetailPageNav
        :links="links"
      />
      <router-view />
    </div>
  </AppStatePage>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import DetailPageNav from '@/components/patients/DetailPageNav'
import Medication from '@carbon/icons-vue/es/medication/32'
import PatientInfoCard from '@/components/patients/PatientInfoCard'

export default {
  name: 'Patient',

  components: {
    DetailPageNav,
    Medication,
    PatientInfoCard,
  },

  props: {
    id: {
      type: [String, Number],
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
        { label: 'Summary', path: 'Pharmacy:PatientSummary' },
        { label: 'Pending Prescriptions', path: 'Pharmacy:PatientPendingPrescriptions', query: { type: 'existing' }},
        { label: 'Prescriptions', path: 'Pharmacy:PatientPrescriptions' },
        { label: 'Bills', path: 'Pharmacy:PatientBills' },
      ],
    }
  },

  computed: {
    ...mapState({
      patient: (state) => state.patients.currentPatient,
      workspaceType: (state) => state.global.workspaceType,
      provider: (state) => state.auth.provider,
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
    next(vm => {
      vm.initSinglePatientInformation(vm.id)
    })
  },

  created() {
    this.findPatient(this.id)
  },

  beforeRouteLeave (from,to,next) {
    this.refresh()
    next()
  },

  methods: {
    ...mapActions({
      findPatient: 'patients/findPatient',
      getPatient: 'patients/getPatient',
      getMedicationRequests: 'patients/getMedicationRequests',
      refresh: 'patients/refreshPatientDetails',
      setCheckoutPatient: 'checkout/setCheckoutPatient',
    }),

    async initSinglePatientInformation(id) {
      await this.getPatient(id)
      await this.getMedicationRequests({ patient: id })
    },

    newPrescription() {
      this.setCheckoutPatient(this.patient)
      this.$router.push({ name: 'Pharmacy:New', query: { type: 'existing' }})
    },
  },
}
</script>
