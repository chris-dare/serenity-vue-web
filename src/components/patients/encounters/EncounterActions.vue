<template>
  <div class="py-4 grid grid-cols-2 gap-2">
    <InfoLinkCard
      v-for="(dashboard, index) in dashboardTypes"
      :key="index"
      :is-selected="$route.name === dashboard.path"
      :details="dashboard"
      :type="dashboard.type"
      custom-class="bg-white border-0"
      @click="onCardClick(dashboard)"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'EncounterActions',

  computed: {
    ...mapState({
      currentPatient: state => state.patients.currentPatient,
    }),

    dashboardTypes() {
      return [
        {
          label: 'Review patient',
          description: 'See patient medical record',
          type: 'reference',
          value: 'route',
          path: 'EncounterReview',
        },
        {
          label: 'Add Diagnosis',
          description: 'Add complaints and notes',
          type: 'add',
          value: 'route',
          path: 'EncounterDiagnosis',
        },
        {
          label: 'Order Labs',
          description: 'Order patient medical labs',
          type: 'lab',
          value: 'route',
          path: 'EncounterLabs',
        },
        {
          label: 'Medication',
          description: 'Prescribe medication and view medication records',
          type: 'medication',
          value: 'route',
          path: 'EncounterMedications',
        },
        
        {
          label: 'Care Plan',
          description: 'See patient medical record',
          type: 'care',
          value: 'route',
          path: 'EncounterCarePlan',
        },
        {
          label: 'Follow Up',
          description: 'Book a follow up appointment',
          type: 'followup',
          value: 'query',
          path: 'ClinicsServices',
        },
        {
          label: 'Referral',
          description: 'Refer the patient to another doctor',
          type: 'referral',
          value: 'route',
          path: 'EncounterReferral',
        },
        {
          label: 'Close Encounter',
          description: 'End the encounter with patient',
          type: 'close',
          value: 'route',
          path: 'EncountersSummary',
          // value: 'close',
        },
      ]
    },
  },

  methods: {
    ...mapActions({
      endEncounter: 'encounters/endEncounter',
      addToCurrentAppointment: 'appointments/addToCurrentAppointment',
    }),

    onCardClick(action) {
      switch (action.value) {
      case 'route':
        this.$router.push({ name: action.path })
        break
      case 'query':
        this.addToCurrentAppointment({ patient: this.currentPatient, appointmentType: 'FOLLOWUP' })
        this.$trigger('book:appointment:open', 'followup')
        break
      case 'close':
        this.end()
        break
            
      default:
        break
      }
    },

    end() {
      this.$trigger('visit:end:open', {
        callback: async () => {
          this.loading = true
          try {
            await this.endEncounter()
            this.$toast.open({
              message: 'Encounter ended successfully',
            })
            this.loading = false
            this.$router.push({ name: 'PatientSummary', params: { id:this.$route.params.id } })
          } catch (error) {
            // empty
            throw error || error.message
          }
        },
      })
    },
  },
}
</script>
