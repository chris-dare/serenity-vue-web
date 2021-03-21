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
            label="Practitioner name"
            :description="form.healthcare_service_name"
          />
        </div>

        <div class="border-b border-solid border-subtle w-full h-0" />

        <div class="grid grid-cols-2 gap-8">
          <InfoBlock
            label="Days of the week"
            :description="form.available_days"
            class="col-span-2"
          />
          <InfoBlock
            label="Time range"
            :description="form.available_times"
            class="col-span-2"
          />
          <InfoBlock
            label="Start date"
            :description="form.description"
          />
          <InfoBlock
            label="End date"
            :description="form.unavailable_times"
          />
        </div>

        <div class="border-b border-solid border-subtle w-full h-0" />

        <InfoBlock
          label="Comment"
          :description="form.unavailable_times"
        />

        <div class="space-y-4 grid">
          <SeButton full>
            Edit schedule
          </SeButton>

          <SeButton
            variant="danger"
            full
            @click="close"
          >
            Delete Schedule
          </SeButton>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
export default {
  name: 'ViewScheduleDetails',

  data() {
    return {
      form: {},
      visible: false,
      loading: false,
    }
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
    close() {
      this.visible = false
      this.form = {}
    },
  },
}
</script>
