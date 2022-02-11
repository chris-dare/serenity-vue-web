<template>
  <div>
    <BillDetail
      :summary="storeData"
      :editable="true"
    />
    <BillingDetailsModal
      :appointment="storeData"
    />
  </div>
</template>

<script>
import Checkmark from '@carbon/icons-vue/es/checkmark--outline/32'
import BillingDetailsModal from '@/components/appointments/BillingDetailsModal'
import BillDetail from '@/components/billing/request/BillingDetail'
import { mapActions, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import MultiStep from '@/mixins/multistep'

export default {
  name: 'BillingSummaryDetail',

  components: { BillingDetailsModal, BillDetail },

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
      previous: 'BillingPayment',
      next: 'Orders',
      parent: 'BillingDashboard',
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
      return 'Create Bill'
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
        this.$toast.open({
          message: error.message || 'Something went wrong!',
          type: 'error',
        })
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
