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
    <div class="flex my-4">
      <PatientCard
        @click="selected = dashboard.value"
        :is-selected="selected === dashboard.value"
        :details="dashboard"
        :type="dashboard.type"
        v-for="(dashboard, index) in dashboardTypes"
        :key="index"
        custom-class="bg-white border-0"
      />
    </div>
    <p class="text-serenity-primary my-6 font-semibold">
      Here are your appointments ({{ appointmentsCount }})
    </p>
    <AppointmentsTable hide-search />
    <GetStartedModal :visible.sync="visible" />
  </div>
</template>

<script>
import PatientCard from '@/components/appointments/PatientCard'
import AppointmentsTable from '@/components/appointments/AppointmentsTable'
import GetStartedModal from '@/components/dashboard/GetStartedModal'
import { mapState } from 'vuex'
export default {
  name: 'Dashboard',

  components: { PatientCard, AppointmentsTable, GetStartedModal },

  data() {
    return {
      selected: 'search',
      visible: false,
      dashboardTypes: [
        {
          label: 'Find a patient',
          description: 'Quickly search for a patient by name',
          type: 'search',
          value: 'search',
        },
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
      ],
    }
  },

  created() {
    if (this.appointmentsCount === 0) {
      this.visible = true
    }
  },

  computed: {
    ...mapState({
      appointmentsCount: (state) => state.appointments.appointmentsCount,
    }),
  },
}
</script>
