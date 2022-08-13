<template>
  <div class="py-4">
    <PatientAppointmentTable />
  </div>
</template>

<script>
import PatientAppointmentTable from '@/components/patients/PatientAppointmentTable'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PatientAppointments',

  components: { PatientAppointmentTable },

  computed: {
    ...mapState({
      patient: state => state.patients.currentPatient,
    }),
  },

  created() {
    this.getAppointments({ patient_id: this.patient.uuid, ordering: '-start' })
  },

  methods: {
    ...mapActions({
      getAppointments: 'appointments/getAppointments',
    }),
  },
}
</script>
