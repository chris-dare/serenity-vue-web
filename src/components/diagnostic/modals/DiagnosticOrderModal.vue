<template>
  <cv-modal
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="title">
      <div class="flex items-center justify-between">
        <h1>Diagnostic Order</h1>
        <Tag
          v-if="!form.is_available_at_provider"
          variant="error"
          label="Test unavailable"
        />
        <Tag
          :variant="form.status === 'sample-collected' ? 'primary' : form.status === 'draft' ? 'error' : 'success'"
          :label="form.status"
        />
      </div>
    </template>
    <template slot="content">
      <span v-if="!pay">
        <div class="pb-5">
          <div class="space-y-1">
            <div
              v-if="form.practitioner_detail"
              class="flex items-center justify-between"
            >
              <p
                v-if="form.practitioner_detail.name"
                class="text-xs"
              >
                Practitioner: {{ form.practitioner_detail.name ? form.practitioner_detail.name : 'N/A' }}
              </p>
              <p class="text-xs">Last updated: {{ $date.formatDate(form.authored_on, 'dd MMM, yyyy HH:mm a') }}</p>
            </div>
            <p class="text-lg font-semibold">{{ form.patient_detail.first_name + ' ' + form.patient_detail.lastname }}</p>
            <div class="flex items-center justify-between">
              <p class="text-xs">{{ form.patient_detail.gender + ', ' + $date.getAge(form.patient_detail.birth_date) }}</p>
              <p class="text-xs">{{ form.patient_detail.mobile }}</p>
            </div>
          </div>
        </div>
        <SeForm>
          <div class="flex items-center justify-between pt-4 pb-2">
            <div>
              <p class="text-md">{{ form.category || 'N/A' }}</p>
              <p class="text-secondary text-xs"> Request Category </p>
            </div>
            <div class="text-right">
              <p class="text-md">{{ form.code || 'N/A' }}</p>
              <p class="text-secondary text-xs"> Code </p>
            </div>
          </div>
          <div class="flex items-center justify-between pt-4 pb-2">
            <div>
              <p class="text-md">{{ form.purpose || 'N/A' }}</p>
              <p class="text-secondary text-xs"> Purpose </p>
            </div>
            <div class="text-right">
              <p class="text-md">{{ form.priority || 'N/A' }}</p>
              <p class="text-secondary text-xs"> Priority </p>
            </div>
          </div>

          <div
            v-if="!sampleTaken && !unPaid"
          >
            <div class="grid grid-cols-2 gap-8 py-2">
              <MultiSelect
                v-model="form.specimen"
                title="Choose specimen type"
                :multiple="false"
                :options="specimenTypes"
                track_by="code"
                custom-field="code"
                label="display"
                placeholder="Search or choose a specimen type"
              />
              <cv-text-input
                v-model="form.service_request_bodysite"
                label="Bodysite"
                type="text"
                placeholder="Enter bodysite"
                class="inherit-full-input mt-1"
              />
            </div>
            <div class="grid grid-cols-2 gap-8 py-2">
              <cv-text-input
                v-model="form.collection_quantity"
                label="Collection Quantity"
                placeholder="Enter collection quantity"
                type="number"
                class="inherit-full-input mt-1"
              />
              <cv-text-input
                v-model="form.condition"
                label="Condition"
                type="text"
                placeholder="Enter condition"
                class="inherit-full-input mt-1"
              />
            </div>
            
          </div>
          <div
            v-else
            class="flex items-center justify-between pt-4 pb-2"
          >
          <!-- <div>
            <p class="text-md">{{ form.specimen[0].specimen_type || 'N/A' }}</p>
            <p class="text-secondary text-xs"> Specimen </p>
          </div>
          <div class="text-right">
            <p class="text-md">{{ form.service_request_bodysite[0].display || 'N/A' }}</p>
            <p class="text-secondary text-xs"> Bodysite </p>
          </div> -->
          </div>
          <div
            v-if="!append && sampleRejected"
          >
            <cv-text-area
              v-model="form.comment"
              label="Reason for rejection"
              placeholder="Enter comments here..."
              :rows="4"
              class="col-span-2 py-3"
            />
          </div>
          <div
            v-if="sampleTaken"
          >
            <MultiSelect
              v-model="category"
              title="Observations"
              :options="categories"
              placeholder="Type and press enter"
              label="display"
              type="text"
            />
            <div
              class="grid grid-cols-2 gap-y-8 my-8"
            >
              
              <div
                v-for="(cat, index) in category.options"
                :key="index"
              >
                <FormMixedInput
                  v-if="cat.unit"
                  v-model="categoryValues[cat.code]"
                  class="mx-2"
                  :suffix-text="cat.unit"
                  :label="cat.display"
                />
                <MultiSelect
                  v-else
                  v-model="categoryValues[cat.code]"
                  :title="cat.display"
                  :multiple="false"
                  :options="interpretationTypes"
                  track_by="code"
                  custom-field="code"
                  label="display"
                  placeholder="Search or choose a observation type"
                />
              </div>
            </div>

            <cv-text-area
              v-model="form.conclusion"
              label="Conclusion"
              placeholder="Enter conclusion here..."
              :rows="2"
              class="col-span-2  py-3"
            />
          </div>
        </SeForm>
        <div class="flex items-center justify-between mt-12">
          <SeButton
            variant="secondary"
            @click="close"
          >
            Go back
          </SeButton>
          <div
            v-if="unPaid"
            class="flex items-center"
          >
            <SeButton
              class="mx-3"
              :loading="loading"
              @click="makePayment"
            >
              Receive payment
            </SeButton>
          </div>
          <div v-else>
            <div
              v-if="!sampleTaken"
              class="flex items-center"
            >
              <SeButton
                class="mx-3"
                :loading="loading"
                @click="takeSample"
              >
                Take sample
              </SeButton>
            </div>
            <div
              v-else
              class="flex items-center space-x-2"
            >
              <SeButton
                v-if="!append"
                :disabled="sampleCancelled || sampleCompleted"
                @click="appendResult(false)"
              >
                Append Result
              </SeButton>
              <SeButton
                v-else
                :loading="appendLoading"
                @click="appendResult(true)"
              >
                Submit
              </SeButton>
              <!-- <SeButton
                v-if="!sampleRejected"
                variant="danger"
                :loading="rejectLoading"
                :disabled="sampleCancelled || sampleCompleted"
                @click="rejectSample(false)"
              >
                Reject Sample
              </SeButton>
              <SeButton
                v-else
                variant="danger"
                :loading="rejectLoading"
                @click="rejectSample(true)"
              >
                Reject
              </SeButton> -->
              <SeButton
                :loading="loading"
              >
                Print label
              </SeButton>
            </div>
          </div>
        </div>
      </span>
      <div v-else>
        <div class="my-8">
          <p class="text-secondary text-sm my-2">
            Total cost
          </p>
          <h1
            class="text-primary font-bold"
            style="font-size: 36px"
          >
            {{ form.price_tier ? form.price_tier.display || "Choose price tier" : "Choose price tier" }}
          </h1>
        </div>
        <ModeOfPayment
          v-model="form"
          :v="$v"
          :total="form.price_tier ? form.price_tier.charge : 0"
        >
          <MultiSelect
            v-if="!form.is_available_at_provider"
            v-model="healthcare_service"
            title="Choose lab type"
            :multiple="false"
            :options="diagnosticServices"
            track_by="id"
            label="healthcare_service_name"
            custom-field="id"
            placeholder="Search or choose a lab text to be performed"
          />
          <MultiSelect
            v-model="form.price_tier"
            title="Choose price tier"
            :multiple="false"
            :options="priceTiers"
            track_by="id"
            label="display"
            placeholder="Search or choose a lab text to be performed"
            :invalid-message="$utils.validateRequiredField($v, 'price_tier')"
          />
        </ModeOfPayment>
        <div class="flex items-center justify-between mt-12">
          <SeButton
            variant="secondary"
            @click="pay = !pay"
          >
            Go back
          </SeButton>
          <SeButton
            :loading="loading"
            @click="completePayment"
          >
            Make payment
          </SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import ModeOfPayment from '@/components/payment/ModeOfPayment'
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'DiagnosticOrderModal',

  components: { ModeOfPayment },

  props: {
    params: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      visible: false,
      pay: false,
      selected: 'user',
      form : {
        PREVIOUS_OBSERVATIONS: [],
        order_detail: [],
        patient_detail: {},
        observations: [],
        service_request_bodysite: '',
        diagnostic_report_cancelled_reasons: [{}],
        transaction_type: '',
        collection_quantity: '1',
        price_tier: {},
      },
      options: {
        PREVIOUS_OBSERVATIONS: [],
      },
      categoryList: [],
      category: {},
      categoryValues: {},
      healthcare_service: '',
      appendLoading: false,
      sampleRejected: false,
      loading: false,
      append: false,
      rejectLoading: false,
      removedObservations: [],
      removedAllergies: [],
      specimen: '',
      tier: '',
      specimenTypes: [],
    }
  },

  events: {
    'diagnostic-order:add:open': function(data) {
      this.visible = true
      this.pay = false
      this.loading = false
      this.form = {...this.form, ...data.params[0]}
      this.serviceType(this.form.id)
      this.form.transaction_type = this.$global.USER_ACCOUNT_TYPE
      if (this.form.patient) {
        this.getPatientAccounts({ id: this.form.patient })
      } else {
        this.pay = !this.pay
      }
      this.specimen = !!this.form.specimen
    },
  },

  computed:{
    ...mapState({
      categories: (state) => state.resources.observationCategories,
      storeData: (state) => state.appointments.currentAppointment,
      provider: (state) => state.auth.provider,
      interpretationTypes: (state) => state.resources.interpretationTypes,
    }),
    ...mapGetters({
      practitionerRoleId: 'auth/practitionerRoleId',
      labProceedures: 'services/labProceedures',
      diagnosticServices: 'services/labProceedures',
    }),
    sampleTaken(){
      return this.form.status === 'sample-collected'
    },
    unPaid(){
      return this.form.status === 'draft'
    },
    sampleCancelled(){
      return this.form.status === 'cancelled'
    },
    sampleCompleted(){
      return this.form.status === 'completed'
    },
    priceTiers: {
      get: function () {
        if (!this.form.healthcare_service || !this.labProceedures.length) return []
        let service = this.labProceedures.find(service => {
          if(service.id === this.form.healthcare_service) return service
        })
  
        if (!service){
          return []
        }
  
        return service.price_tiers.map(price => {
          return {
            id: price.id,
            charge: price.charge,
            display: `${this.$currency(price.charge, price.currency).format()} - ${price.description}`,
          }
        })
      },
      // setter
      set: function (newValue) {
        return newValue
      },
    },
  },

  validations() {
    return {
      form: {
        account_id: { required },
        price_tier: { required },
      },
    }
  },

  watch: {
    healthcare_service: {
      handler(val){
        this.form.healthcare_service = val
      },
    },
  },
  
  created() {
    this.getObservationCategory()
    this.getObservationInterpretationTypes()
  },

  methods: {
    ...mapActions({
      createDiagnosticResult: 'diagnostic/createDiagnosticResult',
      createDiagnosticObservation: 'patients/createDiagnosticObservation',
      updateServiceRequest: 'diagnostic/updateServiceRequest',
      refresh: 'appointments/refreshCurrentAppointment',
      getData: 'diagnostic/getServiceRequests',
      createSpecimen: 'diagnostic/createSpecimen',
      getServiceTypes: 'diagnostic/getServiceTypes',
      addToCurrentAppointment: 'appointments/addToCurrentAppointment',
      payForService: 'billing/userPayService',
      getPatientAccounts: 'billing/getPatientAccounts',
      getObservationCategory: 'resources/getObservationCategory',
      getObservationInterpretationTypes: 'resources/getObservationInterpretationTypes',
    }),

    close() {
      this.visible = false
      this.append = false
      this.specimen = false
      this.sampleRejected = false
      this.refresh()
    },

    addTag(field, tag) {
      let newTag = {
        code: tag,
        value: tag,
      }
      this.options[field].push(newTag)
      this.form[field].push(newTag)
    },

    remove(payload) {
      if (!payload.id) {
        return
      }

      this.removedObservations.push(payload)
    },

    async takeSample(){
      this.loading = true
      let payload = [{
        service_request: this.form.id, // required
        specimen_type: this.form.specimen,
        collection_body_site: this.form.service_request_bodysite,
        collector: this.practitionerRoleId,
      }]
      try {
        await this.createSpecimen(payload)
        this.$toast.open({
          message: 'Sample successfully taken',
        })
        this.specimen = !this.specimen
        this.form.status = 'sample-collected'
        this.sampleRejected = false
        this.append = true
        this.loading = false
      } catch (error) {
        this.loading = false
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
      }
    },

    async serviceType(id){
      let payload = {
        service_request: id,
      }
      const data = await this.getServiceTypes(payload)
      this.specimenTypes = data || []
    },

    async rejectSample(reject){
      if(reject){
        this.rejectLoading = true
        this.form.status = 'cancelled'
        this.diagnostic_report_cancelled_reasons = [{ display: this.form.comment, practitioner_role: this.practitionerRoleId}]
        try {
          await this.updateServiceRequest(this.form)
          this.sampleRejected = !this.sampleRejected
          this.append = false
          this.$toast.open({
            message: 'Sample successfully rejected',
          })
          this.rejectLoading = false
        } catch (error) {
          this.rejectLoading = false
          this.$toast.open({
            message: error.message || 'Something went wrong!',
            type: 'error',
          })
        }
      } else {
        this.sampleRejected = !this.sampleRejected
        this.append = false
      }
    },

    async createObservation() {
      this.appendLoading = true
      try {
        this.createRequest()
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.appendLoading = true
      }
    },

    listObservation(code, value) {
      let payload = {
        code: code,
        value: value,
        unit: null,
      }
      return payload
    },

    async createRequest() {
      let payload = {
        // code: this.form.code,
        // patient: this.form.patient,
        based_on: this.form.id,
        status: 'partial',
        results: this.categoryList,
        performers: [this.practitionerRoleId],
        conclusion: this.form.conclusion,
      }

      try {
        await this.createDiagnosticResult(payload)
        this.appendLoading = false
        this.sampleRejected = false
        this.append = !this.append
        this.$toast.open({
          message: 'Result successfully appended',
        })
        this.$router.push({name: 'Diagnostic:Reports'})
      } catch (error) {
        this.appendLoading = false
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
      }
    },

    async appendResult(append){
      if(append){
        this.categoryList = []
        this.appendLoading = true
        for (var key of Object.keys(this.categoryValues)) {
          this.categoryList.push(this.listObservation(key, this.categoryValues[key]))
        }
        this.createRequest()
      } else {
        this.appendLoading =false
        this.sampleRejected = false
        this.append = !this.append
      }
    },

    makePayment() {
      this.refresh()
      if (!this.form.code) {
        this.$toast.open({
          message: 'Service unavailable',
          type: 'error',
        })
      } else {
        this.pay = !this.pay
      }
    },

    async completePayment() {
      try {
        this.loading = true
        let payload = [
          {
            service_request: this.form.id, // a service request raised by a patient
            healthcare_service: this.form.healthcare_service,
            price_tier: this.form.price_tier.id,
            account_id: this.form.account_id,
            currency: this.form.currency,
            amount: this.form.amount,
            transaction_type: this.form.transaction_type, //user-wallet, corporate-account, mobile-money, cash
          },
        ]

        await this.payForService(payload)

        this.$toast.open( 'Bill successfully settled' )
        this.loading = false
        this.form.status = 'active'
        this.getData(this.params)
        if(this.form.status !== 'draft' && this.$isCurrentWorkspace('BILL')){
          this.visible = false
        } else {
          this.pay = false
        }
      } catch (error) {
        this.loading = false
        this.$toast.open({
          message: error.message || 'Payment unsuccessful!',
          type: 'error',
        })
      }
    },
  },
}
</script>
