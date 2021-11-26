<template>
  <MultiStepBase
    :icon="icon"
    :next-label="nextLabel"
    :previous="previous"
    :loading="loading"
    :modal="modal"
    :query="$route.query"
    @cancel="cancel"
    @save="save"
  >
    <AppointmentDetail :appointment="storeData" />
    <BillingDetailsModal
      :appointment="storeData"
    />
  </MultiStepBase>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark--outline/32'
import BillingDetailsModal from '@/components/appointments/BillingDetailsModal'
import AppointmentDetail from '@/components/appointments/AppointmentDetail'
import { mapActions, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import MultiStep from '@/mixins/multistep'

export default {
  name: 'AppointmentSummaryDetail',

  components: { BillingDetailsModal, AppointmentDetail },

  mixins: [MultiStep],

  props: {
    modal: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      icon: Checkmark,
      previous: 'AppointmentNotes',
      parent: 'Appointments',
    }
  },


  computed: {
    ...mapState({
      storeData: (state) => state.appointments.currentAppointment,
    }),

    isStartVisitModal() {
      return this.modal && !this.$route.path.includes('encounter')
    },

    nextLabel() {
      if (this.isStartVisitModal) {
        return 'Start Visit'
      }

      return 'Book Appointment'
    },
  },

  beforeMount() {},

  methods: {
    ...mapActions({
      createAppointment: 'appointments/createAppointment',
      refresh: 'appointments/refreshCurrentAppointment',
      addToStoreData: 'appointments/addToCurrentAppointment',
    }),

    async save() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'Fill all required fields from previous steps!',
          type: 'error',
        })
        return
      }
      this.addToStoreData(this.form)

      if (this.isStartVisitModal) {
        this.$emit('save', this.form)
        return
      }

      try {
        this.loading = true
        const appointment = await this.createAppointment(this.storeData)

        if (!this.isStartVisitModal) {
          this.$trigger('billing:details:open')
        }

        this.$emit('save', appointment)
        this.$toast.open('Appointment successfully saved')

        this.loading = false
      } catch (error) {
        this.loading = false
      }


    },
  },

  validations: {
    form: {
      slot: { required  },
      service: { required  },
      patient: { required  },
      appointmentType: { required  },
    },
  },
}
</script>
