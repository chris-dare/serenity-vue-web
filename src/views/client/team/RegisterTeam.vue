<template>
  <AppRegisterLayout
    label="Register new practitioner"
    :nav-items="navItems"
    :checked="checked"
  >
    <router-view />
  </AppRegisterLayout>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RegisterTeam',

  data() {
    return {
      checked: '',
      navItems: [
        { label: 'Biodata', description: 'Basic information', path: 'TeamBiodata'},
        { label: 'Contact Information', description: 'Phone and location', path: 'TeamContactInformation'},
        { label: 'Roles & Permissions', description: 'Team identification and roles', path: 'TeamIdentification'},
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

  beforeRouteEnter (to, from, next) {
    next(async vm => {
      try {
        if (!to.query.id) return
        vm.loading = true
        await vm.getUser(to.query.id)
        vm.loading = false
      } catch (error) {
        vm.error = error.detail || 'Error loading page. Please check your internet connection and try again.'
        vm.loading = false
      }
    })
  },

  methods: {
    ...mapActions({
      getUser: 'practitioners/getUser',
    }),
  },
}
</script>
