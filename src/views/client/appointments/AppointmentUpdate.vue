<template>
  <MultiStepBase
    :icon="icon"
    :next-label="title"
    @cancel="cancel"
    @save="submit"
  >
    <div
      class="space-y-4"
    >
      <p class="text-primary my-4 font-bold">Selected Patient</p>
      <div>
        <InfoImageBlock
          :label="form.patient.name"
          :description="form.patient.phone"
        />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 mt-8 mb-6">
      <MultiSelect
        v-model="form.appointmentType"
        title="Choose an appointment type"
        :multiple="false"
        :options="types"
        label="label"
        track-by="value"
        placeholder="Select type"
        :error-message="$utils.validateRequiredField($v, 'appointmentType')"
        preselect
        custom-field="value"
      />

      <MultiSelect
        v-model="form.specialty"
        title="Choose a specialty"
        :multiple="false"
        :options="specialties"
        label="Display"
        track-by="Code"
        placeholder="Specialties"
        preselect
        @change="updateStore"
      />

      <!-- <MultiSelect
        v-model="form.service_tier"
        title="Choose a service tier"
        :multiple="false"
        :options="serviceTiers"
        label="label"
        track-by="value"
        placeholder="Service tiers"
        preselect
      /> -->
    </div>

    <SelectSlot :specialty="form.service" />
    <p class="text-primary my-4 font-bold">
      Additional notes for the appointment
    </p>
    <cv-text-area
      v-model="form.comment"
      placeholder="Write additional information for this appointment here"
      :rows="10"
    />
  </MultiStepBase>
</template>

<script>
import MultiStep from '@/mixins/multistep'
import { mapActions, mapState, mapGetters } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import Time from '@carbon/icons-vue/es/time/32'
import SlotList from '@/components/appointments/lists/SlotList'
import SlotInfoListItem from '@/components/appointments/lists/SlotInfoListItem'
import SelectSlot from '@/components/appointments/book/SelectSlot'

export default {
  name: 'AppointmentUpdate',

  // eslint-disable-next-line vue/no-unused-components
  components: { SlotList, SlotInfoListItem, SelectSlot },

  mixins: [MultiStep],

  props: {
    id: {
      type: String,
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
      next: 'Date Doctor',
      parent: 'Appointments',
      hideSlots: true,
    }
  },

  computed: {
    ...mapState({
      patientsCount: (state) => state.patients.patientsCount,
      storeData: (state) => state.appointments.currentAppointment,
      services: (state) => state.services.services,
      specialties: (state) => state.resources.specialties,
      types: (state) => state.appointments.appointmentTypes,
    }),

    ...mapGetters({
      availableSlots: 'appointments/availableSlots',
    }),

    specialty() {
      return this.form.specialty ? this.form.specialty : {}
    },

    serviceTiers() {
      if (!this.form.service || !this.form.service.price_tiers) return []
      return this.form.service.price_tiers.map(tier => {
        return {
          label: `${tier.name} - ${tier.currency} ${tier.cost}`,
          value: tier.name,
        }
      })
    },

    specialties() {
      if (!this.form.service && !this.services) return []
      const specialties = this.services.find(service => service.id === this.form.service.id)
      return specialties ? specialties.healthcare_service_specialties : []
    },

    filteredData() {
      if (!this.form.date) return []
      return this.availableSlots(this.form.date)
    },

    title() {
      return this.$route.query.type === 'update' ? 'Update appointment' : 'Rescedule appointment'
    },
  },

  validations: {
    form: {
      slot: { minLength: minLength(1), required  },
      service: { required },
      appointmentType: { required },
    },
  },

  methods: {
    ...mapActions({
      addToStoreData: 'appointments/addToCurrentAppointment',
      refresh: 'appointments/refreshCurrentAppointment',
      updateAppointment: 'appointments/updateAppointment',
      getAppointment: 'appointments/getAppointment',
      rescheduleAppointment: 'appointments/rescheduleAppointment',
    }),

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
      

      this.loading = true
      await this.updateAppointment(this.storeData).then(() => {
        this.$toast.open({
          message: 'Appointment successfully updated!',
        })
        this.$router.go(-1)})

      this.$trigger('billing:details:open')
      this.loading = false
    },
    async reschedule() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'Fill all required fields from previous steps!',
          type: 'error',
        })
        return
      }

      this.loading = true
      await this.rescheduleAppointment(this.storeData).then(() => {
        this.$toast.open({
          message: 'Appointment successfully rescheduled!',
        })
        this.$router.go(-1)})

      this.$trigger('billing:details:open')
      this.loading = false
    },

    updateStore() {
      this.addToStoreData(this.form)
    },
  },
}
</script>
