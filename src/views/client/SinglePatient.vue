<template>
  <div class="w-4/5 mx-auto">
    <div class="bg-white py-8 px-4 my-2 flex items-center justify-between">
      <div class="flex">
        <div class="flex items-center">
          <img
            class="w-16 h-16 rounded-full mx-4"
            :src="patient.image"
            alt=""
          />
          <div>
            <p>{{ patient.name }}</p>
            <p class="text-gray-400 text-sm capitalize">
              {{ patient.gender }}, {{ patient.age }} years
            </p>
            <div class="mt-2 flex items-center">
              <div class="bg-green-700 w-3 h-3 rounded-full mr-2"></div>
              <p>Delayed</p>
            </div>
          </div>
        </div>
        <div
          class="bg-serenity-light-gray w-10 h-10 rounded-full ml-6 flex items-center justify-center"
        >
          <img src="@/assets/img/edit 1.svg" class="w-4 h-4" />
        </div>
      </div>
      <div class="flex">
        <cv-button
          size="field"
          kind="primary"
          class="px-4 bg-black hover:bg-black mr-2"
        >
          Add new
          <img
            src="@/assets/img/chevron--sort--down 1.svg"
            class="ml-2"
            alt=""
          />
        </cv-button>
        <cv-button
          kind="primary"
          size="field"
          class="px-4 bg-serenity-primary hover:bg-serenity-primary-highlight mr-2"
        >
          Record a new encounter
          <img src="@/assets/img/add 1.svg" class="ml-2" alt="" />
        </cv-button>
      </div>
    </div>

    <div>
      <cv-tabs
        :open="true"
        :container="false"
        aria-label="navigation tab label"
        class="white-tabs"
      >
        <cv-tab id="queue" label="Summary">
          <div class="mt-2 grid grid-cols-2 gap-2">
            <PatientGeneralInfoCard :patient="patient" />
            <PatientEmergencyContactCard :patient="patient" />
            <PatientSocialInfoCard :patient="patient" />
            <PatientSummaryCard
              title="Payment Method"
              :fields="summaryFields"
            />
          </div>
        </cv-tab>
        <cv-tab id="chart" label="Chart">
          <div class="mt-2">
            <div class="flex justify-between items-center my-2">
              <div class="flex items-center">
                <p>Patient Vitals</p>
                <p class="text-gray-500 text-sm ml-3">Updated: Today</p>
              </div>
              <div class="flex items-center">
                <p class="text-gray-500 mr-3 text-sm">Monthly</p>
                <cv-button
                  size="field"
                  kind="ghost"
                  class="px-4 bg-white hover:bg-white text-sm text-gray-900"
                >
                  Filters
                  <img src="@/assets/img/filter 1.svg" class="ml-2" alt="" />
                </cv-button>
              </div>
            </div>
            <PatientChartCards />
          </div>
        </cv-tab>
        <cv-tab id="patients" label="Encounters"> </cv-tab>
        <cv-tab label="History"> </cv-tab>
        <cv-tab label="Prescriptions">
          <PatientPrescriptions class="mt-2" />
        </cv-tab>
        <cv-tab label="Orders/Billing"> </cv-tab>
        <cv-tab label="Reports"> </cv-tab>
        <cv-tab label="Notes"> </cv-tab>
      </cv-tabs>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PatientGeneralInfoCard from '@/components/patients/PatientGeneralInfoCard'
import PatientEmergencyContactCard from '@/components/patients/PatientEmergencyContactCard'
import PatientSummaryCard from '@/components/patients/PatientSummaryCard'
import PatientSocialInfoCard from '@/components/patients/PatientSocialInfoCard'
import PatientPrescriptions from '@/components/patients/PatientPrescriptions'
import PatientChartCards from '@/components/patients/charts/PatientChartCards'

export default {
  name: 'SinglePatient',

  components: {
    PatientPrescriptions,
    PatientGeneralInfoCard,
    PatientEmergencyContactCard,
    PatientSummaryCard,
    PatientSocialInfoCard,
    PatientChartCards,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState({
      patients: (state) => state.patients.patients,
    }),
    patient() {
      return this.patients[0]
    },
    isSelected() {
      return (index) => this.initialSelected === index
    },
    summaryFields() {
      return [
        { label: 'Method', value: this.$faker().lorem.word() },
        { label: 'Payment Network', value: this.$faker().lorem.word() },
        { label: 'Phone Number', value: this.$faker().lorem.word() },
        { label: 'Name on Account', value: this.$faker().lorem.word() },
        { label: 'Secondary Method', value: this.$faker().lorem.word() },
      ]
    },
  },

  mounted() {
    this.getPatients()
  },

  methods: {
    ...mapActions({
      getPatients: 'patients/getPatients',
    }),
  },
}
</script>
