<template>
  <AppRegisterLayout
    label="New Appointment"
    :nav-items="navItems"
  >
    <router-view />
  </AppRegisterLayout>
</template>

<script>
export default {
  data() {
    return {
      checked: '',
      navItems: [
        { label: 'Select patient', description: 'Existing or new patient', path: 'SelectPatient'},
        { label: 'Clinics, Services', description: 'Choose service', path: 'ClinicsServices'},
        { label: 'Date, Doctor', description: 'Choose your date and doctor', path: 'DateDoctor'},
        { label: 'Payment', description: 'How patient makes payment', path: 'AppointmentPayment'},
        { label: 'Notes', description: 'Any notes to take', path: 'AppointmentNotes'},
        { label: 'Summary', description: 'Overview of appointment', path: 'AppointmentSummary'},
      ],
    }
  },

  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler: function (val) {
        this.checked = val.name
      },
    },
  },
}
</script>
