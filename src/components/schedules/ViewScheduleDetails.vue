<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="close"
  >
    <template slot="content">
      <div class="space-y-8 left-button">
        <p class="text-lg font-semibold">Schedule Details</p>

        <div>
          <p class="text-xs">Practitioner</p>
          <InfoImageBlock
            :label="form && form.title"
            label-class="font-semibold"
          />
        </div>

        <div class="border-b border-solid border-subtle w-full h-0" />

        <div class="grid grid-cols-2 gap-8">
          <InfoBlock
            label="Days of the week"
            :description="days"
            class="col-span-2"
          />
          <InfoBlock
            label="Time range"
            :description="form && form.timeRange"
            class="col-span-2"
          />
          <InfoBlock
            label="Date"
            :description="form && form.fullDate"
          />
          <InfoBlock
            label="Service"
            :description="form.health_service && form.health_service.healthcare_service_name"
            class="col-span-2"
          />
        </div>

        <div class="border-b border-solid border-subtle w-full h-0" />

        <InfoBlock
          label="Comment"
          :description="form && form.unavailable_times"
        />

        <div class="space-y-4 grid">
          <SeButton
            full
            @click="edit"
          >
            Edit schedule
          </SeButton>

          <SeButton
            variant="danger"
            full
            :loading="loading"
            @click="remove"
          >
            Delete Schedule
          </SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapActions} from 'vuex'

export default {
  name: 'ViewScheduleDetails',

  data() {
    return {
      form: {},
      visible: false,
      loading: false,
    }
  },

  computed: {

    days() {
      if (!this.form.days) return ''

      return this.form.days.join(', ')
    },
  },

  events: {
    'schedule:view:close': function(){
      this.visible = false
    },
    'schedule:view:open': function(data){
      this.visible = true
      this.form = { ...data.params[0] }
    },
  },

  methods: {
    ...mapActions({
      deleteSchedule: 'schedules/deleteSchedule',
    }),

    close() {
      this.visible = false
      this.form = {}
    },

    edit() {
      this.$trigger('schedule:edit:open', this.form)
      this.close()
    },

    async remove() {
      this.loading = true
      try {
        await this.deleteSchedule({practitionerId: this.form.practitioner.id, scheduleId: this.form.id })
        this.$toast.open({
          message: 'Schedule successfully deleted!',
        })
        this.loading = false
        this.close()
      } catch (error) {
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
        this.loading = false
      }
    },
  },
}
</script>
