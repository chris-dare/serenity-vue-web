<template>
  <cv-modal
    class="se-no-title-modal"
    close-aria-label="Close"
    :visible="visible"
    size="xs"
  >
    <template slot="content">
      <div>
        <div class="flex items-center justify-between">
          <p class="mb-2">Appointment details</p>
          <div
            class="flex justify-center items-center rounded-full h-4 w-4 mr-3 bg-tetiary"
          >
            <Edit class="w-3 h-3 text-serenity-primary" />
          </div>
        </div>
        <AppointmentDetail :appointment="appointment" />
        
        <div class="flex items-center justify-center flex-col space-y-3 mt-6">
          <SeButton
            full
            @click="print"
          >
            Print Bill
          </SeButton>
          <SeButton
            v-if="!appointment.isCancelled"
            variant="danger-outline"
            @click="cancel"
          >
            Cancel Appointment
          </SeButton>
          <router-link
            :to="{ name: 'Patients' }"
            class="underline text-primary"
          >
            Close
          </router-link>
        </div>
      </div>
    </template>
  </cv-modal>
</template>

<script>
import AppointmentDetail from '@/components/appointments/AppointmentDetail'

export default {
  name: 'AppointmentSummaryModal',

  components: {  AppointmentDetail },

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

  events: {
    'appointment:summary:open': function() {
      this.visible = true
    },
    'appointment:summary:edit': function(data) {
      this.visible = true
      this.form.notes = data.params[0]
    },
    'appointment:summary:close': function() {
      this.close()
    },
  },

  methods: {
    close() {
      this.visible = false
    },
    print() {
      this.$emit('print')
      this.visible = false
    },

    cancel() {
      this.$trigger('notes:open')
      this.visible = false
    },
  },
}
</script>
