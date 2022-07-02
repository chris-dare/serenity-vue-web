<template>
  <MultiStepBase
    :icon="icon"
    next-label="Next: Make Payment"
    :previous="previous"
    :loading="finalLoading"
    :disabled="$v.form.$invalid"
    :query="$route.query"
    @back="goBack"
    @cancel="cancel"
    @save="validateAndReroute"
  >
    <div class="space-y-6">
      <p class="text-lg font-semibold">Add Service</p>

      <MultipleOptionsWrapper
        v-model="form.labs"
        @remove="deleteLab"
        @edit="editLab"
      >
        <template #default="{ item }">
          <div class="flex items-center flex-1 ">
            <div class="space-y-1">
              <p class="text-black font-semibold">Service: {{ item.code.healthcare_service_name }}</p>
              
              <p
                v-if="item.price_tier"
                class="text-secondary text-sm"
              >
                Price: <span class="text-primary">{{ getPriceTier(item) }}</span>
              </p>
            </div>
          </div>
        </template>
      </MultipleOptionsWrapper>

      <MultiServiceForm
        v-model="labRequest"
        :options="consultationServices"
        :search-options="consultationServices"
        :v="$v"
        :loading="dataLoading"
        display="healthcare_service_name"
        @input="$v.$touch()"
      >
        <div class="flex justify-end">
          <SeButton
            class="mt-3"
            :loading="loading"
            data-cy="billing-select-clinic-add"
            @click="addLabRequest"
          >
            Add new service
          </SeButton>
        </div>
      </MultiServiceForm>
    </div>
  </MultiStepBase>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import MultiStep from '@/mixins/multistep'
import MultiServiceForm from '@/components/forms/MultiServiceForm'
import { mapActions, mapState, mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'BillingSelectCreateClinic',

  components: { MultiServiceForm },

  mixins: [MultiStep],

  data() {
    return {
      icon: ChevronRight,
      labRequest: {
        priority: 'routine',
        code: null,
        forTravel: null,
      },
      loading: false,
      finalLoading: false,
      deleteLoading: false,
      dataLoading: true,
      next: 'BillingPayment',
      previous: 'BillingSelectPatient',
      parent: 'Dashboard',
      form: {
        labs: [],
      },
    }
  },

  validations: {
    labRequest: {
      price_tier: {required},
    },
    form: {
      labs: {required, minLength: minLength(1)},
    },
  },

  computed: {
    ...mapState({
      storeData: (state) => state.checkout.currentCheckout,
    }),

    ...mapGetters({
      consultationServices: 'services/consultationServices',
    }),
  },

  watch: {
    consultationServices: {
      immediate: true,
      handler(val) {
        if (val && val.length) {
          this.dataLoading = false
        }
      },
    },
  },

  methods: {
    ...mapActions({
      refresh: 'checkout/refreshCheckout',
      addToStoreData: 'checkout/addToCheckout',
    }),

    cancel(){
      this.refresh()
      if (this.modal) {
        this.$emit('stop')
        return
      }
      this.$router.push({ name: this.parent })
    },

    getPriceTier(service) {
      if (!service.code) return 'Select Service'

      let price = service.code.price_tiers.find(
        (result) => service.price_tier === result.id,
      )
      return `${this.$currency(price.charge, price.currency).format()} - ${price.description}`
    },

    addLabRequest(){
      this.$v.labRequest.$touch()
      if (this.$v.labRequest.$invalid) {
        this.$toast.open({
          message: 'Please fill all required fields',
          type: 'error',
        })
        return
      }

      let service = this.form.labs.find(service => service.code.id === this.labRequest.code.id)
    
      if (!service) {
        this.form.labs.push(
          { 
            ...this.labRequest,
            price: this.labRequest?.code?.price_tiers.find(
              (result) => this.labRequest.price_tier === result.id,
            ), 
          })
      }

      this.labRequest = { code: null }
      this.$v.labRequest.$reset()
    },

    deleteLab(list){
      this.form.labs = this.form.labs.filter(lab => lab.code !== list.code)
    },

    editLab(list){
      this.labRequest = list
    },

    validateAndReroute(reroute = true) {
      this.$v.form.$touch()

      this.addToStoreData(this.form)

      if (this.$v.form.$invalid) {
        this.$toast.open({
          message: 'Fill all required fields!',
          type: 'error',
        })
        return
      }

      if (this.modal) {
        this.$emit('next')
        return
      }
      if(reroute){
        this.$router.push({ name: this.next, query: { ...this.$route.query } })
      }
    },
  },
}
</script>
