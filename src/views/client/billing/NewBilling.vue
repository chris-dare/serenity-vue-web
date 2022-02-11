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
  name: 'NewBillingRequest',

  data() {
    return {
      checked: '',
    }
  },
  
  computed: {
    title() {
      return this.isUpdate ? 'Update Billing Request' : this.isReschedule ? 'Reschedule Billing Request' : 'Raise bill'
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
          { label: 'Update Billing Request', description: 'Update existing Billing Request', path: 'BillingRequestUpdate', completed: false, slug: 'select-patient'},
        ]
      }
      return[
        { label: 'Select patient', description: 'Existing or new patient', path: 'BillingSelectPatient', completed: false, slug: 'select-patient'},
        { label: 'Billing Services', description: 'Choose serviceand tiers', path: 'BillingService', completed: false, slug: 'clinics'},
        { label: 'Payment', description: 'How patient makes payment', path: 'BillingPayment', completed: true, slug: 'payment'},
        { label: 'Summary', description: 'Overview of request', path: 'BillingSummary', completed: true, slug: 'summary'},
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
      refresh: 'requests/refreshCurrentDiagnostic',
    }),  
  },
}
</script>
