<template>
  <div
    class="max-w-7xl mx-auto"
  >
    <div>
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Appointments ({{ appointmentsCount || 0 }})</p>
        <router-link
          v-if="$userCan('appointments.write')"
          :to="{ name: 'SelectPatient' }"
          tag="cv-button"
          class="bg-serenity-primary hover:bg-serenity-primary-highlight px-4"
          kind="primary"
        >
          Add new appointment
          <Add class="ml-4 w-5 h-5 text-white" />
        </router-link>
      </div>

      <AppointmentsTable />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppointmentsTable from '@/components/appointments/AppointmentsTable'

export default {
  name: 'Appointments',

  components: { AppointmentsTable },

  computed: {
    ...mapState({
      appointmentsCount: (state) => state.appointments.appointmentsCount,
    }),
  },

  methods: {
    ...mapActions({
      refresh: 'appointments/refreshCurrentAppointment',
    }),
    createAppointment() {
      this.refresh()
      this.$router.push({ name: 'SelectPatient' })
    },
  },
}
</script>
