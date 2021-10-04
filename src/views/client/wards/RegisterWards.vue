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
  name: 'RegisterWard',

  data() {
    return {
      checked: '',
    }
  },

  computed: {
    title() {
      return 'Add new ward'
    },
    navItems() {
      return[
        { label: 'Ward Information', description: 'Name, categories, locations', path: 'WardInformation' },
        { label: 'Ward Pricing', description: 'Type and prices', path: 'WardPricing' },
        { label: 'Ward Availability', description: 'Available and unavailable dates', path: 'WardAvailability' },
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
      refresh: 'services/refreshCurrentService',
    }),
  },
}
</script>
