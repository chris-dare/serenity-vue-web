<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
    @modal-hidden="close"
  >
    <template slot="content">
      <div>
        <div
          v-if="appointment.patient"
          class="w-full flex justify-center items-center flex-col space-y-1 mb-4"
        >
          <img
            class="w-32"
            src="@/assets/img/qr.png"
            alt=""
          >
          <p class="text-xs">{{ appointment.patient.fullName }}</p>
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
              <p class="font-bold text-xs">{{ practitioner.fullName }}</p>

              <div class="flex items-center space-x-1">
                <p class="text-secondary text-xs">{{ practitioner.role }}</p>
              </div>
              <div class="flex items-center space-x-1">
                <p class="text-secondary text-xs">Appointment time:</p>
                <p class="text-xs">{{ $date.formatDate(appointment.slot.start, 'dd MMM') }}, {{ appointment.slot.slot }}</p>
              </div>
            </div>
          </div>
          <div class="space-y-2 py-4">
            <p class="text-secondary text-xs">Appointment notes</p>

            <p class="text-xs">{{ appointment.comment }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div
            class="underline text-primary text-xs cursor-pointer"
            @click="returnToAppointment"
          >
            Return to appointments
          </div>
          <cv-button
            kind="primary"
            class="my-3 flex items-center justify-center bg-serenity-primary px-4"
            @click="$emit('print')"
          >
            Print Bill
          </cv-button>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import {  mapActions } from 'vuex'
export default {
  name: 'BillingDetailsModal',

  props: {
    appointment: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      visible: false,
    }
  },

  computed: {
    practitioner() {
      if (this.appointment.practitioner) return this.appointment.practitioner
      return this.appointment.slot.practitioner
    },
  },

  events: {
    'billing:details:open': function() {
      this.visible = true
    },
    'billing:details:close': function() {
      this.close()
    },
  },

  methods: {
    ...mapActions({
      refreshCurrentAppointment: 'appointments/refreshCurrentAppointment',
    }),
    returnToAppointment() {
      this.visible = !this.visible
      this.refreshCurrentAppointment()

      this.$router.push({ name: 'Appointments'})
    },

    close() {
      this.refreshCurrentAppointment
      this.visible = false
    },
  },
}
</script>
