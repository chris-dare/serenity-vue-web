<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div class="space-y-8">
        <p class="text-lg font-semibold">{{ form.id ? 'Edit' : 'Create new' }} service</p>
        <cv-text-input
          v-model="form.healthcare_service_name"
          label="Name of service"
          placeholder="eg Valley Heights"
        >
          <template
            v-if="$v.form.healthcare_service_name.$error"
            slot="invalid-message"
          >
            Service name is required
          </template>
        </cv-text-input>

        <div class="grid grid-cols-2 gap-8">
          <cv-select
            v-model="form.healthcare_service_appointment_required"
            label="Is appointment required for this service?"
            class="inherit-full-input"
            placeholder="Yes or No"
          >
            <cv-select-option :value="true">Yes</cv-select-option>
            <cv-select-option :value="false">No</cv-select-option>
          </cv-select>
          <cv-select
            v-model="type"
            label="Select the type of service"
            class="inherit-full-input"
            placeholder="Yes or No"
          >
            <cv-select-option value="single">Single</cv-select-option>
            <cv-select-option value="tiered">Tiered(multiple sub services)</cv-select-option>
          </cv-select>
        </div>
        <!-- single -->
        <cv-text-input
          v-if="type === 'single'"
          v-model="price"
          label="Enter service price"
          placeholder="eg 50.00"
          type="number"
        />

        <div
          v-else
        >
          <div
            v-for="(tier, index) in tiers"
            :key="index"
            class="grid grid-cols-2 gap-8 mb-8"
          >
            <cv-text-input
              v-model="tier.name"
              label="Service Tier"
              placeholder="Service tier name"
            />
            <cv-text-input
              v-model="tier.cost"
              label="Price"
              placeholder="Service tier price"
              type="number"
            />
          </div>

          <div
            class="flex items-center space-x-2 text-serenity-primary mt-4 cursor-pointer text-sm"
            @click="addTier"
          >
            <AddAlt class="w-5 h-5" />
            <p class="text-serenity-primary">Add new service tier</p>
          </div>
        </div>

        <div>
          <p class="text-primary text-left text-xs mb-2">Select service category</p>
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
            :preselect-first="true"
          />
        </div>
  
        <cv-select
          v-model="code"
          label="Select service code"
          class="inherit-full-input"
          placeholder="Select one or more codes"
        >
          <cv-select-option
            v-for="(item, index) in codes"
            :key="index"
            :value="item.code"
          >
            {{ item.display_text }}
          </cv-select-option>
        </cv-select>

        <div>
          <p class="text-primary text-left text-xs mb-2">Select service location (s)</p>
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
            :preselect-first="true"
          />
        </div>

        <!-- Service available days -->
        <div>
          <p class="text-primary text-left text-xs mb-2">Service available days</p>
          <div class="grid grid-cols-7 items-center">
            <cv-checkbox
              v-for="(day, index) in ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']"
              :key="index"
              v-model="form.healthcare_service_available_times.daysOfWeek"
              :value="day"
              :label="day"
              class="capitalize"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-8">
          <Timepicker
            v-model="form.healthcare_service_available_times.availableStartTime"
            label="Specify a start time"
          />
          <Timepicker
            v-model="form.healthcare_service_available_times.availableEndTime"
            label="End time"
          />
          <cv-date-picker
            v-model="form.healthcare_service_not_available_times.during.start"
            kind="single"
            date-label="Service unavailable days: start date"
            class="inherit-full-input"
          />
          <cv-date-picker
            v-model="form.healthcare_service_not_available_times.during.end"
            kind="single"
            date-label="Service unavailable days: end date"
            class="inherit-full-input"
          />
          <cv-text-area
            v-model="form.healthcare_service_not_available_times.description"
            label="Description of unavailable dates"
            placeholder="eg New years eve"
            :rows="2"
            class="col-span-2"
          />
        </div>
        <div class="flex items-center justify-between">
          <p class="text-center">Cancel</p>

          
          <SeButton
            :loading="loading"
            @click="save"
          >
            {{ form.id ? 'Update service' : 'Create new service' }}
          </SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapState, mapActions} from 'vuex'
import Multiselect from 'vue-multiselect'

export default {
  name: 'AddEditService',

  components: { Multiselect },

  data() {
    return {
      form: {
        healthcare_service_not_available_times: {
          during: {
            start: '',
            end: '',
          },
        },
        healthcare_service_available_times: {
          daysOfWeek: [],
        },
        healthcare_service_categories: [],
        healthcare_service_locations: [],
        healthcare_service_appointment_required: 'yes',
      },
      type: 'single',
      price: '0',
      tiers: [{}],
      code: '',
      visible: false,
      loading: false,
    }
  },

  

  events: {
    'service:add:open': function(){
      this.visible = true
    },
    'service:edit:open': function(data){
      this.visible = true
      this.form = { ...data.params[0].name }
    },
  },

  computed: {
    ...mapState({
      locations: (state) => state.locations.locations,
      categories: (state) => state.resources.categories,
      codes: (state) => state.resources.codes,
    }),
  },

  created() {
    this.code = this.codes.length ? this.codes[0].code : ''
    this.form.healthcare_service_locations = this.locations.length ? this.locations[0] : ''
  },

  methods: {
    ...mapActions({
      createService: 'services/createService',
    }),

    formatOutgoingData(form) {
      const newForm = {
        ...form,
        healthcare_service_appointment_required: form.healthcare_service_appointment_required === 'yes',
      }

      let code = this.codes.find(c => c.code === this.code)
      newForm.healthcare_service_service_provision_code = code.code
      newForm.healthcare_service_service_provision_display_text = code.display_text


      newForm.healthcare_service_available_times= Array(form.healthcare_service_available_times)
      newForm.healthcare_service_not_available_times = Array(form.healthcare_service_not_available_times)

      // pricing

      if (this.type === 'single') {
        newForm.price_tiers = [{name: 'standard', cost: parseInt(this.price)}]
      } else {
        newForm.price_tiers = this.tiers.map(t => {
          newForm.cost = parseInt(t.cost)
          return t
        })
      }


      return newForm
    },

    addTier() {
      this.tiers.push({ name: '', cost: '0'})
    },

    removeFromTiers(priceIndex) {
      this.tiers.splice(priceIndex, 1)
    },

    submit(){
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      if (this.form.id) {
        this.update()
      } else {
        this.save()
      }
    },
  
    async save() {
      this.loading = true
      await this.createService(this.formatOutgoingData(this.form)).catch((error) => {
        this.$toast.open({
          message: 'Fill all required fields',
          type: 'error',
        })
        this.loading = false
        throw error
      })

      this.$toast.open({
        message: 'Service successfully added',
      })
      this.close
      this.loading = false
    },

    async update() {
      this.loading = true
      const data = await this.updateService(this.formatOutgoingData(this.form)).catch(() => {
        this.$toast.open({
          message: 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      })

      if (data) {
        this.$toast.open({
          message: 'Service successfully updated',
        })
        this.close
      }

      this.loading = false
      
    },

  },

  validations: {
    form: {
      healthcare_service_name: { required },
      healthcare_service_locations: { required },
    },
  },
}
</script>
