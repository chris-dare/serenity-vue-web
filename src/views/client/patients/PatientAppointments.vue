<template>
  <div class="py-4">
    <PatientAppointmentTable />
  </div>
</template>

<script>
import PatientAppointmentTable from '@/components/patients/PatientAppointmentTable'
import { mapActions } from 'vuex'
export default {
  name: 'PatientAppointments',

  components: { PatientAppointmentTable },

  created() {
    this.getAppointments({ patient: this.$route.params.id, ordering: '-start' })
  },

  methods: {
    ...mapActions({
      getAppointments: 'appointments/getAppointments',
    }),
  },
}
</script>
