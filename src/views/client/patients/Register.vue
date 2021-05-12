<template>
  <AppRegisterLayout
    label="Register new patient"
    :nav-items="navItems"
  >
    <router-view />
  </AppRegisterLayout>
</template>

<script>
import CircleFilled from '@carbon/icons-vue/es/circle--filled/32'
import Checkmark from '@carbon/icons-vue/es/checkmark--outline/32'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { CircleFilled, Checkmark },
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
