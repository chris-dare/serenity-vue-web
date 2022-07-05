<template>
  <MultiStepBase
    :previous="previous"
    :icon="icon"
    next-label="Next: View Summary"
    :query="$route.query"
    :modal="modal"
    skip
    @skip="skip"
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
        :total="selectedCharge"
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
  name: 'BillingSelectPayment',

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
      previous: 'BillingService',
      next: 'BillingSummary',
      parent: 'Dashboard',
      totalCash: 0,
    }
  },
  computed: {
    ...mapState({
      networks: (state) => state.global.networks,
      storeData: (state) => state.checkout.currentCheckout,
      services: (state) => state.services.services,
    }),

    ...mapGetters({
      labProceedures: 'services/labProceedures',
    }),

    selectedPriceTier() {
      if (!this.storeData.code || !this.labProceedures.length) return 'Select Service'
      let service = this.labProceedures.find(service => service.order_code === this.storeData.code.code)
      if (!service) return 'Select Service'
      return service?.price_tiers.find(
        (result) => this.storeData.price_tier === result.id,
      ) || {}
    },

    selectedCharge() {
      return this.totalCash || this.selectedPriceTier.charge || 0
    },

    priceTier() {
      if (!this.storeData.labs) {
        return `${this.$currency(this.selectedPriceTier.charge, this.selectedPriceTier.currency).format()} - ${this.selectedPriceTier.description}`
      }

      if (this.storeData.labs.find(lab => lab.price)) {
        let prices = this.storeData.labs.map(lab => lab.price)
        this.calTotal(prices.map(price => price.charge))
        return `${this.$currency(this.totalCash, prices[0]?.currency).format()} for ${this.storeData.labs.length} labs`
      }

      let service = this.storeData.labs.map((el) => this.labProceedures.find(service => service.order_code === el.code.code))
      let prices = service.map((el, i) => el?.price_tiers.find(price => price.id === this.storeData.labs[i].price_tier))
      let num = prices?.map((a) => a?.charge)
      this.calTotal(num)
      return  `${this.$currency(this.totalCash, prices[0]?.currency).format()} for ${service.length} labs`
    },

    options() {
      let options = [
        {
          hide: !this.$userCan('bills.acceptuseraccount.write'),
        },
        {
          hide: !this.$userCan('bills.acceptcorporate.write'),
        },
        {
          hide: !this.$userCan('bills.acceptinsurance.write'),
        },
        {
          hide: !this.$userCan('bills.acceptcash.write'),
        },
      ]

      return options
    },

    hasNoOptions() {
      let availableOptions = this.options?.find(option => !option.hide)
      return !availableOptions
    },
  },

  validations() {
    if(this.form.transaction_type === 'cash'){
      return {
        form: {
          amount: { required, minValue: minValue(this.selectedCharge) },
        },
      }
    }
    return {
      form: {
        account_id: { required },
      },
    }
  },

  async mounted(){
    this.form.transaction_type = this.$global.USER_ACCOUNT_TYPE
    let accountId = this.form.account_id
    
    if(this.storeData.patient.id) {
      await this.getPatientAccounts({ id: this.storeData.patient.id })
      this.form.account_id = accountId
    } else {
      this.$router.push({ name: 'BillingSelectPatient', query: { ...this.$route.query } })
    }
  },

  methods: {
    ...mapActions({
      refresh: 'checkout/refreshCheckout',
      addToStoreData: 'checkout/addToCheckout',
      getPatientAccounts: 'billing/getPatientAccounts',
    }),

    cancel(){
      this.$router.push({ name: this.parent })
      this.refresh()
    },

    calTotal(num){
      if (!num?.length) return 0
      this.totalCash = num.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    },

    skip(){
      this.form.amount = ''
      this.form.account_id = ''
      this.addToStoreData( this.form)
      this.$router.push({ name: this.next, query: { ...this.$route.query } })
    },

    save() {  
      if(!this.hasNoOptions){
        this.$v.$touch()

        if (this.$v.$invalid) {
          this.$toast.error('Please select a valid account')
          return
        }
        this.addToStoreData(this.form)

        if (this.modal) {
          this.$emit('next')
          return
        }

        this.$router.push({ name: this.next, query: { ...this.$route.query } })
      } else {
        if (this.modal) {
          this.$emit('next')
          return
        }
        this.$router.push({ name: this.next, query: { ...this.$route.query } })
      }

    },
  },
}
</script>
