<template>
  <cv-form
    autocomplete="off"
    @submit.prevent
  >
    <div class="space-y-8">
      <cv-text-input
        v-model="form.healthcare_service_name"
        label="Name of service"
        placeholder="eg General Consultation"
        type="text"
        class="inherit-full-input"
        :invalid-message="$utils.validateRequiredField($v, 'healthcare_service_name')"
      />

      <cv-text-area
        v-model="form.healthcare_service_description"
        label="Service description"
        placeholder="Give more information about the service"
        class="inherit-full-input"
        :rows="4"
      />

      <MultiSelect
        v-model="form.healthcare_service_types[0]"
        :options="types"
        label="text"
        :multiple="false"
        track-by="text"
        class="multiselect-white"
        title="Type of Service"
        placeholder="Choose a service type"
        :error-message="$utils.validateRequiredField($v, 'healthcare_service_types')"
        preselect
      />

      <div class="grid grid-cols-2 gap-x-4">
        <div>
          <p class="bx--label">Does the service require an appointment?</p>
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
        <cv-number-input
          v-if="form.healthcare_service_appointment_required"
          v-model="form.slot_duration"
          label="Enter slot duration(in minutes)"
          placeholder="Duration in minutes eg 20"
          :invalid-message="$utils.validateRequiredField($v, 'slot_duration')"
        />
      </div>
    

    

      <div>
        <MultiSelect
          v-model="form.healthcare_service_locations"
          :options="locations"
          :multiple="true"
          placeholder="Select one or more locations"
          label="location_name"
          track-by="id"
          title="Select service location (s)"
          :error-message="$utils.validateRequiredField($v, 'healthcare_service_locations')"
        />
      </div>

      <div>
        <MultiSelect
          v-model="form.healthcare_service_categories[0]"
          :options="categories"
          :multiple="false"
          placeholder="Select one or more categories"
          label="text"
          track-by="text"
          title="Select service category"
          :error-message="$utils.validateRequiredField($v, 'healthcare_service_categories')"
        />
      </div>

      <div>
        <MultiSelect
          v-model="form.healthcare_service_specialties"
          :options="specialties"
          :multiple="true"
          placeholder="Select one or more specialties"
          label="Display"
          track-by="Code"
          title="Select service specialties"
          :error-message="$utils.validateRequiredField($v, 'healthcare_service_specialties')"
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
      },
      required: 'Yes',
    }
  },

  validations: {
    form: {
      healthcare_service_name: { required },
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
      healthcare_service_appointment_required: { required },
    },
  },

  computed: {
    ...mapState({
      locations: (state) => state.locations.locations,
      categories: (state) => state.resources.categories,
      specialties: (state) => state.resources.specialties,
      types: (state) => state.resources.serviceTypes,
      storeData: (state) => state.services.currentService,
    }),
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
      this.$router.push({ name: 'ServicePricing' })
    },

    cancel() {
      this.refreshCurrentService()
      this.$router.push({name: 'Services'})
    },
  },
}
</script>
