<template>
  <BaseModal
    :name="name"
    title="Deceased patient information"
    width="450px"
    @closed="close"
  >
    <template>
      <div class="space-y-8">
        <InfoBlock
          label="Cause of death"
          :description="patient.cause_of_death"
          description-class="text-serenity-primary capitalize"
        />
        <div class="grid grid-cols-2 gap-4">
          <InfoBlock
            label="Date of death"
            :description="$date.formatDate(patient.deceased_date_time, 'dd MMM, yyyy ')"
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
  </BaseModal>
</template>

<script>
import { mapState } from 'vuex'
import modalMixin from '@/mixins/modal'
export default {
  name: 'DeceasedDetailsModal',

  mixins: [modalMixin],

  data() {
    return {
      form: {},
      name: 'deceased-details-modal',
    }
  },

  events: {
    'profile:deceased-info:open': function(){
      this.open()
    },
    'profile:deceased-info:close': function(){
      this.close()
    },
  },

  computed: {
    ...mapState({
      patient: (state) => state.patients.currentPatient,
    }),
  },
}
</script>
