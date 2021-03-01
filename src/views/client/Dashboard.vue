<template>
  <div class="w-4/5 mx-auto">
    <div class="flex justify-between items-center">
      <p class="text-secondary font-semibold text-xl">
        Hello, <span class="text-primary">Dr. Grey Strep</span>
      </p>
      <div>
        <p class="text-xs">
          {{ $date.formatDate(Date.now(), "EEEE, MMM dd, yyyy") }}
        </p>
        <p class="font-semibold">
          {{ $date.formatDate(Date.now(), "HH:mm a") }}
        </p>
      </div>
    </div>
    <p class="text-serenity-primary my-6 font-semibold">
      What would you like to do?
    </p>
    <div class="grid grid-cols-5 gap-2 lg:gap-6 my-4">
      <PatientCard
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
    <GetStartedModal :visible.sync="visible" />
    <StartVisitModal :visible.sync="visitVisible" />
  </div>
</template>

<script>
import PatientCard from '@/components/appointments/PatientCard'
import AppointmentsTable from '@/components/appointments/AppointmentsTable'
import GetStartedModal from '@/components/dashboard/GetStartedModal'
import StartVisitModal from '@/components/appointments/StartVisitModal'
import { mapState } from 'vuex'
export default {
  name: 'Dashboard',

  components: { PatientCard, AppointmentsTable, GetStartedModal, StartVisitModal },

  data() {
    return {
      selected: 'search',
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

      if (this.workspaceType === 'Reception') {
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

  created() {
    // if (this.appointmentsCount === 0) {
    //   this.visible = true
    // }
  },

  methods: {
    change(dashboard) {
      this.selected = dashboard.value

      if (dashboard.value === 'visit') {
        this.visitVisible = true
      }

      if (dashboard.value === 'register') {
        this.$router.push({ name: 'Biodata'})
      }

      if (dashboard.value === 'schedule') {
        this.$router.push({ name: 'SelectPatient'})
      }
      
    },
  },
}
</script>
