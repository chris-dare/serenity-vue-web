<template>
  <cv-form
    autocomplete="off"
    @submit.prevent
  >
    <div class="space-y-8">
      <FormInput
        v-model="form.healthcare_service_name"
        label="Name of service"
        placeholder="eg General Consultation"
        type="text"
        class="inherit-full-input"
        :invalid-message="$utils.validateRequiredField($v, 'healthcare_service_name')"
        required
        @input="generate"
      />

      <FormInput
        v-model="form.comment"
        label="Service description"
        placeholder="Give more information about the service"
        class="inherit-full-input"
        :rows="4"
        type="textarea"
      />

      <MultiSelect
        v-model="form.healthcare_service_types[0]"
        :options="serviceTypes"
        label="code"
        :multiple="false"
        track-by="code"
        title="Type of Service"
        placeholder="Choose a service type"
        :error-message="$utils.validateRequiredField($v, 'healthcare_service_types')"
        preselect
        required
      />

      <div class="grid grid-cols-2 gap-x-4">
        <div>
          <FormLabel
            :required="true"
            label="Does the service require an appointment?"
          />
          <cv-radio-group>
            <cv-radio-button
              v-model="form.healthcare_service_appointment_required"
              name="group-2"
              label="Yes"
              :value="true"
            />
            <cv-radio-button
              v-model="form.healthcare_service_appointment_required"
              name="group-2"
              label="No"
              :value="false"
            />
          </cv-radio-group>
          <p class="error">{{ $utils.validateRequiredField($v, 'healthcare_service_appointment_required') }}</p>
        </div>
        <FormInput
          v-if="form.healthcare_service_appointment_required"
          v-model="form.slot_duration"
          label="Enter slot duration(in minutes)"
          placeholder="Duration in minutes eg 20"
          :invalid-message="$utils.validateRequiredField($v, 'slot_duration')"
          type="number"
        />
      </div>

      <div class="grid grid-cols-2 gap-x-4">
        <div>
          <p class="bx--label">Is the service a virtual service?</p>
          <cv-radio-group>
            <cv-radio-button
              v-model="form.virtual_service"
              name="virtual-service"
              label="Yes"
              :value="true"
            />
            <cv-radio-button
              v-model="form.virtual_service"
              name="virtual-service"
              label="No"
              :value="false"
            />
          </cv-radio-group>
        </div>
        <MsisdnPhoneInput v-model="form.telecom" />
      </div>

      <div>
        <MultiSelect
          v-model="form.healthcare_service_locations"
          :options="locations"
          :multiple="true"
          placeholder="Select one or more locations"
          label="location_name"
          track-by="id"
          title="Service location (s)"
          :error-message="$utils.validateRequiredField($v, 'healthcare_service_locations')"
          required
        />
      </div>

      <div>
        <MultiSelect
          v-model="form.healthcare_service_categories[0]"
          :options="serviceCategories"
          :multiple="false"
          placeholder="Select a category"
          label="code"
          track-by="code"
          title="Service category"
          :error-message="$utils.validateRequiredField($v, 'healthcare_service_categories')"
          required
        />
      </div>

      <div
        v-if="isDiagnostic"
        class="space-y-8"
      >
        <MultiSelect
          v-model="form.order_code"
          :options="labProceedures"
          :multiple="false"
          placeholder="Select an order code"
          label="display"
          track-by="code"
          custom-field="code"
          title="Diagnostic order code"
          :error-message="$utils.validateRequiredField($v, 'order_code')"
          :required="isDiagnostic"
        />
        <MultiSelect
          v-model="form.diagnostic_service_section"
          :options="serviceSectionTypes"
          :multiple="false"
          placeholder="Select a service section"
          label="display"
          track-by="code"
          custom-field="code"
          title="Diagnostic service section"
          :error-message="$utils.validateRequiredField($v, 'diagnostic_service_section')"
          :required="isDiagnostic"
        />
        <MultiSelect
          v-model="form.service_request_category"
          :options="serviceCategoryTypes"
          :multiple="false"
          placeholder="Select a service request category"
          label="display"
          track-by="code"
          custom-field="code"
          title="Service request category"
          :error-message="$utils.validateRequiredField($v, 'service_request_category')"
          :required="isDiagnostic"
        />
      </div>

      <div>
        <MultiSelect
          v-model="form.healthcare_service_specialties"
          :options="specialties"
          :multiple="true"
          placeholder="Select one or more specialties"
          label="display"
          track-by="code"
          title="Service specialties"
          :error-message="$utils.validateRequiredField($v, 'healthcare_service_specialties')"
          required
        />
      </div>

      <div class="flex items-center justify-between mt-12 mb-6">
        <SeButton
          variant="outline"
          @click="cancel"
        >
          Cancel
        </SeButton>
        <div class="flex items-center">
          <SeButton
            :icon="icon"
            @click="save"
          >
            Next
          </SeButton>
        </div>
      </div>
    </div>
  </cv-form>
