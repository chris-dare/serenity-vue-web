<template>
  <AppRegisterLayout
    label="New Appointment"
    :nav-items="navItems"
  >
    <router-view />
  </AppRegisterLayout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      navItems: 'appointments/navItems',
    }),
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
