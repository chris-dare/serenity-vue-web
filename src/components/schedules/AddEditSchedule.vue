<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="sm"
    @modal-hidden="close"
  >
    <template slot="content">
      <div class="space-y-8 left-button">
        <p class="text-lg font-semibold">{{ form.id ? 'Edit' : 'New' }} schedule</p>
        <MultiSelect
          v-model="form.practitioner"
          title="Who are you scheduling?"
          :multiple="false"
          :options="practitioners"
          label="first_name"
          placeholder="Select or search for practitioner"
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
            v-model="form.service"
            title="Service"
            :multiple="false"
            :options="services"
            label="healthcare_service_name"
            placeholder="Select service"
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
        </div>

        <div class="grid grid-cols-2 gap-x-4 gap-y-8">
          <Timepicker
            v-model="form.start"
            label="Specify a start time"
          />
          <Timepicker
            v-model="form.end"
            label="End time"
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
          <cv-text-input
            v-model="form.schedule_name"
            label="For how many weeks"
            type="text"

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
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions, mapState } from 'vuex'

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

  methods: {
    ...mapActions({
      createSchedule: 'schedules/createSchedule',
      updateSchedule: 'schedules/updateSchedule',
    }),
    submit(){
      if (this.form.id) {
        this.update()
      } else {
        this.save()
      }
    },
    close() {
      this.visible = false
      this.form = {
        schedule_type: [],
      }
    },
  },
}
</script>
