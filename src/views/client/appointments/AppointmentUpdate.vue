<template>
  <MultiStepBase
    :icon="icon"
    :next-label="title"
    :loading="loading"
    @cancel="cancel"
    @save="submit"
  >
    <div
      class="space-y-8"
    >
      <p class="text-primary my-4 font-bold text-sm">Selected Patient</p>
      <InfoImageBlock
        :label="form.patient_full_name"
        :description="form.patient_mobile"
      />
    
    
      <p class="text-primary my-4 font-bold text-sm">Selected service</p>
      <div class="grid grid-cols-2 gap-4 mt-8 mb-6">
        <MultiSelect
          v-model="form.appointment_type"
          title="Choose an appointment type"
          :multiple="false"
          :options="types"
          label="label"
          track-by="value"
          placeholder="Select type"
          :error-message="$utils.validateRequiredField($v, 'appointment_type')"
          preselect
          custom-field="value"
          required
        />

        <MultiSelect
          v-model="form.healthcare_service"
          title="Choose a service"
          :multiple="false"
          :options="services"
          label="healthcare_service_name"
          track-by="id"
          custom-field="id"
          placeholder="Service"
          preselect
          :error-message="$utils.validateRequiredField($v, 'healthcare_service')"
          required
          @change="updateStore"
        />

        <MultiSelect
          v-model="form.service_tier"
          title="Choose a service tier"
          :multiple="false"
          :options="serviceTiers"
          :custom-label="tier => `${tier.display} - ${tier.currency} ${tier.charge}`"
          placeholder="Service tiers"
          preselect
          :error-message="$utils.validateRequiredField($v, 'service_tier')"
          required
        />
      </div>

      <p class="text-primary my-4 font-bold text-sm">
        What time would the patient want to see the doctor?
      </p>

      <div class="space-y-2">
        <p>Current slot</p>
        <div class="grid grid-cols-4">
          <p>Start: </p>
          <p class="col-span-3">{{ $date.formatDate(form.slot_start) }}</p>
          <p>End: </p>
          <p class="col-span-3">{{ $date.formatDate(form.slot_end) }}</p>
        </div>
      </div>

      <div
        class="space-y-4"
      >
        <DatePicker
          v-model="filters"
          type="datetimerange"
          disable-dates-before-today
          @change="refresh"
        />
        <SeButton
          :icon="time"
          @click="getNextSlot"
        >
          Give me the next time slot
        </SeButton>
      </div>

      <SlotList
        v-model="form._slot"
        :data="slots"
        :data-loading="loading"
      />

      <p
        class="text-primary my-4 font-bold text-sm"
      >
        Additional notes for the appointment
      </p>
      <cv-text-area
        v-model="form.comment"
        placeholder="Write additional information for this appointment here"
        :rows="10"
      />
    </div>

    <BillingDetailsModal
      :appointment="selectedAppointment"
    />
  </MultiStepBase>
</template>

