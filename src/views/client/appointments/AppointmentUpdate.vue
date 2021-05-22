<template>
  <MultiStepBase
    :icon="icon"
    next-label="Update Appointment"
    @cancel="cancel"
    @save="update"
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

    <!-- date doctor -->
    <p class="text-primary my-4 font-bold">
      What time would the patient want to see the doctor?
    </p>
    <div class="grid">
      <DatePicker
        v-model="form.date"
        type="datetime"
      />
    </div>
    <div class="flex items-center space-x-4 my-4">
      <SeButton
        :icon="time"
      >
        Give me the next time slot
      </SeButton>
      <SeButton
        v-if="false"
        :icon="time"
        variant="success"
      >
        Join a wait queue
      </SeButton>
    </div>
    <p
      class="text-primary mt-8 mb-4 font-bold"
    >
      Select a doctor for the appointment
    </p>
    <div v-if="form.slot && form.practitioner && hideSlots">
      <SlotInfoListItem
        :slot="form.slot.slot"
        :name="form.practitioner.fullName"
        :specialty="specialty.Display"
        @change="hideSlots = false"
      />
    </div>
    <div
      v-else
      class="grid"
    >
      <SlotList
        v-model="form.slot"
        :data="filteredData"
      />
    </div>

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

export default {
  name: 'AppointmentUpdate',

  components: { SlotList, SlotInfoListItem },

  mixins: [MultiStep],

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
    }),

    async update() {
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.$toast.open({
          message: 'Fill all required fields from previous steps!',
          type: 'error',
        })
        return
      }

      this.loading = true
      await this.updateAppointment(this.storeData)

      this.$trigger('billing:details:open')
      this.loading = false
    },
  },
}
</script>
