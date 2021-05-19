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
    onCardClick(action) {
      if (action.path) {
        return this.$router.push({ name: action.path})
      }
      switch (action) {
      case 'close':
        this.$trigger('encounter:close')
        break
          
      default:
        break
      }
    },
  },
}
</script>
