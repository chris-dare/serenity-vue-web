<template>
  <div>
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
