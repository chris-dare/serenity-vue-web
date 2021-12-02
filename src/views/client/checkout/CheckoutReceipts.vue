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
        <div />
        <div class="flex items-center space-x-2">
          <div />
          <SeButton
            :icon="icon"
            :loading="loading"
            @click="print"
          >
            Print receipt
          </SeButton>
        </div>
      </div>
    </template>
  </MultiStepBase>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MultiStep from '@/mixins/multistep'
import { required, minLength } from 'vuelidate/lib/validators'
import PaymentDetail from '@/components/payment/PaymentDetail'

// function _base64ToArrayBuffer(base64) {
//   var binary_string = window.atob(base64)
//   var len = binary_string.length
//   var bytes = new Uint8Array(len)
//   for (var i = 0; i < len; i++) {
//     bytes[i] = binary_string.charCodeAt(i)
//   }
//   return bytes.buffer
// }

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
      currentInvoice: (state) => state.checkout.paymentResult,
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
    }),

    async print() {
      this.loading = true
      
      const el = this.$refs.printMe
      // add option type to get the image version
      // if not provided the promise will return 
      // the canvas.
      const options = {
        type: 'dataURL',
      }
      let output = await this.$html2canvas(el, options)
      // output = output.replace('data:image/png;base64,', '')
      // console.info(URL.createObjectURL(output))
      // window.printJS(URL.createObjectURL(output))
      // const pdfBlob = new Blob(_base64ToArrayBuffer(output), { type: 'application/pdf' })

      const res = await fetch(output)

      const pdfBlob = await res.blob()
      const url = URL.createObjectURL(pdfBlob)
      // console.info('shit', url)
      // window.open(url)
      window.printJS(url, 'image')
      // window.printJS({
      //   printable: url,
      //   type: 'pdf',
      //   base64: true,
      // })
      // this.setPaymentMethod(null)
      // this.addCartItems({items: []})
      this.resetCheckout()
      setTimeout(() => {
        this.loading = false
        this.$router.push({name: 'Dashboard'})
      }, 300)
    },
  },
}
</script>
