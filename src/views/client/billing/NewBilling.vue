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
  name: 'NewBilling',

  data() {
    return {
      checked: '',
    }
  },
  
  computed: {
    title() {
      return this.isBillCreate ? 'Create bill' : 'Raise bill'
    },

    isBillCreate() {
      return this.$route.query.type === 'create'
    },

    navItems() {
      return [
        { label: 'Select patient', description: 'Existing or new patient', path: 'BillingSelectPatient', completed: false, slug: 'select-patient'},
        { label: 'Billing Services', description: 'Choose service and tiers', path: 'BillingService', completed: false, slug: 'clinics'},
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

  mounted() {
    this.getDiagnosticLabProceedures()
  },

  beforeRouteLeave(to, from, next) {
    this.refresh()
    next()
  },

  methods: {
    ...mapActions({
      refresh: 'checkout/refreshCheckout',
      addToStoreData: 'checkout/addToCheckout',
      getDiagnosticLabProceedures: 'resources/getDiagnosticLabProceedures',
    }),  
  },
}
</script>
