<template>
  <div>
    <DiagnosticDetail
      :summary="storeData"
      :editable="true"
    />
    <AppointmentSuccessModal :visible.sync="visible" />
    <BillingDetailsModal
      :appointment="storeData"
    />
  </div>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark--outline/32'
import AppointmentSuccessModal from '@/components/patients/modals/AppointmentSuccessModal'
import BillingDetailsModal from '@/components/appointments/BillingDetailsModal'
import DiagnosticDetail from '@/components/diagnostic/request/DiagnosticDetail'
import { mapActions, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import MultiStep from '@/mixins/multistep'

export default {
  name: 'DiagnosticSummaryDetail',

  components: { AppointmentSuccessModal, BillingDetailsModal, DiagnosticDetail },

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
      previous: 'DiagnosticPayment',
      next: 'Orders',
      parent: 'DiagnosticDashboard',
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
      return 'Create Diagnostic'
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
