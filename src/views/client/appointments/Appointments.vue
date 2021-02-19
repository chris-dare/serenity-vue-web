<template>
  <div class="w-4/5 mx-auto">
    <div>
      <div class="flex items-center justify-between">
        <p class="text-xl font-bold">Appointments ({{ 23 }})</p>
        <router-link
          :to="{ name: 'SelectPatient' }"
          tag="cv-button"
          class="bg-serenity-primary hover:bg-serenity-primary-highlight px-4"
          kind="primary"
        >
          Add new appointment
          <img
            class="ml-4 w-5 h-5"
            src="@/assets/img/add 1.svg"
            alt=""
          >
        </router-link>
      </div>

      <AppointmentsTable />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AppointmentsTable from '@/components/appointments/AppointmentsTable'
export default {
  name: 'Appointments',

  components: { AppointmentsTable },

  mounted() {
    this.getAppointments()
  },

  methods: {
    ...mapActions({
      getAppointments: 'appointments/getAppointments',
    }),
  },
}
</script>
