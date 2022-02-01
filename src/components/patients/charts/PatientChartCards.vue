<template>
  <div class="space-y-4">
    <div class="grid grid-cols-4 gap-2">
      <ChartCard
        v-for="(chart, index) in charts"
        :key="index"
        :chart="chart"
      />
      <NewChart v-if="false" />
    </div>
    <IPDPatientProfileCharts v-if="$isCurrentWorkspace('IPD')" />
    <div class="grid grid-cols-2 gap-2 my-2">
      <EditableCard
        type="comment"
        title="Diagnosis/Issues"
      >
        <div class="py-4">
          <p
            v-if="!patientDiagnosis.length"
            class="text-sm"
          >
            No diagnosis
          </p>
          <ToggleList
            v-for="(diagnosis, index) in patientDiagnosis.slice(0,6)"
            :key="index"
          >
            <p
              slot="title"
              class="text-serenity-primary"
            >
              {{ diagnosis.condition }} ({{ $date.formatDate(diagnosis.created_at) }})
            </p>
            <p>{{ diagnosis.role | removeDash }}</p>
          </ToggleList>
        </div>
      </EditableCard>
      <EditableCard
        type="pills"
        title="Current Medication"
      >
        <div class="py-4">
          <ToggleList
            v-for="(medication, index) in patientMedications.slice(0,3)"
            :key="index"
          >
            <p
              slot="title"
              class="text-serenity-primary"
            >
              {{ $utils.getFirstData(medication.medication_detail) }} ({{ $date.formatDate(medication.created_at) }})
            </p>
            <p>{{ $utils.getFirstData(medication.medication_request_dosage_instruction, 'period') }} {{ $utils.getFirstData(medication.medication_request_dosage_instruction, 'period_unit') }}</p>
          </ToggleList>
        </div>
      </EditableCard>
      <EditableCard
        type="comment"
        title="Medical conditions"
      >
        <div class="py-4">
          <p
            v-if="!patientPreviousIllness.length"
            class="text-sm"
          >
            No past medical conditions
          </p>
          <ToggleList
            v-for="(illness, index) in patientPreviousIllness"
            :key="index"
          >
            <p
              slot="title"
              class="text-serenity-primary"
            >
              {{ illness.value }}
            </p>
            <p>{{ illness.category | capitalize }} - {{ illness.type | capitalize }}</p>
          </ToggleList>
        </div>
      </EditableCard>
      <EditableCard
        type="pills"
        title="Medications"
      >
        <div class="py-4">
          <p
            v-if="!patientMedications.length"
            class="text-sm"
          >
            No medications
          </p>
          <ToggleList
            v-for="(medication, index) in patientMedications.slice(0,10)"
            :key="index"
          >
            <p
              slot="title"
              class="text-serenity-primary"
            >
              {{ $utils.getFirstData(medication.medication_detail) }} ({{ $date.formatDate(medication.created_at) }}
            </p>
            <p>{{ $utils.getFirstData(medication.medication_request_dosage_instruction, 'period') }} {{ $utils.getFirstData(medication.medication_request_dosage_instruction, 'period_unit') }}</p>
          </ToggleList>

          <router-link
            v-if="patientMedications.length"
            :to="{ name: 'PatientPrescriptions' }"
          >
            View more
          </router-link>
        </div>
      </EditableCard>
      <EditableCard
        type="add"
        title="Allergies"
      >
        <div class="py-4">
          <p
            v-if="!patientAllergies.length"
            class="text-sm"
          >
            No allergies
          </p>
          <ToggleList
            v-for="(allergy, index) in patientAllergies"
            :key="index"
          >
            <p
              slot="title"
              class="text-serenity-primary"
            >
              {{ allergy.code }}
            </p>
            <p>{{ allergy.category | capitalize }} - {{ allergy.type | capitalize }}</p>
          </ToggleList>
        </div>
      </EditableCard>
      <EditableCard title="Social History">
        <SocialHistoryDetails :history="socialHistory" />
      </EditableCard>
    </div>
  </div>
</template>

<script>
import NewChart from './NewChart'
import ChartCard from './ChartCard'
import SocialHistoryDetails from '@/components/patients/details/SocialHistoryDetails'
import IPDPatientProfileCharts from '@/components/ipd/IPDPatientProfileCharts'
import { mapActions, mapGetters, mapState } from 'vuex'


export default {
  name: 'PatientChartCards',

  components: { NewChart, ChartCard, SocialHistoryDetails, IPDPatientProfileCharts },

  computed: {
    ...mapState({
      patientDiagnosis: state => state.patients.patientDiagnosis,
      patientAllergies: state => state.patientAllergies.allergies,
    }),

    ...mapGetters({
      charts: 'encounters/currentPatientVitals',
      patientMedications: 'patients/patientMedications',
      socialHistory: 'encounters/currentPatientSocialHistory',
      patientPreviousIllness: 'patients/patientPreviousIllness',
    }),
  },

  created() {
    this.getDiagnosis(this.$route.params.id)
    this.getAllergies(this.$route.params.id)
  },

  methods: {
    ...mapActions({
      getDiagnosis: 'patients/getDiagnosis',
      getAllergies: 'patientAllergies/getAllergies',
    }),
  },
}
</script>