<script>
import ChevronRight from '@carbon/icons-vue/es/chevron--right/32'
import { mapActions, mapState, mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import Time from '@carbon/icons-vue/es/time/32'
import SlotList from '@/components/appointments/lists/SlotList'
import isSameDay from 'date-fns/isSameDay'
import BillingDetailsModal from '@/components/appointments/BillingDetailsModal'

export default {
  name: 'AppointmentUpdate',

  components: { SlotList, BillingDetailsModal },

  props: {
    id: {
      type: [String, Number],
      default: '',
    },
  },

  data() {
    return {
      form: {
        patient: {},
      },
      time: Time,
      loading: false,
      parent: 'Appointments',
      filters: null,
      icon: ChevronRight,
      selectedAppointment: null,
    }
  },

  computed: {
    ...mapState({
      storeData: (state) => state.appointments.currentAppointment,
      services: (state) => state.services.services,
      types: (state) => state.appointments.appointmentTypes,
    }),

    ...mapGetters({
      availableSlots: 'appointments/availableSlots',
      slots: 'appointments/slots',
      getNormalisedView: 'appointments/getNormalisedView',
    }),

    isReschedule() {
      return this.$route.query.type === 'reschedule'
    },

    serviceId() {
      return this.services?.find(service => service.id === this.form.healthcare_service)?.id
    },

    serviceUUId() {
      return this.services?.find(service => service.id === this.form.healthcare_service)?.uuid
    },

    serviceTiers() {
      const service = this.services.find(service => service.id === this.form.healthcare_service)
      if (!service || !service.price_tiers) return []

      return service.price_tiers
    },

    title() {
      return this.$route.query.type === 'update' ? 'Update appointment' : 'Reschedule appointment'
    },
  },

  validations: {
    form: {
      slot: { minLength: minLength(1), required  },
      healthcare_service: { required },
      service_tier: { required },
      appointment_type: { required },
    },
  },

  watch: {
    serviceId: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          this.refresh()
        }
      },
    },
    serviceTiers: {
      deep: true,
      handler(val, oldVal) {
        if (val !== oldVal && oldVal.length) {
          this.form.service_tier = null
        }
      },
    },
  },

  mounted() {
    this.form = { ...this.storeData, _slot: null }
  },

  beforeDestroy() {
    this.refreshCurrentAppointment()
  },

  methods: {
    ...mapActions({
      addToStoreData: 'appointments/addToCurrentAppointment',
      refreshCurrentAppointment: 'appointments/refreshCurrentAppointment',
      updateAppointment: 'appointments/updateAppointment',
      getAppointment: 'appointments/getAppointment',
      rescheduleAppointment: 'appointments/rescheduleAppointment',
      getSlots: 'appointments/getSlots',
      getNextAvailableSlot: 'appointments/getNextAvailableSlot',
    }),

    cancel() {
      this.$router.push({ name: this.parent })
    },

    async refresh(val = null) {
      try {
        this.loading = true
        const filters = this.convertFromDatePickerFormat(val)
        await this.getSlots({ healthcareservice: this.serviceId, ...filters })
      } catch (error) {
        this.loading = false
      }
      this.loading = false

    },

    convertFromDatePickerFormat(val) {
      if (!val) {
        return {
          start__gte: this.$date.queryNow(),
        }
      }
      return {
        start__gte: this.$date.formatQueryParamsDate(val[0]),
        end__lte: isSameDay(val[0], val[1]) || !val[1] ? this.$date.formatQueryParamsDate(this.$date.endOfDate(val[0])) : this.$date.formatQueryParamsDate(val[1]),
      }
    },

    async getNextSlot() {
      try {
        this.loading = true
        await this.getNextAvailableSlot({ healthcareservice_id: this.serviceId })
        
      } catch (error) {
        this.loading = false
        
      }
      this.loading = false

    },

    submit() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.error('Fill all required fields!')
        return
      }
      if (this.$route.query.type === 'update') {
        this.update()
      } else {
        this.reschedule()
      }
    },

    async update() {
      try {
        let payload = {
          patient_id: this.form.patient_id,
          healthcare_service_id: this.serviceUUId,
          appointment_type: this.form.appointment_type,
          service_tier_id: this.form.service_tier.uuid,
          comment: this.form.comment,
        }

        if (this.form._slot) {
          payload.slot_id = this.form._slot.uuid
        }
        this.loading = true
        const data = await this.updateAppointment({ appointmentId: this.form.uuid, payload })
        this.$toast.open({
          message: 'Appointment successfully updated!',
        })
        this.selectedAppointment = this.getNormalisedView(data)
        this.$trigger('billing:details:open')
        // this.$router.push({ name: this.parent })
      } finally {
        this.loading = false
      }
    },

    async reschedule() {
      try {
        this.loading = true
        await this.rescheduleAppointment(this.form)
        this.$toast.open({
          message: 'Appointment successfully rescheduled!',
        })
        this.$router.push({ name: this.parent })
      } finally {
        this.loading = false
      }
    },

    updateStore() {
      this.addToStoreData(this.form)
    },
  },
}
</script>