</template>

<script>
import { required, minLength, minValue, requiredIf } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
import debounce from 'lodash/debounce'
// import ServiceRequestAPI from '@/api/service-requests'

import MultiStep from '@/mixins/multistep'

export default {
  name: 'ServiceInformation',

  mixins: [MultiStep],

  data() {
    return {
      form: {
        healthcare_service_locations: [],
        healthcare_service_categories: [],
        healthcare_service_specialties: [],
        healthcare_service_types: [],
        slot_duration: 30,
        virtual_service: false,
        healthcare_service_appointment_required: true,
        comment: '',
      },
      required: 'Yes',
    }
  },

  validations: {
    form: {
      healthcare_service_name: {
        required,
        async isUnique(value) {
          if (value === '' || this.form.id) return true
          const data = await this.services.find(service => service.healthcare_service_name.toLowerCase() === value.toLowerCase() )

          return data ? false : true
        },
      },
      healthcare_service_locations: { required, minLength: minLength(1) },
      healthcare_service_categories: { required, minLength: minLength(1) },
      healthcare_service_specialties: { required, minLength: minLength(1) },
      healthcare_service_types: { required, minLength: minLength(1) },
      slot_duration: {
        required: requiredIf(function (nestedModel) {
          return nestedModel.healthcare_service_appointment_required
        }),
        minValue: minValue(1),
      },
      order_code: {
        required: requiredIf(function () {
          return this.isDiagnostic
        }),
      },
      diagnostic_service_section: {
        required: requiredIf(function () {
          return this.isDiagnostic
        }),
      },
      service_request_category: {
        required: requiredIf(function () {
          return this.isDiagnostic
        }),
      },
      healthcare_service_appointment_required: { required },
    },
  },

  computed: {
    ...mapState({
      locations: (state) => state.locations.locations,
      services: (state) => state.services.services,
      categories: (state) => state.resources.categories,
      specialties: (state) => state.resources.specialties,
      serviceTypes: (state) => state.resources.serviceTypes,
      labProceedures: (state) => state.resources.diagnosticLabProceedures,
      serviceCategoryTypes: (state) => state.resources.serviceRequestCategoryTypes,
      serviceSectionTypes: (state) => state.resources.serviceRequestSectionTypes,
      storeData: (state) => state.services.currentService,
      provider: (state) => state.auth.provider,
    }),

    serviceCategories() {
      return this.categories.map(service => {
        return {
          code: service.code,
        }
      })
    },

    isDiagnostic() {
      return this.form.healthcare_service_categories[0]?.code === 'Diagnostic'
    },
  },

  created() {
    this.getCategories()
    this.getServiceTypes()
  },

  methods: {
    ...mapActions({
      addToStoreData: 'services/addToCurrentService',
      refreshCurrentService: 'services/refreshCurrentService',
      getCategories: 'resources/getCategories',
      getServiceTypes: 'resources/getServiceTypes',
    }),

    save() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'Fill all required fields!',
          type: 'error',
        })
        return
      }

      this.addToStoreData(this.form)
      this.$router.push({ name: 'ServicePricing' })
    },

    cancel() {
      this.refreshCurrentService()
      this.$router.push({name: 'Services'})
    },

    generate: debounce(function () {
      this.generateServiceDescription()
    }, 500),

    generateServiceDescription() {
      if (this.form.id || !this.form.healthcare_service_name) {
        return
      }
      this.$v.$touch()
      this.form.comment = `Healthcare service for ${this.form.healthcare_service_name} at ${this.provider.organization_name}`
    },

    customLabel({code}) {
      return code.split('_').join(' ')
    },
  },
}
</script>
