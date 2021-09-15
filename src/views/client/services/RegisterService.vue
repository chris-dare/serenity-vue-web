<template>
  <AppRegisterLayout
    label="Add a new service"
    :nav-items="navItems"
    :checked="checked"
  >
    <router-view />
  </AppRegisterLayout>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'RegisterService',

  data() {
    return {
      navItems: [
        { label: 'Service Information', description: 'Name, categories, locations', path: 'ServiceInformation'},
        { label: 'Service Pricing', description: 'Type and prices', path: 'ServicePricing'},
        { label: 'Service Availability', description: 'Available and unavailable dates', path: 'ServiceAvailability'},
      ],
      checked: '',
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

  beforeRouteEnter (to, from, next) {
    next(async vm => {
      try {
        vm.getCurrencies()

        if (!to.query.id) return
        vm.loading = true
        await vm.getService(to.query.id)
        vm.loading = false
      } catch (error) {
        vm.error = error.detail || 'Error loading page. Please check your internet connection and try again.'
        vm.loading = false
      }
    })
  },

  created() {
    this.getDiagnosticLabProceedures()
    this.getServiceRequestSectionTypes()
    this.getServiceRequestCategoryTypes()
    this.getGenericPeriodUnitTypes()
  },

  methods: {
    ...mapActions({
      getService: 'services/getService',
      getCurrencies: 'resources/getCurrencies',
      getDiagnosticLabProceedures: 'resources/getDiagnosticLabProceedures',
      getServiceRequestSectionTypes: 'resources/getServiceRequestSectionTypes',
      getServiceRequestCategoryTypes: 'resources/getServiceRequestCategoryTypes',
      getGenericPeriodUnitTypes: 'resources/getGenericPeriodUnitTypes',
    }),
  },
}
</script>
