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
            :label="summary.patient.first_name + ' ' + summary.patient.last_name"
            :description="summary.patient.mobile"
            :url="summary.patient.photo"
            label-class="text-black font-semibold"
            description-class="text-sm"
          />
        </div>
        <div v-if="editable">
          <router-link
            tag="div"
            :to="{ name: 'BillingSelectPatient' }"
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
      <p class="text-secondary mb-4">Selected Service(s)</p>
      <div
        v-if="summary.labs"
      >
        <div
          v-for="(lab, i) in summary.labs"
          :key="i"
          class="grid grid-cols-7 gap-4 mt-3"
        >
          <div class="flex items-center col-span-6">
            <div
              class="w-12 h-12 flex items-center justify-center rounded-full bg-serenity-primary mr-3"
            >
              <Diagnostic class="w-7 h-7 text-white" />
            </div>
            <div class="space-y-1">
              <p class="text-black font-semibold">{{ lab.code.category }}</p>
              <p class="text-secondary text-sm">
                Service:
                <span class="text-primary">{{ lab.code.display }}</span>
              </p>
              <p
                v-if="lab.price"
                class="text-secondary text-sm"
              >
                Price: <span class="text-primary">{{ $currency(lab.price.charge, lab.price.currency).format() }} - {{ lab.price.description }}</span>
              </p>
              <p
                v-if="lab.price_tier && !lab.price"
                class="text-secondary text-sm"
              >
                Price: <span class="text-primary">{{ priceTier(lab) }}</span>
              </p>
            </div>
          </div>
          <div v-if="editable">
            <router-link
              tag="div"
              :to="{ name: 'BillingService' }"
              class="bg-serenity-light-gray w-10 h-10 rounded-full ml-6 flex items-center justify-center"
            >
              <img
                src="@/assets/img/edit 1.svg"
                class="w-4 h-4 cursor-pointer"
              >
            </router-link>
          </div>
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
        data-cy="raise-bill-button"
        @click="save"
      >
        {{ label }}
      </SeButton>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import modelMixin from '@/mixins/model'
import paymentMixin from '@/mixins/payment'

export default {
  name: 'BillingDetail',

  mixins: [modelMixin, paymentMixin],

  props: {
    summary: {
      type: Object,
      default: () => {},
    },

    editable: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      default: 'Complete Payment',
    },
  },

  data() {
    return {
      loading: false,
      form: {},
      previous: 'BillingPayment',
    }
  },

  computed: {
    ...mapState({
      provider: (state) => state.auth.provider,
      services: (state) => state.auth.services,
    }),

    ...mapGetters({
      labProceedures: 'services/labProceedures',
    }),

    isBillCreate() {
      return this.$route.query.type === 'create'
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

  created(){
    this.form = this.summary
  },

  methods: {
    ...mapActions({
      createDiagnosticVisit: 'visits/createDiagnosticVisit',
      createServiceRequest: 'patients/createServiceRequest',
      refresh: 'checkout/refreshCheckout',
      raiseBillForService: 'billing/raiseBill',
      raiseAdminBill: 'billing/raiseAdministrativeBill',
      payForService: 'billing/userPayService',
    }),

    async raiseAdministrativeBill() {
      try {
        this.loading = true
        let payload = {
          patient_id: this.form.patient.uuid,
          practitioner: this.$practitionerId,
        }
        let results = this.form.labs.map(lab => {return {...payload, healthcare_service_id: lab.code.uuid, price_tier_id: lab.price.uuid}})

        const bills = await this.raiseAdminBill(results)

        this.bill = { ...this.form, patientid: this.form.patient.uuid }
        await this.payChargeItems(bills)
        this.$router.push({ name: 'Dashboard' })
      } catch (error) {
        this.$utils.error(error)
        // 
      } finally {
        this.loading = false
      }

    },

    async save() {
      if (!this.form.patient.id) {
        this.$toast.error('Please select a patient')
        this.loading = false
        return
      }
      
      if (this.isBillCreate) {
        this.raiseAdministrativeBill()
        return
      }

      this.loading = true

      if (this.form.account_id || this.form.amount){
        this.settleBill()
        return
      }
      
      this.raiseBill()
    },

    priceTier(lab) {
      if (!lab.code || !this.labProceedures.length) return 'Select Service'
      let service = this.labProceedures.find(service => service.order_code === lab.code.code)
      if (!service) 'Select Service'
      let price = service.price_tiers.filter(
        (result) => lab.price_tier === result.id,
      )
      return `${this.$currency(price[0].charge, price[0].currency).format()} - ${price[0].description}`
    },

    async startVisit(){
      let payload = this.summary.labs.map((el) => {
        return {
          service_request_category: el.code.category,
          priority: el.priority,
          patient_instruction: el.patient_instruction,
          note: el.note,
          price_tier: el.price_tier,
          passport_number: el.passport_number,
          healthcare_service: el.code.id,
          patient: this.summary.patient.id,
          visit: null,
          location: this.$locationId,
        }
      })
      await this.createServiceRequest([...payload]).then((data) => {
        this.loading = false
        this.$toast.open({
          message: 'Service Request successfully added',
        })
        
        if (!this.hasNoOptions) {
          this.settleBill(data)
        } else {
          this.loading = false
          if (this.$route.params.id) {
            this.$emit('stop')
            return
          }
          this.$router.push({ name: 'Orders' })
          this.refresh()
        }
      }).catch (() => {
        this.loading = false
      }).finally(() => this.loading = false)

    },

    async settleBill() {
      this.loading = true
      try {
        let payload = this.summary.labs.map(element => {
          return {
            service_request: element.code.id, // a service request raised by a patient
            price_tier: element.price_tier,
            account_id: this.summary.account_id,
            currency: this.summary.currency,
            amount: this.summary.amount,
            transaction_type: this.summary.transaction_type, //user-wallet, corporate-account, mobile-money, cash
          }
        })
        await this.payForService([...payload])

        this.$toast.open('Bill successfully settled')
        this.loading = false
        if (this.$route.params.id) {
          this.$emit('stop')
          return
        }
        this.$router.push({ name: 'Billing' })
        this.refresh()
      } catch (error) {
        this.loading = false
        this.$toast.open({
          message: error.message || 'payment of bill unsuccessful!',
          type: 'error',
        })
      }
    },

    async raiseBill() {
      this.loading = true

      try {
        let payload = this.summary.labs.map(element => {
          return {
            service_request: element.code.id, // a service request raised by a patient
            price_tier: element.price_tier,
            account_id: this.summary.account_id,
            currency: this.summary.currency,
            amount: this.summary.amount,
            transaction_type: this.summary.transaction_type, //user-wallet, corporate-account, mobile-money, cash
          }
        })

        await this.raiseBillForService(payload)

        this.$toast.open( 'Bill successfully raised' )
        this.loading = false
        if (this.$route.params.id) {
          this.$emit('stop')
          return
        }
        this.$router.push({ name: 'Billing' })
        this.refresh()
      } catch (error) {
        this.loading = false
        this.$toast.open({
          message: error.message || 'Raising bill unsuccessful!',
          type: 'error',
        })
      }
    },

    goBack(){
      if (this.$route.params.id) {
        this.$emit('back')
        return
      }
      this.$router.push({ name: this.previous, query: { ...this.$route.query } })
    },
  },
}
</script>
