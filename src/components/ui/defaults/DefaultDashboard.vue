<template>
  <div>
    <p class="text-serenity-primary my-6 font-semibold">
      What would you like to do?
    </p>
    <div class="grid grid-cols-5 gap-2 lg:gap-6 my-4">
      <InfoLinkCard
        v-for="(dashboard, index) in dashboardTypes"
        :key="index"
        :is-selected="selected === dashboard.value"
        :details="dashboard"
        :type="dashboard.type"
        custom-class="bg-white border-0"
        @click="change(dashboard)"
      />
    </div>
    <p class="text-serenity-primary my-6 font-semibold">
      Here are your appointments ({{ appointmentsCount }})
    </p>
    <AppointmentsTable hide-search />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppointmentsTable from '@/components/appointments/AppointmentsTable'
export default {
  name: 'DefaultDashboard',

  components: { AppointmentsTable },

  data() {
    return {
      selected: '',
      visible: false,
      visitVisible: false,
    }
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
      appointmentsCount: (state) => state.appointments.appointmentsCount,
    }),

    dashboardTypes() {
      const types = [
        {
          label: 'Find a patient',
          description: 'Quickly search for a patient by name',
          type: 'search',
          value: 'search',
        },
      ]

      if (this.workspaceType === 'RECEPT') {
        types.push({
          label: 'Start patient visit',
          description: 'Start visit for walk-in or appointments',
          type: 'destination',
          value: 'visit',
        })
      }

      types.push(
        {
          label: 'Book appointment',
          description: 'Help a patient schedule an appointment',
          type: 'schedule',
          value: 'schedule',
        },
        {
          label: 'Register a patient',
          description: 'Create record for a new patient',
          type: 'newpatient',
          value: 'register',
        },
        {
          label: 'Book COVID-19 test',
          description: 'Schedule a patient for COVID test',
          type: 'book',
          value: 'book',
        },
      )

      

      return types
    },
  },

  methods: {
    change(dashboard) {
      this.selected = dashboard.value

      switch (dashboard.value) {
      case 'visit':
        this.$trigger('visit:start:open')
        break
      case 'register':
        this.$router.push({ name: 'Biodata'})
        break
      case 'schedule':
        this.$router.push({ name: 'SelectPatient'})
        break
      case 'search':
        this.$trigger('search:patients:open')
        break
      
      default:
        break
      }
      
    },
  },
}
</script>
