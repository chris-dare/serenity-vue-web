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
import { mapActions } from 'vuex'

export default {
  name: 'EncounterActions',

  computed: {
    dashboardTypes() {
      return [
        
        {
          label: 'Review patient',
          description: 'See patient medical record',
          type: 'reference',
          value: 'records',
          path: 'EncounterReview',
        },
        {
          label: 'Add Diagnosis',
          description: 'Add complaints and notes',
          type: 'add',
          value: 'add_notes',
          path: 'EncounterDiagnosis',
        },
        {
          label: 'Order Labs',
          description: 'Order patient medical labs',
          type: 'lab',
          value: 'lab',
          path: 'EncounterLabs',
        },
        {
          label: 'Medication',
          description: 'Prescribe medication and view medication records',
          type: 'medication',
          value: 'medication',
          path: 'EncounterMedications',
        },
        
        // {
        //   label: 'Care Plan',
        //   description: 'See patient medical record',
        //   type: 'care',
        //   value: 'care',
        // },
        // {
        //   label: 'Follow Up',
        //   description: 'Book a follow up appointment',
        //   type: 'followup',
        //   value: 'followup',
        // },
        // {
        //   label: 'Referral',
        //   description: 'Refer the patient to another doctor',
        //   type: 'referral',
        //   value: 'referral',
        // },
        {
          label: 'Close Encounter',
          description: 'End the encounter with patientx',
          type: 'close',
          value: 'close',
        },
      ]
    },
  },

  methods: {
    ...mapActions({
      endEncounter: 'encounters/endEncounter',
    }),
    onCardClick(action) {
      if (action.path) {
        return this.$router.push({ name: action.path})
      }
      switch (action.value) {
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
