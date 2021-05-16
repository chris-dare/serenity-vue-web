<template>
  <div class="grid grid-cols-5 gap-2 lg:gap-4 my-4">
    <PatientCard
      v-for="(dashboard, index) in dashboardTypes"
      :key="index"
      :is-selected="selected === dashboard.value"
      :details="dashboard"
      :type="dashboard.type"
      custom-class="bg-white border-0"
      @click="onCardClick(dashboard.value)"
    />
  </div>
</template>

<script>
import PatientCard from '@/components/appointments/PatientCard'

export default {
  name: 'DefaultPatientActions',

  components: { PatientCard},

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
        },
        {
          label: 'Order Labs',
          description: 'Order patient medical labs',
          type: 'lab',
          value: 'lab',
        },
        {
          label: 'Medication',
          description: 'Prescribe medication and view medication records',
          type: 'medication',
          value: 'medication',
        },
        {
          label: 'View Records',
          description: 'See patient medical record',
          type: 'reference',
          value: 'records',
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
      case 'add_notes':
        this.$trigger('profile:notes:open')
        break
      case 'medication':
        this.$trigger('profile:medication:open')
        break
      case 'lab':
        this.$trigger('profile:test:open')
        break
          
      default:
        break
      }
    },
  },
}
</script>