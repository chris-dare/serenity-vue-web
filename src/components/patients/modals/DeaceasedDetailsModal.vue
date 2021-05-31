<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="visible = false"
  >
    <template slot="content">
      <div class="space-y-8">
        <p class="text-lg font-semibold">Deceased patient information</p>
        <InfoBlock
          label="Cause of death"
          :description="patient.cause_of_death"
          description-color="text-serenity-primary"
        />
        <div class="grid grid-cols-2 gap-4">
          <InfoBlock
            label="Date of death"
            :description="$date.formatDate(patient.deceased_date_time, 'yyyy-MM-dd')"
          />
          <InfoBlock
            label="Time of death"
            :description="$date.formatDate(patient.deceased_date_time, 'HH:mm a')"
          />
        </div>
        <InfoBlock
          label="Reported by"
        >
          <div class="flex items-center py-2">
            <img
              class="w-10 h-10 rounded-full mr-3"
              src="@/assets/img/user 1.svg"
              alt=""
            >
            <div>
              <p>Dr. {{ 'Chris Dare' }}</p>
              <p class="text-secondary text-xs">
                General Practitioner
              </p>
            </div>
          </div>
        </InfoBlock>
        <SeButton
          variant="secondary"
          full
        >
          Close
        </SeButton>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'DeceasedDetailsModal',

  data() {
    return {
      form: {},
      visible: false,
    }
  },

  events: {
    'profile:deceased-info:open': function(){
      this.visible = true
    },
    'profile:deceased-info:close': function(){
      this.visible = false
    },
  },

  computed: {
    ...mapState({
      patient: (state) => state.patients.currentPatient,
    }),
  },
}
</script>
