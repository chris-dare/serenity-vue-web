<template>
  <MultiStepBase
    :icon="icon"
    next-label="Complete payment"
    :previous="previous"
    :loading="loading"
    @cancel="cancel"
    @save="onSave"
  >
    <div class="space-y-4">
      <div class="space-y-2 pt-6">
        <p>Total Cost:</p>
        <h1 class="text-4xl font-bold">{{ $currency(cartTotal).format() }}</h1>
      </div>
      <div class="my-6 h-0 border-t border-solid border-dark border-opacity-10" />
      <ModeOfPayment
        v-model="form"
        :v="$v"
        show-cash-options
        :total="cartTotal"
      />
    </div>
  </MultiStepBase>
</template>

<script>
import ModeOfPayment from '@/components/payment/ModeOfPayment'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import { required, minValue } from 'vuelidate/lib/validators'
import MultiStep from '@/mixins/multistep'
import http from '@/http'
export default {
  name: 'CheckoutPaymentOptions',

  components: { ModeOfPayment },

  mixins: [MultiStep],

  data() {
    return {
      next: 'CheckoutReceipts',
      previous: 'CheckoutSelectPatient',
      form: {
        transaction_type: '',
      },
      loading: false,
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.checkout.checkoutData,
      existingPatient: (state) => state.checkout.existingPatient,
      currentPatient: (state) => state.checkout.currentCheckout.patient,
      provider: state => state.auth.provider,
      cart: state => state.checkout.cart,
      cartAction: (state) => state.checkout.action,
      user: (state) => state.auth.user,
    }),
    patient() {
      return this.existingPatient || this.currentPatient
    },
    ...mapGetters({
      cartTotal: 'checkout/cartTotal',
    }),
  },

  mounted() {
    this.form.transaction_type = this.$global.USER_ACCOUNT_TYPE
    if(this.existingPatient){
      this.form.patient = this.existingPatient
    }
    this.$store.dispatch('billing/getPatientAccounts', { id: this.patient.id }, { root:true })
  },

  validations() {
    if(this.form.transaction_type === 'cash'){
      return {
        form: {
          amount: { required, minValue: minValue(this.cartTotal) },
        },
      }
    }
    return {
      form: {
        account_id: { required },
      },
    }
  },

  methods: {
    ...mapActions({
      addToStoreData: 'checkout/addToCheckout',
      refresh: 'checkout/refreshCheckout',
      createMedicationRequest: 'patients/createMedicationRequest',
    }),
    ...mapMutations({
      updateCartItem: 'checkout/UPDATE_CART_ITEM',
      setPaymentResult: 'checkout/SET_PAYMENT_RESULT',
    }),
    onSave(){
      this.validateAndReroute(false)
      if (this.$v.$invalid) {
        return
      }
      switch(this.cartAction){
      case 'medicationDispense':
        this.dispense()
        break
      }
    },
    formatMedication(item) {
      let newForm = []

      // this.cart.forEach(item => {
      newForm.push({
        quantity: item.quantity,
        requester_practitioner_role: this.$store.getters['auth/practitionerRoleId'],
        patient: this.patient.id,
        requester: this.user.id,
        course_of_therapy_type: 'continuous',
        medication_request_dosage_instruction: [{
          strength: `${item.inventory.rate}${item.inventory.dosage_unit}`,
          /* eslint-disable */
          frequency: 'BID (twice a day)',
          period_unit: "Weeks",
          period: "2",
          /* eslint-enable */
        }],
      })
      // })
      // newForm.forEach(drug => {
      //   if(drug.next_refill){
      //     drug.next_refill = this.$date.formatDate(drug.next_refill, 'yyyy-MM-dd')
      //   }
      // })

      return newForm
    },
    async dispense() {
      this.loading =  true
      let origin = 'encounter'
      for(let i = 0; i < this.cart.length; i++){
        const el = this.cart[i]
        if(!el.medicationRequest){
          origin = 'walk-in'
        }
      }
      const medication_dispenses = this.cart.map(cartItem => {
        return {
          inventory_item: cartItem.inventory.id,
          prescription: cartItem.medicationRequest ? cartItem.medicationRequest.id : null,
          quantity: cartItem.quantity,
        }
      })
      const payload = {
        with_payment: true,
        payment_info: {
          transaction_type: this.form.transaction_type,
          amount: this.form.amount,
          currency: this.form.currency,
          account_id: this.form.account_id,
        },
        origin,
        patient: this.patient.id,
        medication_dispense: medication_dispenses,
      }
      try {
        const {data} = await http.post(`providers/${this.provider.id}/medication-dispenses`, payload)
        // data.forEach(medicationDispense => {
        //   this.$store.commit('checkout/UPDATE_CART_ITEM', {
        //     id: medicationDispense.medication,
        //   })
        //   this.$store.commit('checkout/SET_PAYMENT_METHOD', this.form.transaction_type)
        //   this.$store.commit('checkout/SET_PAYMENT_RESULT', data)
        // })
        this.$store.commit('checkout/SET_PAYMENT_RESULT', data)
        this.$toast.open('Prescriptions dispensed successfully')
        this.reRoute()
        // eslint-disable-next-line
      } catch (error) {
        this.$toast.error('There was an error dispensing prescription')
      }
      this.loading =  false
    },
  },
}
</script>
