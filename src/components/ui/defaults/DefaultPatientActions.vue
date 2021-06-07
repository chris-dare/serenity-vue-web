<template>
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DefaultPatientActions',


  data() {
    return {
      selected: '',
    }
  },

  computed: {
    ...mapGetters({
      hasActiveEncounter: 'encounters/hasActiveEncounter',
    }),
    types() {
      return this.dashboardTypes.filter(type => !type.hide)
    },
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
          hide: !this.hasActiveEncounter,
        },
        {
          label: 'Medication',
          description: 'Prescribe medication and view medication records',
          type: 'medication',
          value: 'medication',
          hide: !this.$userCan('medication.orders.write'),
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
          hide: !this.$userCan('appointments.write'),
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
          hide: !this.hasActiveEncounter,
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
        this.$trigger('profile:medication:request:open')
        break
      case 'lab':
        this.$trigger('service:request:open', 'laboratory-procedure')
        break
      case 'followup':
        this.$router.push({ name: 'SelectPatient' })
        break
          
      default:
        break
      }
    },
  },
}
</script>