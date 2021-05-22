<template>
  <AppRegisterLayout
    label="Register new patient"
    :nav-items="navItems"
    :checked="checked"
  >
    <router-view />
  </AppRegisterLayout>
</template>

<script>
export default {
  data() {
    return {
      checked: '',
      navItems: [
        { label: 'Biodata', description: 'Patient biological information', path: 'Biodata'},
        { label: 'Contact Information', description: 'Phone and location of patient', path: 'ContactInfo'},
        { label: 'Emergency Contact', description: 'Family and friends', path: 'EmergencyContact'},
        { label: 'Social Information', description: 'Work, religion, other addresses', path: 'SocialInfo'},
        { label: 'Payment', description: 'Method for payment', path: 'Payment'},
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
}
</script>
