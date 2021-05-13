<template>
  <MultiStepBase
    :icon="icon"
    next-label="Summary"
    :previous="previous"
    @cancel="cancel"
    @save="reRoute"
  >
    <p class="text-primary my-4 font-bold">
      Additional notes for the appointment
    </p>
    <cv-text-area
      v-model="form.comment"
      placeholder="Write additional information for this appointment here"
      :rows="10"
    />
  </MultiStepBase>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapActions } from 'vuex'
import MultiStep from '@/mixins/multistep'

export default {
  name: 'AppointmentNotes',

  mixins: [MultiStep],

  data() {
    return {
      form: {},
      icon: ChevronRight,
      previous: 'DateDoctor',
      parent: 'Appointments',
      next: 'AppointmentSummary',
    }
  },

  methods: {
    ...mapActions({
      addToStoreData: 'appointments/addToCurrentAppointment',
    }),
  },
}
</script>
