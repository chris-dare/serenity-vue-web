<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="large"
    @modal-hidden="close"
  >
    <template slot="content">
      <AppRegisterLayout
        :label="label"
        :nav-items="navItems"
        :checked="step"
        modal
        @next="go"
      >
        <component
          :is="stepComponent"
          modal
          @next="next"
          @save="close"
        />
      </AppRegisterLayout>
    </template>
  </cv-modal>
</template>

<script>
import AppointmentSelectPatient from '@/components/appointments/book/AppointmentSelectPatient'

const AppointmentSummaryDetail = () => import('@/components/appointments/book/AppointmentSummaryDetail')
const AppointmentSelectSlot = () => import('@/components/appointments/book/AppointmentSelectSlot')
const AppointmentSelectNotes = () => import('@/components/appointments/book/AppointmentSelectNotes')
const AppointmentSelectClinic = () => import('@/components/appointments/book/AppointmentSelectClinic')
import { mapState, mapActions } from 'vuex'

export default {
  name: 'BookAppointmentModal',

  components: {  AppointmentSelectClinic, AppointmentSelectPatient, AppointmentSelectNotes, AppointmentSelectSlot, AppointmentSummaryDetail },

  props: {
    appointment: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      visible: false,
      step: 2,
      label: '',
    }
  },

  computed: {
    ...mapState({
      currentAppointment: (state) => state.appointments.currentAppointment,
    }),

    navItems() {
      return[
        // { label: 'Select patient', description: 'Existing or new patient', path: 1, completed: false, step: 1, slug: 'select-patient' },
        { label: 'Clinics, Services', description: 'Choose service', path: 2, completed: false, step: 2, slug: 'clinic-service' },
        { label: 'Date, Doctor', description: 'Choose your date and doctor', path: 3, completed: false, step: 3, slug: 'date-doctor' },
        //   { label: 'Payment', description: 'How patient makes payment', path: 'AppointmentPayment', completed: false, step: 'payment'},
        { label: 'Notes', description: 'Any notes to take', path: 4, completed: false, step: 4, slug: 'notes' },
        { label: 'Summary', description: 'Overview of appointment', path: 5, completed: false, step: 5, slug: 'summary' },
      ]
    },

    stepComponent() {
      const map = {
        1: 'AppointmentSelectPatient',
        2: 'AppointmentSelectClinic',
        3: 'AppointmentSelectSlot',
        4: 'AppointmentSelectNotes',
        5: 'AppointmentSummaryDetail',
      }

      return map[this.step]
    },
  },

  events: {
    'book:appointment:open': function(data) {
      this.visible = true
      this.label = data.params[0] === 'followup' ? `Follow up appointment - ${this.currentAppointment.patient.fullName}` : `Walk in patient visit - ${this.currentAppointment.patient.fullName}`
    },
    'book:appointment:edit': function(data) {
      this.visible = true
      this.form.notes = data.params[0]
    },
    'book:appointment:close': function() {
      this.close()
    },
  },

  methods: {
    ...mapActions({
      getSlots: 'appointments/getSlots',
    }),
  
    close() {
      this.step = 2
      this.visible = false
    },

    async checkForSpecialty() {
      const specialty = this.currentAppointment.specialty
      if(!specialty ){
        this.step = 2
        this.$toast.error('Please select a specialty before proceeding')

        return
      }

      await this.filter()
      this.step = this.step + 1
    },

    go(step) {
      this.step = step
    },

    next() {
      if (this.step === 2) {
        this.checkForSpecialty()
        return
      }
      this.step = this.step + 1
    },

    async filter() {
      const filters = this.convertFromDatePickerFormat(new Date())
      await this.getSlots({ service_specialty: this.currentAppointment.specialty.Code, ...filters })
    },

    convertFromDatePickerFormat(val) {
      return {
        start: this.$date.formatQueryParamsDate(val),
        end: this.$date.formatQueryParamsDate(this.$date.endOfDate(val)),
      }
    },
  },
}
</script>
