<template>
  <div>
    <PatientInfoCard>
      <div class="flex space-x-2 items-center">
        <SeButton
          :to="{ name: 'VirtualCareChat', params: { id: $route.params.id, care: 1 } }"
          variant="secondary"
        >
          Chat care
        </SeButton>
        <SeButton
          :to="{ name: 'VirtualCareVideo', params: { id: $route.params.id, care: 1 } }"
          variant="warning"
        >
          Video Care
        </SeButton>
      </div>
    </PatientInfoCard>

    <div class="space-y-4 my-6">
      <p class="text-serenity-primary font-semibold">
        Perform action
      </p>
      <div class="grid grid-cols-5 gap-2 lg:gap-4 my-4">
        <InfoLinkCard
          v-for="(dashboard, index) in dashboardTypes"
          :key="index"
          :is-selected="selected === dashboard.value"
          :details="dashboard"
          :type="dashboard.type"
          custom-class="bg-white border-0"
          @click="onCardClick(dashboard.value)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PatientInfoCard from '@/components/patients/PatientInfoCard'

export default {
  name: 'Patient',

  components: { PatientInfoCard },

  data() {
    return {
      selected: '',
    }
  },

  computed: {
    dashboardTypes() {
      return [
        {
          label: 'Add Notes',
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
        {
          label: 'Care Plan',
          description: 'See patient medical record',
          type: 'care',
          value: 'care',
        },
        {
          label: 'Follow Up',
          description: 'Book a follow up appointment',
          type: 'followup',
          value: 'followup',
        },
        {
          label: 'Referral',
          description: 'Refer the patient to another doctor',
          type: 'referral',
          value: 'referral',
        },
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
      switch (action) {
      case 'add':
        this.$trigger('lab:add:open')
        break
      case 'view':
        this.$trigger('lab:view:open')
        break
          
      default:
        break
      }
    },
  },
}
</script>