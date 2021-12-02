<template>
  <BaseModal
    :name="name"
    title="Schedule Details"
    width="450px"
    @closed="close"
  >
    <template>
      <div class="space-y-8 left-button">
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
  </BaseModal>
</template>

<script>
import { mapActions} from 'vuex'
import modalMixin from '@/mixins/modal'

export default {
  name: 'ViewScheduleDetails',

  mixins: [modalMixin],

  data() {
    return {
      form: {},
      loading: false,
      name: 'view-schedule-modal',
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
      this.close()
    },
    'schedule:view:open': function(data){
      this.open()
      this.form = { ...data.params[0] }
    },
  },

  methods: {
    ...mapActions({
      deleteSchedule: 'schedules/deleteSchedule',
    }),

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
