<template>
  <div class="py-4">
    <PatientAppointmentTable />
  </div>
</template>

<script>
import PatientAppointmentTable from '@/components/patients/PatientAppointmentTable'
export default {
  name: 'PatientAppointments',

  components: { PatientAppointmentTable },
}
</script>
