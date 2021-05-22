<template>
  <MultiStepBase
    :icon="icon"
    next-label="Summary"
    :previous="previous"
    :modal="modal"
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
import { mapActions, mapState } from 'vuex'
import MultiStep from '@/mixins/multistep'

export default {
  name: 'AppointmentSelectNotes',

  mixins: [ MultiStep ],

  props: {
    modal: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {},
      icon: ChevronRight,
      previous: 'DateDoctor',
      parent: 'Appointments',
      next: 'AppointmentSummary',
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.appointments.currentAppointment,
    }),
  },

  methods: {
    ...mapActions({
      addToStoreData: 'appointments/addToCurrentAppointment',
      refresh: 'appointments/refreshCurrentAppointment',
    }),
  },
}
</script>
