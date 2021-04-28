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
          placeholder="Select or search for practitioner"
          :custom-label="customLabel"
          :error-message="$utils.validateRequiredField($v, 'practitioner')"
        />

        <div class="grid grid-cols-2 gap-4">
          <MultiSelect
            v-model="form.workspace"
            title="Clinic/Workspace"
            :multiple="false"
            :options="workspaces"
            label="workspace_name"
            placeholder="Select workspace"
          />

          <MultiSelect
            v-model="form.health_service"
            title="Service"
            :multiple="false"
            :options="services"
            label="healthcare_service_name"
            placeholder="Select service"
            :error-message="$utils.validateRequiredField($v, 'health_service')"
          />
        </div>

        <div>
          <p class="bx--label">Which day(s)</p>
          <div class="grid grid-cols-7 items-center">
            <cv-checkbox
              v-for="(day, index) in ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']"
              :key="index"
              v-model="form.days"
              :value="day"
              :label="day"
              class="capitalize"
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
            v-model="form.recurrent_count"
            label="For how many weeks"
            placeholder="eg 4 weeks"
          />
        </div>

        <cv-text-area
          v-model="form.comments"
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
            full
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

export default {
  name: 'AddEditSchedule',

  data() {
    return {
      form: {
        workspace_type: '',
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
    },
  },

  computed: {
    ...mapState({
      workspaces: (state) => state.workspaces.workspaces,
      practitioners: (state) => state.practitioners.users,
      services: (state) => state.services.services,
    }),
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
        this.$toast.open({
          message: error || 'Something went wrong!',
          type: 'error',
        })
      } finally {
        this.loading = false
      }

      
    },

    update() {},

    close() {
      this.visible = false
      this.form = {}
    },

    customLabel ({ first_name, last_name }) {
      return `${first_name} ${last_name}`
    },
  },
}
</script>
