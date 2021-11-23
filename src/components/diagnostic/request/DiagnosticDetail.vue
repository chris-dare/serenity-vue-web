<template>
  <div class="divide-y divide-solid divide-subtle">
    <div
      class="py-6"
    >
      <p class="text-secondary mb-4"> Patient {{ summary.payment }}</p>
      <div
        v-if="summary.patient"
        class="grid grid-cols-7 gap-4"
      >
        <div class="flex items-center col-span-6">
          <InfoImageBlock
            :label="summary.patient.user.first_name + ' ' + summary.patient.user.last_name"
            :description="summary.patient.user.mobile"
            :url="summary.patient.photo"
            label-class="text-black font-semibold"
            description-class="text-sm"
          />
        </div>
        <div v-if="editable">
          <router-link
            tag="div"
            :to="{name: 'DiagnosticSelectPatient'}"
            class="bg-serenity-light-gray w-10 h-10 rounded-full ml-6 flex items-center justify-center"
          >
            <img
              src="@/assets/img/edit 1.svg"
              class="w-4 h-4 cursor-pointer"
            >
          </router-link>
        </div>
      </div>
      <p v-else>No patient selected</p>
    </div>
    <div
      class="py-6"
    >
      <p class="text-secondary mb-4">Diagnostic Service</p>
      <div
        v-if="summary.code.id"
        class="grid grid-cols-7 gap-4"
      >
        <div class="flex items-center col-span-6">
          <div
            class="w-12 h-12 flex items-center justify-center rounded-full bg-serenity-primary mr-3"
          >
            <Diagnostic class="w-7 h-7 text-white" />
          </div>
          <div class="space-y-1">
            <p class="text-black font-semibold">{{ summary.code.service_request_category }}</p>
            <p class="text-secondary text-sm">
              Service:
              <span class="text-primary">{{ summary.code.healthcare_service_name }}</span>
            </p>
            <p
              v-if="summary.price_tier"
              class="text-secondary text-sm"
            >
              Price: <span class="text-primary">{{ priceTier }}</span>
            </p>
          </div>
        </div>
        <div v-if="editable">
          <router-link
            tag="div"
            :to="{ name: 'DiagnosticService' }"
            class="bg-serenity-light-gray w-10 h-10 rounded-full ml-6 flex items-center justify-center"
          >
            <img
              src="@/assets/img/edit 1.svg"
              class="w-4 h-4 cursor-pointer"
            >
          </router-link>
        </div>
      </div>
      <p v-else>No service selected</p>
    </div>
    <div
      v-if="summary.isCancelled"
      class="py-6"
    >
      <p class="text-secondary mb-2">Cancellation Reason:</p>
      <div class="grid grid-cols-7 gap-4">
        <div class="flex items-center col-span-6">
          <p>{{ summary.cancelationReason }}</p>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between py-6">
      <SeButton
        variant="secondary"
        @click="goBack"
      >
        Go back
      </SeButton>
      <SeButton
        :loading="loading"
        @click="save"
      >
        Done
      </SeButton>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import modelMixin from '@/mixins/model'
import pick from 'lodash/pick'

export default {
  name: 'DiagnosticDetail',

  mixins: [modelMixin],

  props: {
    summary: {
      type: Object,
      default: () => {},
    },

    editable: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      loading: false,
      form: {},
    }
  },

  computed: {
    ...mapState({
      provider: (state) => state.auth.provider,
    }),

    ...mapGetters({
      labProceedures: 'services/labProceedures',
    }),

    priceTier() {
      if (!this.summary.code || !this.labProceedures.length) return 'Select Service'
      let service = this.labProceedures.find(service => service.id === this.summary.code.id)
      if (!service) 'Select Service'
      let price = service.price_tiers.filter(
        (result) => this.summary.price_tier === result.id,
      )
      return `${this.$currency(price[0].charge, price[0].currency).format()} - ${price[0].description}`
    },
  },

  created(){
    this.form = this.summary
  },

  methods: {
    ...mapActions({
      createDiagnosticVisit: 'visits/createDiagnosticVisit',
      createServiceRequest: 'patients/createServiceRequest',
      refresh: 'appointments/refreshCurrentAppointment',
      payForService: 'billing/userPayService',
    }),

    async save() {
      this.loading = true
      if(this.summary.patient.id){
        this.startVisit()
      } else {
        this.$toast.error('Please select a patient')
        this.loading = false
      }
      this.loading = false
    },

    async startVisit(){
      this.loading = true
      let payload = pick(this.summary, ['patient_instruction', 'note', 'priority', 'specimen', 'service_request_category', 'passport_number', 'price_tier'])
      payload.healthcare_service = this.summary.code.id
      payload.patient = this.summary.patient.id
      payload.visit = null
      await this.createServiceRequest([payload]).then((data) => {
        this.loading = false
        this.$toast.open({
          message: 'Service Request successfully added',
        })
        let item = data[0]
        this.settleBill(item)
      }).catch (() => {
        this.loading = false
        this.$toast.error('Request not successful')
      }).finally(() => this.loading = false)

    },

    async settleBill(item) {
      try {
        this.loading = true
        await this.payForService({
          service_request: item.id, // a service request raised by a patient
          price_tier: item.price_tier,
          account_id: this.summary.account_id,
          currency: this.summary.currency,
          amount: this.summary.amount,
          transaction_type: this.summary.transaction_type, //user-wallet, corporate-account, mobile-money, cash
        })

        this.$toast.open('Bill successfully settled')
        this.loading = false
        if (this.$route.params.id) {
          this.$emit('stop')
          return
        }
        this.$router.push({ name: 'Orders' })
        this.refresh()
      } catch (error) {
        this.loading = false
        this.$toast.open({
          message: error.message || 'Payment unsuccessful!',
          type: 'error',
        })
        if (this.$route.params.id) {
          this.$emit('stop')
          return
        }
        this.refresh()
        this.$router.push({ name: 'Orders' })
      }
    },

    goBack(){
      if (this.$route.params.id) {
        this.$emit('back')
        return
      }
      this.$router.push({ name: 'DiagnosticPayment' })
    },
  },
}
</script>
