<template>
  <BaseModal
    :name="name"
    @closed="close"
  >
    <div
      slot="title"
      class="flex items-center justify-between"
    >
      <p class="mb-2">Appointment details</p>
      <div
        class="flex justify-center items-center rounded-full h-4 w-4 mr-3 bg-tetiary"
      >
        <Edit class="w-3 h-3 text-serenity-primary" />
      </div>
    </div>
    <template>
      <div>
        <AppointmentDetail :appointment="appointment" />
        
        <div class="flex items-center justify-center flex-col space-y-3 mt-6">
          <div
            v-if="canStartVisit"
            class="w-full space-y-3"
          >
            <SeButton
              full
              @click="start"
            >
              Start Visit
            </SeButton>
            <SeButton
              full
              variant="secondary"
              @click="reschedule"
            >
              Reschedule Appointment
            </SeButton>
          </div>
          <SeButton
            v-else
            full
            @click="print"
          >
            Print Bill
          </SeButton>
          <SeButton
            v-if="!appointment.isCancelled"
            variant="danger-outline"
            full
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
  </BaseModal>
</template>

<script>
import AppointmentDetail from '@/components/appointments/AppointmentDetail'
import { mapState, mapActions } from 'vuex'
import isToday from 'date-fns/isToday'
import modalMixin from '@/mixins/modal'

export default {
  name: 'AppointmentSummaryModal',

  components: {  AppointmentDetail },

  mixins: [modalMixin],

  props: {
    appointment: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      name: 'appointment-summary-modal',
    }
  },

  events: {
    'appointment:summary:open': function() {
      this.open()
    },
    'appointment:summary:edit': function(data) {
      this.open()
      this.form.notes = data.params[0]
    },
    'appointment:summary:close': function() {
      this.close()
    },
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
      provider: (state) => state.auth.provider,
    }),

    canStartVisit() {
      return isToday(new Date(this.appointment.start))
    },
  },

  methods: {
    ...mapActions({
      createVisit: 'visits/createVisit',
      setCurrentAppointment: 'appointments/setCurrentAppointment',
    }),

    print() {
      this.$trigger('billing:details:open')
      this.close()
    },

    cancel() {
      this.$trigger('notes:open')
      this.close()
    },

    reschedule() {
      this.setCurrentAppointment(this.appointment)
      this.$router.push({name: 'AppointmentUpdate', params: { id: this.appointment.id }, query: {type: 'reschedule'}})
    },

    async start() {
      try {
        this.loading = true
        await this.createVisit({
          patient: this.appointment.patient.id,
          appointment: this.appointment.id,
          status: 'planned',
          // need appointment handler
          assigned_to: this.appointment.id,
          visit_class: 'ambulatory',
          arrived_at: this.$date.queryNow(),
          service_provider: this.provider.id,
          location: this.$locationId,
        })
        this.close()
        this.loading = false
        this.$toast.open({ message: 'The visit has started' })
      } catch (error) {
        this.loading = false
      }
    },
  },
}
</script>
