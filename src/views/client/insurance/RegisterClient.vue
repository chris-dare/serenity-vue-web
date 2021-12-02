<template>
  <AppRegisterLayout
    label="Register new insurance"
    :nav-items="navItems"
    :checked="checked"
  >
    <router-view />
  </AppRegisterLayout>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'RegisterProvider',

  data() {
    return {
      checked: '',
    }
  },

  computed: {
    navItems() {
      let navItems = [
        { label: 'Company Information', description: 'Basic provider info', path: 'InsuranceInformation'},
        { label: 'Admin Information', description: 'Insurance admin', path: 'InsuranceAdminInformation'},
      ]

      if (this.$route.query.id) {
        navItems.push({ label: 'Verification', description: 'Client Verification', path: 'InsuranceVerification'})
      }

      return navItems
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

  created() {
    if(!this.$route.query.id){
      this.refresh()
    }
  },

  methods: {
    ...mapActions({
      refresh: 'clients/refreshForm',
    }),
  },
}
</script>
