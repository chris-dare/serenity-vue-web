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
    <AppointmentSuccessModal :visible.sync="visible" />
    <BillingDetailsModal
      :appointment="storeData"
    />
  </MultiStepBase>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark--outline/32'
import AppointmentSuccessModal from '@/components/patients/modals/AppointmentSuccessModal'
import BillingDetailsModal from '@/components/appointments/BillingDetailsModal'
import AppointmentDetail from '@/components/appointments/AppointmentDetail'
import { mapActions, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import MultiStep from '@/mixins/multistep'

export default {
  name: 'AppointmentSummaryDetail',

  components: { AppointmentSuccessModal, BillingDetailsModal, AppointmentDetail },

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
      visible: false,
      previous: 'AppointmentNotes',
      parent: 'Appointments',
    }
  },


  computed: {
    ...mapState({
      storeData: (state) => state.appointments.currentAppointment,
    }),

    nextLabel() {
      if (this.modal && !this.$route.path.includes('encounter')) {
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

      try {
        this.loading = true
        await this.createAppointment(this.storeData)
        this.$emit('save')
        this.$trigger('billing:details:open')
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
