<template>
  <div class="space-y-8">
    <cv-text-input
      v-model="form.healthcare_service_name"
      label="Name of service"
      placeholder="eg General Consultation"
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
      v-model="form.healthcare_service_types"
      multiple
      :options="types"
      label="text"
      class="multiselect-white"
      title="Type of Service"
      placeholder="Choose a service type"
      :error-message="$utils.validateRequiredField($v, 'healthcare_service_types')"
    />

    <div class="grid grid-cols-2 gap-x-4">
      <div>
        <p class="bx--label">Is the service virtual?</p>
        <cv-radio-group>
          <cv-radio-button
            v-model="form.virtual_service"
            name="group-1"
            label="Yes"
            :value="true"
          />
          <cv-radio-button
            v-model="form.virtual_service"
            name="group-1"
            label="No"
            :value="false"
          />
        </cv-radio-group>
        <p class="error">{{ $utils.validateRequiredField($v, 'virtual_service') }}</p>
      </div>

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
    </div>
    <div class="grid grid-cols-2 gap-4">
      <cv-select
        v-model="code"
        label="Select service code"
        class="inherit-full-input"
        placeholder="Select code"
        :invalid-message="$v.code.$error && $v.code.$dirty ? 'Service code is required' : ''"
      >
        <cv-select-option
          v-for="(item, index) in codes"
          :key="index"
          :value="item.code"
        >
          {{ item.display_text }}
        </cv-select-option>
      </cv-select>
      <cv-number-input
        v-if="form.healthcare_service_appointment_required"
        v-model="form.slot_duration"
        label="Enter slot duration(in minutes)"
        placeholder="Duration in minutes eg 20"
        :invalid-message="$utils.validateRequiredField($v, 'slot_duration')"
      />
    </div>

    

    <div>
      <p class="bx--label">Select service location (s)</p>
      <Multiselect
        v-model="form.healthcare_service_locations"
        :options="locations"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="Select one or more locations"
        label="location_name"
        track-by="id"
        preselect-first
      />
      <p class="error">{{ $utils.validateRequiredField($v, 'healthcare_service_locations') }}</p>
    </div>

    <div>
      <p class="bx--label">Select service category</p>
      <Multiselect
        v-model="form.healthcare_service_categories"
        :options="categories"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="Select one or more categories"
        label="text"
        track-by="text"
        preselect-first
      />
      <p class="error">{{ $utils.validateRequiredField($v, 'healthcare_service_categories') }}</p>
    </div>

    <div>
      <p class="bx--label">Select service specialties</p>
      <Multiselect
        v-model="form.healthcare_service_specialties"
        :options="specialties"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="Select one or more specialties"
        label="Display"
        track-by="Code"
        autocomplete.native="off"
        preselect-first
      />
      <p class="error">{{ $utils.validateRequiredField($v, 'healthcare_service_specialties') }}</p>
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
</template>

<script>
import { required, minLength, minValue, requiredIf } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
import Multiselect from 'vue-multiselect'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'

export default {
  name: 'ServiceInformation',

  components: { Multiselect },

  data() {
    return {
      form: {
        healthcare_service_locations: [],
        healthcare_service_categories: [],
        healthcare_service_specialties: [],
      },
      code: null,
      icon: ChevronRight,
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
          console.log('model', nestedModel)
          return nestedModel.healthcare_service_appointment_required
        }),
        minValue: minValue(1),
      },
      virtual_service: { required },
      healthcare_service_appointment_required: { required },
    },
    code: { required },
  },

  computed: {
    ...mapState({
      locations: (state) => state.locations.locations,
      categories: (state) => state.resources.categories,
      codes: (state) => state.resources.codes,
      specialties: (state) => state.resources.specialties,
      types: (state) => state.resources.serviceTypes,
      currentService: (state) => state.services.currentService,
    }),
  },

  created() {
    this.form = { ...this.currentService, ...this.form }
  },

  methods: {
    ...mapActions({
      addToCurrentService: 'services/addToCurrentService',
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

      let code = this.codes.find(c => c.code === this.code)

      this.form = {
        ...this.form,
        healthcare_service_service_provision_code: code.code,
        healthcare_service_service_provision_display_text: code.display_text,
        // healthcare_service_appointment_required: this.required === 'Yes',
      }

      this.addToCurrentService(this.form)
      this.$router.push({ name: 'ServicePricing' })
    },

    cancel() {
      this.refreshCurrentService()
      this.$router.push({name: 'Services'})
    },
  },
}
</script>
