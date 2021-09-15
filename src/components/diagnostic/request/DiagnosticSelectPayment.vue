<template>
  <MultiStepBase
    :previous="previous"
    :icon="icon"
    next-label="Next: View Sumaary"
    :query="$route.query"
    :modal="modal"
    @cancel="cancel"
    @back="goBack"
    @save="save"
  >
    <div>
      <div class="my-8">
        <p class="text-secondary text-sm my-2">
          Total cost
        </p>
        <h1
          class="text-primary font-bold"
          style="font-size: 36px"
        >
          {{ priceTier }}
        </h1>
      </div>
      <ModeOfPayment
        v-model="form"
        :v="$v"
      />
    </div>
  </MultiStepBase>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapState, mapActions, mapGetters } from 'vuex'
import ModeOfPayment from '@/components/payment/ModeOfPayment'
import { required, minValue } from 'vuelidate/lib/validators'
import MultiStep from '@/mixins/multistep'
import modelMixin from '@/mixins/model'
export default {
  name: 'DiagnosticSelectPayment',

  components: {
    ModeOfPayment,
  },

  mixins: [MultiStep, modelMixin],


  props: {
    modal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: 'user',
      form: {
        transaction_type: '',
      },
      visible: false,
      icon: ChevronRight,
      paymentTypes: [
        {
          label: 'User Account',
          description: 'Pay using patient personal account',
          type: 'cash',
          value: 'user',
        },
        {
          label: 'Corporate Account',
          description: 'Select associated corporate account',
          type: 'momo',
          value: 'corporate',
        },
        {
          label: 'Insurance',
          description: 'Bills covered by third party insurance',
          type: 'insurance',
          value: 'insurance',
        },
      ],
      previous: 'DiagnosticService',
      next: 'DiagnosticSummary',
      parent: 'DiagnosticDashboard',
    }
  },
  computed: {
    ...mapState({
      networks: (state) => state.global.networks,
      storeData: (state) => state.appointments.currentAppointment,
    }),

    ...mapGetters({
      labProceedures: 'services/labProceedures',
    }),

    priceTier() {
      if (!this.storeData.code || !this.labProceedures.length) return 'Select Service'
      let service = this.labProceedures.find(service => service.id === this.storeData.code.id)
      if (!service) return 'Select Service'
      let price = service.price_tiers.filter(
        (result) => this.storeData.price_tier === result.id,
      )
      return `${this.$currency(price[0].charge, price[0].currency).format()} - ${price[0].description}`
    },
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

  mounted(){
    this.form.transaction_type = this.$global.USER_ACCOUNT_TYPE
    if(this.storeData.patient.id) {
      this.getPatientAccounts({ id: this.storeData.patient.id })
    } else {
      this.$router.push({ name: 'DiagnosticSelectPatient' })
    }
  },

  methods: {
    ...mapActions({
      addToCurrentAppointment: 'appointments/addToCurrentAppointment',
      refresh: 'appointments/refreshCurrentAppointment',
      getPatientAccounts: 'billing/getPatientAccounts',
    }),

    cancel(){
      this.$router.push({ name: 'Dashboard'})
      this.refresh()
    },

    save() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.error('Please select an account')
        return
      }
      this.addToCurrentAppointment( this.form)

      if (this.modal) {
        this.$emit('next')
        return
      }

      this.$router.push({ name: 'DiagnosticSummary' })
    },
  },
}
</script>
