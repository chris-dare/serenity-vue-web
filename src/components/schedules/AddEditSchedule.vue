<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="content">
      <cv-form
        autocomplete="off"
        class="space-y-8 left-button"
        @submit.prevent
      >
        <p class="text-lg font-semibold">{{ form.id ? 'Edit' : 'New' }} schedule</p>
        <MultiSelect
          v-model="form.practitioner"
          title="Who are you scheduling?"
          :multiple="false"
          :options="practitioners"
          label="first_name"
          track-by="id"
          placeholder="Select or search for practitioner"
          :custom-label="customLabel"
          :error-message="$utils.validateRequiredField($v, 'practitioner')"
          :disabled="!!form.id"
        />

        <div class="grid grid-cols-2 gap-4">
          <MultiSelect
            v-model="form.location"
            title="Clinic/Workspace"
            :multiple="false"
            :options="locations"
            label="location_name"
            track-by="id"
            placeholder="Select workspace"
          />

          <MultiSelect
            v-model="form.health_service"
            title="Service"
            :multiple="false"
            :options="services"
            label="healthcare_service_name"
            track-by="id"
            placeholder="Select service"
            :error-message="$utils.validateRequiredField($v, 'health_service')"
          />
        </div>

        <div>
          <p class="bx--label">Which day(s)</p>
          <div
            v-if="form.id"
            class="grid grid-cols-7 items-center"
          >
            <cv-radio-button
              v-for="(day, index) in ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']"
              :key="index"
              v-model="form.day"
              :value="day"
              :label="day"
              class="capitalize"
              name="days"
            />
          </div>
          <div
            v-else
            class="grid grid-cols-7 items-center"
          >
            <cv-checkbox
              v-for="(day, index) in ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']"
              :key="index"
              v-model="form.days"
              :value="day"
              :label="day"
              class="capitalize"
              name="days"
            />
          </div>
          <p class="error">{{ $utils.validateRequiredField($v, 'days') }}</p>
        </div>

        <div class="grid grid-cols-2 gap-x-4 gap-y-8">
          <Timepicker
            v-model="form.start_time"
            label="Specify a start time"
            :error-message="$utils.validateRequiredField($v, 'start_time')"
          />
          <Timepicker
            v-model="form.end_time"
            label="End time"
            :error-message="$utils.validateRequiredField($v, 'end_time')"
          />
          <div>
            <div class="bx--label">Does the schedule repeat?</div>
            <cv-radio-group>
              <cv-radio-button
                v-model="form.check"
                name="group-1"
                label="Yes"
                value="yes"
              />
              <cv-radio-button
                v-model="form.check"
                name="group-1"
                label="No"
                value="no"
              />
            </cv-radio-group>
          </div>

          <cv-number-input
            v-if="form.check === 'yes'"
            v-model="form.recurring_weeks"
            label="For how many weeks"
            placeholder="eg 4 weeks"
          />
        </div>

        <cv-text-area
          v-model="form.comment"
          label="Any comments on this schedule"
          placeholder="Add special comments"
          :rows="2"
        />

        <div class="flex items-center justify-between">
          <SeButton
            variant="secondary"
            @click="close"
          >
            Cancel
          </SeButton>
          <SeButton
            :loading="loading"
            @click="submit"
          >
            {{ form.id ? 'Save changes' : 'Create schedule' }}
          </SeButton>
        </div>
      </cv-form>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import format from 'date-fns/format'

export default {
  name: 'AddEditSchedule',

  data() {
    return {
      form: {
        workspace_type: '',
        days: [],
        start_time: '08:00:00',
        end_time: '17:00:00',
        comment: '',
      },
      visible: false,
      loading: false,
    }
  },

  events: {
    'schedule:add:open': function(){
      this.visible = true
    },
    'schedule:edit:open': function(data){
      this.visible = true
      this.form = { ...data.params[0] }
      this.form.check = parseInt(this.form.recurring_weeks) > 1 ? 'yes' : 'no'
    },
  },

  computed: {
    ...mapState({
      workspaces: (state) => state.workspaces.workspaces,
      practitioners: (state) => state.practitioners.users,
      services: (state) => state.services.services,
      locations: (state) => state.locations.locations,
    }),

    dates() {
      let dates = []

      this.form.days.forEach(day => {
        dates.push({
          start: this.dateTime(day, this.form.start_time),
          end: this.dateTime(day, this.form.end_time),
        })
      })

      return dates
    },

    time(){
      var dayOfWeek = 5 //friday
      var date = new Date()
      let time = '01:00:00'
      date = new Date(`${format(date, 'MM dd, yyyy')} ${time}`)
      date.setDate(date.getDate() + (dayOfWeek + 7 - date.getDay()) % 7)
      return `${format(date, 'yyyy-MM-dd')}T${format(date, 'HH:mm:ss')}Z`
    },
  },

  validations: {
    form: {
      practitioner: { required },
      health_service: { required },
      start_time: { required },
      days: { required, minLength: minLength(1)  },
      end_time: { required },
    },
  },

  methods: {
    ...mapActions({
      createSchedule: 'schedules/createSchedule',
      updateSchedule: 'schedules/updateSchedule',
    }),

    getDayIndex(date) {
      let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

      return days.indexOf(date)
    },

    dateTime(day, time){
      var dayOfWeek = this.getDayIndex(day)
      var date = new Date()
      date = new Date(`${format(date, 'MM dd, yyyy')} ${time}`)
      date.setDate(date.getDate() + (dayOfWeek + 7 - date.getDay()) % 7)
      return date
    },

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
        await this.createSchedule(this.form)
        this.$toast.open({
          message: 'Schedule successfully added',
        })
        this.close()
      } catch (error) {
        // this.$toast.open({
        //   message: error || 'Something went wrong!',
        //   type: 'error',
        // })
        this.loading = false
      } 
    },

    async update() {
      try {
        await this.updateSchedule(this.form)
        this.$toast.open({
          message: 'Schedule successfully updated',
        })
        this.close()
      } catch (error) {
        this.loading = false
      } 
    },

    close() {
      this.visible = false
      this.form = {}
      this.loading = false
    },

    customLabel ({ first_name, last_name }) {
      return `${first_name} ${last_name}`
    },
  },
}
</script>
