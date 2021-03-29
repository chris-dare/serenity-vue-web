<template>
  <div class="space-y-8">
    <cv-text-input
      v-model="form.healthcare_service_name"
      label="Name of service"
      placeholder="eg General Consultation"
      class="inherit-full-input"
      :invalid-message="$utils.validateRequiredField($v, 'healthcare_service_name')"
    />
    <div class="grid grid-cols-2 gap-4">
      <cv-select
        v-model="required"
        label="Is appointment required for this service?"
        class="inherit-full-input"
        placeholder="Yes or No"
      >
        <cv-select-option>Yes</cv-select-option>
        <cv-select-option>No</cv-select-option>
      </cv-select>
      
      <cv-select
        v-model="code"
        label="Select service code"
        class="inherit-full-input"
        placeholder="Select code"
        :invalid-message="$v.code.$error && $v.code.$dirty ? 'This field is required' : ''"
      >
        <cv-select-option
          v-for="(item, index) in codes"
          :key="index"
          :value="item.code"
        >
          {{ item.display_text }}
        </cv-select-option>
      </cv-select>
    </div>

    <cv-number-input
      v-model="form.slot_duration"
      label="Enter slot duration(in minutes)"
      placeholder="Duration in minutes eg 20"
      :invalid-message="$utils.validateRequiredField($v, 'slot_duration')"
    />

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
      />
      <p class="text-red-500 text-xs my-2">{{ $utils.validateRequiredField($v, 'healthcare_service_locations') }}</p>
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
      />
      <p class="text-red-500 text-xs my-2">{{ $utils.validateRequiredField($v, 'healthcare_service_categories') }}</p>
    </div>

    <div>
      <p class="bx--label">Select service specialties</p>
      <Multiselect
        v-model="form.healthcare_service_specialty"
        :options="specialties"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="Select one or more specialties"
        label="Display"
        track-by="Code"
        autocomplete.native="off"
      />
      <p class="text-red-500 text-xs my-2">{{ $utils.validateRequiredField($v, 'healthcare_service_specialty') }}</p>
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
import { required, minLength, minValue} from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
import Multiselect from 'vue-multiselect'
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'

export default {
  name: 'ServiceInformation',

  components: { Multiselect },

  data() {
    return {
      form: {
        healthcare_service_appointment_required: 'Yes',
        healthcare_service_locations: [],
        healthcare_service_categories: [],
        healthcare_service_specialty: [],
        slot_duration: 30,
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
      healthcare_service_specialty: { required, minLength: minLength(1) },
      slot_duration: {
        required,
        minValue: minValue(1),
      },
    },
    code: { required },
  },

  computed: {
    ...mapState({
      locations: (state) => state.locations.locations,
      categories: (state) => state.resources.categories,
      codes: (state) => state.resources.codes,
      specialties: (state) => state.resources.specialties,
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
        healthcare_service_appointment_required: this.required === 'Yes',
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
