<template>
  <div class="space-y-8">
    <div class="flex flex-col">
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

    <p class="bx--label col-span-2 uppercase">Service unavailable days</p>
    
    <div
      v-for="(times, index) in form.healthcare_service_not_available_times"
      :key="index"
      class="grid grid-cols-11 gap-x-4 gap-y-8 items-center"
    >
      <div class="col-span-10">
        <DateRangePicker
          v-model="times.during"
          class="col-span-2 mb-8"
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
import DateRangePicker from '@/components/ui/form/DateRangePicker'

export default {
  name: 'ServiceAvailability',

  components: {DateRangePicker},

  mixins: [MultiStep],

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
            daysOfWeek: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
            availableStartTime: '08:00:00',
            availableEndTime: '20:00:00',
          },
        ],
      },
      loading: false,
      
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
              return !!nestedModel.during.start
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

      if (this.form.id) {
        this.update()
      } else {
        this.save()
      }
    },

    async save() {
    
      this.loading = true
      try {
        await this.createService(this.form)
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
      // await this.createService(this.form).catch((error) => {
      //   this.$toast.open({
      //     message: error.message || 'Something went wrong!',
      //     type: 'error',
      //   })
      //   this.loading = false
      //   throw error
      // })

      // this.$toast.open({
      //   message: 'Service successfully added',
      // })
      // this.$router.push({name: 'Services'})
      // this.loading = false
    },

    async update() {
      this.loading = true

      this.addToStoreData(this.form)

      try {
        await this.updateService(this.form)
        this.$toast.open({
          message: 'Service successfully updated',
        })
        this.reset()
        this.$router.push({name: 'TeamDetail', params: { id: this.form.id }})
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
        during: {
          start: '',
          end: '',
        },
      })
    },

    removeFromUnavailableDates(index) {
      this.form.healthcare_service_not_available_times.splice(index, 1)
    },
  },
}
</script>
