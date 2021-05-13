<template>
  <div class="w-4/5 mx-auto">
    <div>
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Appointments ({{ appointmentsCount || 0 }})</p>
        <router-link
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
import { mapState } from 'vuex'
import AppointmentsTable from '@/components/appointments/AppointmentsTable'

export default {
  name: 'Appointments',

  components: { AppointmentsTable },

  computed: {
    ...mapState({
      appointmentsCount: (state) => state.appointments.appointmentsCount,
    }),
  },
}
</script>
