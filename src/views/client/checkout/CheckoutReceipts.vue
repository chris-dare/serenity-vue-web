<template>
  <MultiStepBase>
    <div
      ref="printMe"
      class="space-y-4"
    >
      <PaymentDetail :details="paymentDetails" />
    </div>

    <template slot="actions">
      <div class="flex items-center justify-between mt-12 mb-6">
        <SeButton
          variant="outline"
          :to="{name: parent}"
        >
          Cancel
        </SeButton>
        <SeButton
          :icon="icon"
          :loading="loading"
          @click="print"
        >
          Print receipt
        </SeButton>
      </div>
    </template>
  </MultiStepBase>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MultiStep from '@/mixins/multistep'
import { required, minLength } from 'vuelidate/lib/validators'
import PaymentDetail from '@/components/payment/PaymentDetail'

export default {
  name: 'CheckoutReceipts',

  components: { PaymentDetail },

  mixins: [MultiStep],

  data() {
    return {
      next: 'CheckoutReceipts',
      previous: 'CheckoutPaymentOptions',
      form: {},
      parent: 'Dashboard',
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.checkout.checkoutData,
      cart: state => state.checkout.cart,
      existingPatient: (state) => state.checkout.existingPatient,
      currentPatient: (state) => state.checkout.currentCheckout.patient,
      currentInvoice: (state) => state.checkout.paymentResult?.invoice,
    }),
  
    patient() {
      return this.existingPatient || this.currentPatient
    },
  
    paymentDetails() {
      return {
        patient: this.patient || {},
        category: 'Medication',
      }
    },
  },

  validations: {
    form: {
      patient: { minLength: minLength(1), required  },
    },
  },

  methods: {
    ...mapActions({
      addToStoreData: 'checkout/addToCheckout',
      refresh: 'checkout/refreshCheckout',
      addCartItems: 'checkout/addCartItems',
      setPaymentMethod: 'checkout/setPaymentMethod',
      resetCheckout: 'checkout/resetCheckout',
      exportBill: 'billing/exportBill',
    }),

    async print() {
      try {
        this.loading = true
        await this.exportBill(this.currentInvoice.uuid)
        this.resetCheckout()
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
  },
}
</script>
