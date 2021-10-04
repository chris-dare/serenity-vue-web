<template>
  <MultiStepBase
    :icon="icon"
    next-label="Next"
    @cancel="cancel"
    @save="save"
  >
    <div class="space-y-8">
      <FormInput
        v-model="form.healthcare_service_name"
        label="Name of ward"
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

      <MultiSelect
        v-model="form.healthcare_service_locations"
        :options="locations"
        :multiple="true"
        placeholder="Select one or more locations"
        label="location_name"
        track-by="id"
        title="Available locations"
        :error-message="$utils.validateRequiredField($v, 'healthcare_service_locations')"
        required
      />
      <MultiSelect
        v-model="form.diagnostic_service_section"
        :options="serviceSectionTypes"
        :multiple="false"
        placeholder="Select a service section"
        label="display"
        track-by="code"
        custom-field="code"
        title="Section"
        :error-message="$utils.validateRequiredField($v, 'diagnostic_service_section')"
        :required="isDiagnostic"
      />

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

      <MultiSelect
        v-model="form.healthcare_service_resources"
        :options="[]"
        :multiple="true"
        placeholder="Select one or more specialties"
        label="display"
        track-by="code"
        title="Default allocated resources"
        :error-message="$utils.validateRequiredField($v, 'healthcare_service_specialties')"
        required
      />
    </div>
  </MultiStepBase>
</template>

<script>
import { required, minLength, requiredIf } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
import debounce from 'lodash/debounce'
import MultiStep from '@/mixins/multistep'

export default {
  name: 'WardInformation',

  mixins: [MultiStep],

  data() {
    return {
      form: {
        healthcare_service_locations: [],
        healthcare_service_categories: [],
        healthcare_service_specialties: [],
        healthcare_service_types: [],
      },
    }
  },

  computed: {

    ...mapState({
      locations: (state) => state.locations.locations,
      categories: (state) => state.resources.categories,
      specialties: (state) => state.resources.specialties,
      serviceTypes: (state) => state.resources.serviceTypes,
      labProceedures: (state) => state.resources.diagnosticLabProceedures,
      serviceCategoryTypes: (state) => state.resources.serviceRequestCategoryTypes,
      serviceSectionTypes: (state) => state.resources.serviceRequestSectionTypes,
      storeData: (state) => state.services.currentService,
      provider: (state) => state.auth.provider,
    }),

    isDiagnostic() {
      return true
    //   return this.form.healthcare_service_categories[0]?.code === 'Diagnostic'
    },

    next() {
      return this.$route.meta.next
    },
    previous() {
      return this.$route.meta.previous
    },
  },

  validations: {
    form: {
      healthcare_service_name: { required },
      healthcare_service_locations: { required, minLength: minLength(1) },
      healthcare_service_specialties: { required, minLength: minLength(1) },
      healthcare_service_types: { required, minLength: minLength(1) },
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
    },
  },

  methods: {
    ...mapActions({
      addToStoreData: 'services/addToCurrentService',
      refreshCurrentService: 'services/refreshCurrentService',
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
      this.$router.push({ name: this.next})
    },

    generate: debounce(function () {
      this.generateServiceDescription()
    }, 500),

    generateServiceDescription() {
      if (this.form.id) {
        return
      }
      this.form.comment = `Ward for ${this.form.healthcare_service_name} at ${this.provider.organization_name}`
    },
  },
}
</script>
