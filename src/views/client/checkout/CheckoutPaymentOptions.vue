<template>
  <MultiStepBase
    :icon="icon"
    next-label="Dispense medication"
    :loading="loading"
    @back="$router.back()"
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
        v-model="form.payment_info"
        :v="$v"
        show-cash-options
        :total="cartTotal"
        :patient="patient"
      />
    </div>

    <div slot="actions">
      <div class="flex items-center justify-between mt-12 mb-6">
        <div class="flex items-center space-x-2">
          <SeButton
            variant="outline"
            @click="cancel"
          >
            Cancel
          </SeButton>
          <SeButton
            variant="secondary"
            @click="$router.back()"
          >
            Go back
          </SeButton>
        </div>
        <div class="flex items-center space-x-2">
          <SeButton
            :icon="icon"
            :loading="loading"
            @click="dispense(false)"
          >
            Raise bill
          </SeButton>
          <SeButton
            :icon="icon"
            :loading="loading"
            @click="onSave"
          >
            Receive Payment
          </SeButton>
        </div>
      </div>
    </div>
  </MultiStepBase>
</template>

<script>
import ModeOfPayment from '@/components/payment/ModeOfPayment'
import { mapState, mapActions, mapGetters } from 'vuex'
import { required, minValue, requiredIf } from 'vuelidate/lib/validators'
import MultiStep from '@/mixins/multistep'
import paymentMixin from '@/mixins/payment'
import MedicationAPI from '@/api/medication'

export default {
  name: 'CheckoutPaymentOptions',

  components: { ModeOfPayment },

  mixins: [MultiStep, paymentMixin],

  data() {
    return {
      next: 'CheckoutReceipts',
      previous: 'CheckoutSelectPatient',
      form: {
        payment_info: {},
      },
      loading: false,
      parent: 'Dashboard',
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
    
    ...mapGetters({
      cartTotal: 'checkout/cartTotal',
      hasPaymentPermission: 'auth/hasPaymentPermission',
    }),

    patient() {
      return this.existingPatient || this.currentPatient
    },
  },

  mounted() {
    if(this.existingPatient){
      this.form.patient = this.existingPatient
    }
    this.getPatientAccounts({ id: this.patient.id })
  },

  validations() {
    if(this.form.payment_info.transaction_type === this.$global.CASH_TYPE){
      return {
        form: {
          payment_info: {
            amount: { required, minValue: minValue(this.cartTotal) },
          },
        },
      }
    }
    return {
      form: {
        payment_info: {
          account_id: { required: requiredIf(() => {
            return this.hasPaymentPermission
          }) },
        },
      },
    }
  },

  methods: {
    ...mapActions({
      addToStoreData: 'checkout/addToCheckout',
      refresh: 'checkout/refreshCheckout',
      createMedicationRequest: 'patients/createMedicationRequest',
      updateCartItem: 'checkout/updateCartItem',
      setPaymentResult: 'checkout/setPaymentResult',
      getPatientAccounts: 'billing/getPatientAccounts',
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

      newForm.push({
        quantity: item.quantity,
        requester_practitioner_role: this.$store.getters['auth/practitionerRoleId'],
        patient: this.patient.id,
        requester: this.user.id,
        course_of_therapy_type: 'continuous',
        medication_request_dosage_instruction: [{
          strength: `${item.inventory.rate}${item.inventory.dosage_unit}`,
          frequency: 'BID (twice a day)',
          period_unit: 'Weeks',
          period: '2',
        }],
      })

      return newForm
    },

    async dispense(withPayment = true) {
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
      let payload = {
        origin,
        patient: this.patient.id,
        medication_dispense: medication_dispenses,
        location: this.$locationId,
        medication_request_category: this.$isCurrentWorkspace('PHARM') ? 'outpatient' : 'inpatient',
      }
      if (this.hasPaymentPermission && withPayment) {
        payload.with_payment = true
        payload.payment_info = this.getPaymentParams(this.form.payment_info)
      } else {
        payload.with_payment = false
        delete payload.payment_info
      }

      try { 
        const {data} = await MedicationAPI.createDispense(this.$providerId, payload)
        this.setPaymentResult(data.data)
        this.$toast.open('Prescriptions dispensed successfully')
        this.reRoute()
      } catch (error) {
        this.$toast.error('There was an error dispensing prescription')
      }
      this.loading =  false
    },


  },
}
</script>
