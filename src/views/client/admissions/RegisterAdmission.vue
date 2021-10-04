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
  name: 'RegisterAdmission',

  data() {
    return {
      checked: '',
    }
  },

  computed: {
    title() {
      return 'New Admission'
    },
    navItems() {
      return[
        { label: 'Select Patient', description: 'Existing or new patient', path: 'AdmissionSelectPatient' },
        { label: 'Wards and pricing', description: 'Choose service', path: 'AdmissionPricing' },
        { label: 'Admission details', description: 'Enter your admission details', path: 'AdmissionDetails' },
        { label: 'Payment', description: 'How patient makes payment', path: 'AdmissionPayment' },
        { label: 'Notes', description: 'Any notes to take', path: 'AdmissionNotes' },
        { label: 'Summary', description: 'Overview of admission', path: 'AdmissionSummary' },
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

  beforeRouteLeave(to, from, next) {
    this.refresh()
    next()
  },

  methods: {
    ...mapActions({
      refresh: 'appointments/refreshCurrentAppointment',
    }),
  },
}
</script>
