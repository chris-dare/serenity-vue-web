<template>
  <div class="space-y-8">
    <div>
      <p class="bx--label mb-6 uppercase">Service available days</p>
      <p class="bx--label">Day</p>
      <div class="grid grid-cols-7 items-center">
        <cv-checkbox
          v-for="(day, index) in ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']"
          :key="index"
          v-model="form.healthcare_service_available_times[0].daysOfWeek"
          :value="day"
          :label="day"
          class="capitalize"
        />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-x-4 gap-y-2">
      <Timepicker
        v-model="form.healthcare_service_available_times[0].availableStartTime"
        label="Specify a start time"
      />
      <Timepicker
        v-model="form.healthcare_service_available_times[0].availableEndTime"
        label="End time"
      />
      <p
        v-if="$utils.validateRequiredField($v, 'healthcare_service_available_times')"
        class="text-red-600 text-xs my-3 col-span-2"
      >
        Select values for day, start time and end time
      </p>
    </div>

    <div class="grid grid-cols-2 gap-x-4 gap-y-8">
      <p class="bx--label col-span-2 uppercase">Service unavailable days</p>
      <cv-date-picker
        v-model="form.healthcare_service_not_available_times[0].during.start"
        kind="single"
        date-label="Start date"
        class="inherit-full-input"
      />
      <cv-date-picker
        v-model="form.healthcare_service_not_available_times[0].during.end"
        kind="single"
        date-label="End date"
        class="inherit-full-input"
      />
      <cv-text-area
        v-model="form.healthcare_service_not_available_times[0].description"
        label="Description of unavailable dates"
        placeholder="eg New years eve"
        :rows="2"
        class="col-span-2"
      />
    </div>

    <div class="flex items-center justify-between mt-12 mb-6">
      <div class="flex items-center space-x-2">
        <SeButton
          variant="outline"
          @click="cancel"
        >
          Cancel
        </SeButton>
        <SeButton
          :to="{ name: 'ServicePricing' }"
          variant="secondary"
        >
          Go back
        </SeButton>
      </div>
      <div class="flex items-center">
        <SeButton
          :icon="icon"
          variant="primary"
          :loading="loading"
          @click="save"
        >
          Next
        </SeButton>
      </div>
    </div>
  </div>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapActions, mapState } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'ServiceAvailability',

  data() {
    return {
      form: {
        healthcare_service_not_available_times: [{
          description: '',
          during: {
            start: '',
            end: '',
          },
        }],
        healthcare_service_available_times: [
          {
            daysOfWeek: [],
            availableStartTime: '',
            availableEndTime: '',
          },
        ],
      },
      icon: ChevronRight,
      loading: false,
    }
  },

  computed: {
    ...mapState({
      currentService: (state) => state.services.currentService,
    }),
  },

  created() {
    if (Object.keys(this.currentService).length === 0) {
      this.$router.push({name: 'ServiceInformation'})
    }
    this.form = { ...this.currentService, ...this.form }
  },

  validations: {
    form: {
      healthcare_service_available_times: {
        required,
        minLength: minLength(1),
        $each: {
          daysOfWeek: {
            minLength: minLength(1),
          },
          availableStartTime: { required },
          availableEndTime: { required },
        },
      },
    },
  },

  methods: {
    ...mapActions({
      createService: 'services/createService',
      refreshCurrentService: 'services/refreshCurrentService',
    }),

    async save() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }
    
      this.loading = true
      await this.createService(this.form).catch((error) => {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
        throw error
      })

      this.$toast.open({
        message: 'Service successfully added',
      })
      this.$router.push({name: 'Services'})
      this.loading = false
    },

    cancel() {
      this.refreshCurrentService()
      this.$router.push({name: 'Services'})
    },
  },
}
</script>
