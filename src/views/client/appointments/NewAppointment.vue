<template>
  <AppRegisterLayout
    :label="title"
    :nav-items="navItems"
    :checked="checked"
  >
    <router-view />
  </AppRegisterLayout>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'NewAppointment',

  data() {
    return {
      checked: '',
    }
  },
  
  computed: {
    title() {
      return this.isUpdate ? 'Update Appointment' : 'New Appointment'
    },
    isUpdate() {
      return this.$route.name.toLowerCase().includes('update')
    },

    isReschedule() {
      return this.$route.type == 'reschedule'
    },

    navItems() {
      if (this.isUpdate) {
        return[
          { label: 'Update Appointment', description: 'Update existing appointment', path: 'AppointmentUpdate', completed: false, slug: 'select-patient'},
        ]
      }
      return[
        { label: 'Select patient', description: 'Existing or new patient', path: 'SelectPatient', completed: false, slug: 'select-patient'},
        { label: 'Clinics, Services', description: 'Choose service', path: 'ClinicsServices', completed: false, slug: 'clinics'},
        { label: 'Date, Doctor', description: 'Choose your date and doctor', path: 'DateDoctor', completed: false, slug: 'doctor'},
        //   { label: 'Payment', description: 'How patient makes payment', path: 'AppointmentPayment', completed: false, slug: 'payment'},
        { label: 'Notes', description: 'Any notes to take', path: 'AppointmentNotes', completed: false, slug: 'notes'},
        { label: 'Summary', description: 'Overview of appointment', path: 'AppointmentSummary', completed: false, slug: 'overview'},
      ]
    },
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

  beforeMount() {
    this.getPatients(false)
  },

  methods: {
    ...mapActions({
      getPatients: 'patients/getPatients',
    }),  
  },
}
</script>
