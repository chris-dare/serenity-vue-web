<template>
  <BaseModal
    :name="name"
    @closed="close"
  >
    <template>
      <div v-if="appointment">
        <div
          v-if="appointment.patient"
          class="w-full flex justify-center items-center flex-col space-y-1 mb-4"
        >
          <img
            class="w-32"
            src="@/assets/img/qr.png"
            alt=""
          >
          <p class="text-xs">{{ appointment.patient.fullName | capitalize }}</p>
          <p class="text-secondary text-xs">{{ appointment.patient.gender_age_description }}</p>
        </div>

        <div class="divide-y divide-secondary divide-solid">
          <div
            v-if="appointment.patient"
            class="flex items-center space-x-6 py-4"
          >
            <div>
              <p class="text-xs">{{ appointment.patient.mr_number }}</p>
              <p class="text-secondary text-xs">MR no.</p>
            </div>
            <div>
              <p class="text-xs">{{ appointment.patient.phone }}</p>
              <p class="text-secondary text-xs">Phone number</p>
            </div>
          </div>
          <div
            v-if="appointment.service"
            class="space-y-4 py-4"
          >
            <p class="text-secondary text-xs">Clinic and Services</p>

            <div class="space-y-2">
              <p class="font-bold text-xs">{{ appointment.service.categories }}</p>

              <div class="flex items-center space-x-1">
                <p class="text-secondary text-xs">Service:</p>
                <p class="text-xs">{{ appointment.service.healthcare_service_name }}</p>
              </div>
              <div
                v-if="appointment.service_tier"
                class="flex items-center space-x-1"
              >
                <p class="text-secondary text-xs">Price:</p>
                <p class="text-xs">{{ appointment.service_tier.label }}</p>
              </div>
            </div>
          </div>
          <div
            v-if="appointment.slot"
            class="space-y-4 py-4"
          >
            <p class="text-secondary text-xs">Date and Doctor</p>

            <div class="space-y-2">
              <p class="font-bold text-xs">{{ practitioner.fullName | capitalize }}</p>

              <div class="flex items-center space-x-1">
                <p class="text-secondary text-xs">{{ practitioner.role }}</p>
              </div>
              <div class="flex items-center space-x-1">
                <p class="text-secondary text-xs">Appointment time:</p>
                <p class="text-xs">{{ $date.formatDate(appointment.slot.start, 'dd MMM') }}, {{ $date.formatDate(appointment.slot.start, 'hh:ss a') }} - {{ $date.formatDate(appointment.slot.end, 'hh:ss a') }}</p>
              </div>
            </div>
          </div>
          <div class="space-y-2 py-4">
            <p class="text-secondary text-xs">Appointment notes</p>

            <p class="text-xs">{{ appointment.comment }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between space-y-3">
          <div
            class="underline text-primary text-xs cursor-pointer"
            @click="returnToAppointment"
          >
            Return to appointments
          </div>
          <SeButton
            v-if="appointment.charge_item_id"
            @click="printBill"
          >
            Print Bill
          </SeButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import {  mapActions } from 'vuex'
import modalMixin from '@/mixins/modal'

export default {
  name: 'BillingDetailsModal',

  mixins: [modalMixin],

  props: {
    appointment: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      name: 'billing-details-modal',
    }
  },

  computed: {
    practitioner() {
      if (this.appointment.practitioner) return this.appointment.practitioner
      return this.appointment.slot.practitioner || { fullName: this.appointment.slot.practitioner_name }
    },
  },

  events: {
    'billing:details:open': function() {
      this.open()
    },
    'billing:details:close': function() {
      this.close()
    },
  },

  methods: {
    ...mapActions({
      refreshCurrentAppointment: 'appointments/refreshCurrentAppointment',
      exportChargeItem: 'billing/exportChargeItem',
    }),

    returnToAppointment() {
      this.visible = !this.visible
      this.refreshCurrentAppointment()

      this.$router.push({ name: 'Appointments'})
    },

    afterCloseFunction() {
      this.refreshCurrentAppointment()
    },

    async printBill(){
      
      try {
        this.printLoading = true
        await this.exportChargeItem({id: this.appointment.charge_item_id})
        this.printLoading = false
      } catch (error) {
        this.printLoading = false
      }
    },
  },
}
</script>
