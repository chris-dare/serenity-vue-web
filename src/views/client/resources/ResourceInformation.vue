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
        label="Name of resource"
        placeholder="e.g. Beds"
        type="text"
        class="inherit-full-input"
        :invalid-message="$utils.validateRequiredField($v, 'healthcare_service_name')"
        required
        @input="generate"
      />

      <FormInput
        v-model="form.comment"
        label="Resource description"
        placeholder="Give more information about the resource"
        class="inherit-full-input"
        :rows="4"
        type="textarea"
      />

      <MultiSelect
        v-model="form.category"
        :options="[]"
        :multiple="false"
        placeholder="Choose a category"
        label="display"
        track-by="code"
        custom-field="code"
        title="Category"
      />

      <MultiSelect
        v-model="form.sub_category"
        :options="[]"
        label="code"
        :multiple="false"
        track-by="code"
        title="Sub category"
        placeholder="Choose a sub category"
        preselect
      />

      <MultiSelect
        v-model="form.locations"
        :options="locations"
        :multiple="true"
        placeholder="Select one or more locations"
        label="location_name"
        track-by="id"
        title="Available locations"
      />
      
      <FormInput
        v-model="form.quantity"
        label="Quantity available"
        placeholder="Give an available quantity"
        class="inherit-full-input"
        type="number"
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

  created() {
    this.getCategories()
  },

  methods: {
    ...mapActions({
      addToStoreData: 'services/addToCurrentService',
      refreshCurrentService: 'services/refreshCurrentService',
      getCategories: 'resources/getCategories',
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
      this.form.comment = `Resource for ${this.form.healthcare_service_name} at ${this.provider.organization_name}`
    },
  },
}
</script>
