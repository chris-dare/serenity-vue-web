<template>
  <AppRegisterLayout
    label="Checkout"
    :nav-items="navItems"
    :checked="checked"
  >
    <router-view />
  </AppRegisterLayout>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CheckoutIndex',

  data() {
    return {
      checked: '',
    }
  },

  computed: {
    ...mapState({
      existingPatient: (state) => state.checkout.existingPatient,
    }),
    navItems() {
      let navItems = [
        { label: 'Payment Options', description: 'Choose payment option', path: 'CheckoutPaymentOptions'},
        { label: 'Receipts', description: 'Print Receipts', path: 'CheckoutReceipts'},
      ]
      if (!this.existingPatient) {
        navItems.unshift(
          { label: 'Select patient', description: 'Existing or new patient', path: 'CheckoutSelectPatient'},
        )
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
}
</script>
