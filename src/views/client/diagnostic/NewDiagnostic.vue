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
  name: 'NewDiagnosticRequest',

  data() {
    return {
      checked: '',
    }
  },
  
  computed: {
    title() {
      return this.isUpdate ? 'Update Diagnostic Request' : this.isReschedule ? 'Reschedule Diagnostic Request' : 'New Diagnostic Request'
    },
    isUpdate() {
      return this.$route.query.type === 'update'
    },

    isReschedule() {
      return this.$route.query.type == 'reschedule'
    },

    navItems() {
      if (this.isUpdate) {
        return [
          { label: 'Update Diagnostic Request', description: 'Update existing Diagnostic Request', path: 'DiagnosticRequestUpdate', completed: false, slug: 'select-patient'},
        ]
      }
      return[
        { label: 'Select patient', description: 'Existing or new patient', path: 'DiagnosticSelectPatient', completed: false, slug: 'select-patient'},
        { label: 'Diagnostic Services', description: 'Choose service', path: 'DiagnosticService', completed: false, slug: 'clinics'},
        { label: 'Payment', description: 'How patient makes payment', path: 'DiagnosticPayment', completed: true, slug: 'payment'},
        { label: 'Summary', description: 'Overview of request', path: 'DiagnosticSummary', completed: true, slug: 'summary'},
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

  beforeRouteLeave(to, from, next) {
    this.refresh()
    next()
  },

  methods: {
    ...mapActions({
      getPatients: 'patients/getPatients',
      refresh: 'Diagnostic Requests/refreshCurrentDiagnostic Request',
    }),  
  },
}
</script>
