<template>
  <div class="space-y-8">
    <div class="flex flex-col">
      <p class="bx--label mb-6 uppercase">Service available days</p>
      <p class="bx--label">Day</p>
      <div class="grid grid-cols-7 items-center">
        <cv-checkbox
          v-for="(day, index) in ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']"
          :key="index"
          v-model="form.healthcare_service_available_times[0].daysOfWeek"
          :value="day"
          :label="day"
          class="capitalize"
          name="serviceDays"
        />
      </div>
    </div>

    <div class="grid grid-cols-8 gap-x-4 gap-y-2 items-end">
      <DatePicker
        v-model="form.healthcare_service_available_times[0].availableStartTime"
        type="time"
        label="Specify a start time"
        class="col-span-3 se-input-gray"
        :disabled="form.healthcare_service_available_times[0].is_all_day"
      />
      <DatePicker
        v-model="form.healthcare_service_available_times[0].availableEndTime"
        type="time"
        label="End time"
        class="col-span-3 se-input-gray"
        :disabled="form.healthcare_service_available_times[0].is_all_day"
      />
      <cv-checkbox
        v-model="form.healthcare_service_available_times[0].is_all_day"
        :value="true"
        label="Is all day"
        class="capitalize col-span-2 pb-3"
      />
      <p
        v-if="$utils.validateRequiredField($v, 'healthcare_service_available_times')"
        class="text-red-600 text-xs my-3 col-span-7"
      >
        Select values for day, start time and end time
      </p>
    </div>

    <p class="bx--label col-span-2 uppercase">Service unavailable days</p>

    <div
      v-for="(times, index) in form.healthcare_service_not_available_times"
      :key="index"
      class="grid grid-cols-11 gap-x-4 gap-y-8 items-center"
    >
      <div class="col-span-10 grid grid-cols-2 gap-x-4 gap-y-8">
        <DatePicker
          v-model="times.start_date"
          class="se-input-gray"
          label="Start Date"
          placeholder="Select a start date"
          format="Z"
          disable-dates-before-today
        />
        <DatePicker
          v-model="times.end_date"
          :min-date="times.start_date"
          class="se-input-gray"
          label="End date"
          placeholder="Select an end date"
          format="Z"
          disable-dates-before-today
        />
        <cv-text-area
          v-model="times.description"
          label="Description of unavailable dates"
          placeholder="eg New years eve"
          :rows="2"
          class="col-span-2"
        />
      </div>

      <Trash
        class="w-5 h-5 cursor-pointer"
        @click="removeFromUnavailableDates(index)"
      />
    </div>
    <p
      v-if="$utils.validateRequiredField($v, 'healthcare_service_not_available_times')"
      class="error col-span-2"
    >
      Description of unavailable dates is required when a date is added
    </p>

    <div
      class="flex items-center space-x-2 text-serenity-primary my-4 cursor-pointer text-sm"
      @click="addUnavailability"
    >
      <AddAlt class="w-5 h-5" />
      <p class="text-serenity-primary">Add new unavailable date</p>
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
          @click="submit"
        >
          Next
        </SeButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required, minLength, requiredIf } from 'vuelidate/lib/validators'
import isEmpty from 'lodash/isEmpty'
import MultiStep from '@/mixins/multistep'

export default {
  name: 'ServiceAvailability',

  mixins: [MultiStep],

  data() {
    return {
      form: {
        healthcare_service_not_available_times: [{
          description: '',
          start_date: null,
          end_date: null,
        }],
        healthcare_service_available_times: [
          {
            daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            availableStartTime: '08:00:00',
            availableEndTime: '20:00:00',
          },
        ],
      },
      loading: false,
      priorities: [],
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.services.currentService,
    }),
  },

  created() {
    if (isEmpty(this.storeData)) {
      this.$router.push({name: 'ServiceInformation'})
    }

    if (isEmpty(this.form.healthcare_service_available_times)) {
      this.form.healthcare_service_available_times = [{
        daysOfWeek: [],
      }]
    }
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
      healthcare_service_not_available_times: {
        $each: {
          description: {
            required: requiredIf(function (nestedModel) {
              return !!nestedModel.start_date
            }),
          },
        },
      },
    },
  },

  methods: {
    ...mapActions({
      createService: 'services/createService',
      updateService: 'services/updateService',
      refreshCurrentService: 'services/refreshCurrentService',
      addToStoreData: 'services/addToCurrentService',
    }),

    submit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        return
      }

      this.addToStoreData(this.form)

      if (this.form.id) {
        this.update()
      } else {
        this.save()
      }
    },

    async save() {
      this.loading = true

      try {
        await this.createService(this.formattedForm())
        this.$toast.open({
          message: 'Service successfully added',
        })
        this.$router.push({name: 'Services'})
        this.loading = false
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
        throw error
      }
    },

    async update() {
      this.loading = true

      try {
        await this.updateService(this.formattedForm())
        this.$toast.open({
          message: 'Service successfully updated',
        })
        this.loading = false
        this.$router.push({ name: 'Services' })
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
      }

      this.loading = false
    },

    cancel() {
      this.refreshCurrentService()
      this.$router.push({name: 'Services'})
    },

    addUnavailability() {
      this.form.healthcare_service_not_available_times.push({
        description: '',
        start_date: '',
        end_date: '',
      })
    },

    removeFromUnavailableDates(index) {
      this.form.healthcare_service_not_available_times.splice(index, 1)
    },

    convertToTimeZone(time) {
      return `${time}Z`
    },

    formattedForm() {
      let newForm = { ...this.form }

      newForm.healthcare_service_not_available_times = newForm.healthcare_service_not_available_times.filter(time => time.description)

      newForm.healthcare_service_specialties = newForm.healthcare_service_specialties.map(service => {
        return {
          code: service.code,
        }
      })

      return newForm
    },
  },
}
</script>
