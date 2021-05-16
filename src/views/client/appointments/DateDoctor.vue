<template>
  <MultiStepBase
    :icon="icon"
    next-label="Next: Notes"
    :previous="previous"
    @cancel="cancel"
    @save="validateAndReroute"
  >
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
      <cv-button
        :icon="time"
        kind="primary"
        class="bg-serenity-primary"
      >
        Give me the next time slot
      </cv-button>
      <cv-button
        :icon="time"
        kind="primary"
        class="bg-success"
      >
        Join a wait queue
      </cv-button>
    </div>
    <p
      class="text-primary mt-8 mb-4 font-bold"
    >
      Select a doctor for the appointment
    </p>
    <div
      class="grid"
    >
      <SlotList
        v-model="form.slot"
        :data="filteredData"
      />
    </div>
  </MultiStepBase>
</template>

<script>
import Time from '@carbon/icons-vue/es/time/32'
import SlotList from '@/components/appointments/lists/SlotList'
import { mapActions, mapState, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import MultiStep from '@/mixins/multistep'
import startOfDay from 'date-fns/startOfDay'

export default {
  name: 'DateDoctor',

  components: { SlotList },

  mixins: [MultiStep],

  data() {
    return {
      form: {
        doctor: {},
        date: startOfDay(new Date()),
        slot: {},
      },
      time: Time,
      loading: false,
      selected: 1,
      timezones: [
        {
          label: 'GMT',
          value: 'GMT',
        },
        {
          label: 'Timezone-2',
          value: 'timezone2',
        },
      ],
      pattern: '(1[012]|[1-9]):[0-5][0-9](\\s)?(?i)',
      previous: 'ClinicsServices',
      parent: 'Appointments',
      next: 'AppointmentNotes',
    }
  },

  computed: {
    ...mapState({
      workspaceType: (state) => state.global.workspaceType,
      storeData: (state) => state.appointments.currentAppointment,
    }),

    ...mapGetters({
      availableSlots: 'appointments/availableSlots',
    }),

    filteredData() {
      if (!this.form.date) return []
      return this.availableSlots(this.form.date)
    },

    disabled() {
      return !this.form.date || !this.form.doctor
    },
  },

  async beforeMount() {
    const specialty = this.storeData.specialty
    if(!specialty){
      this.$router.push({
        name: 'ClinicsServices',
      })
      this.$toast.error('Please select a specialty before proceeding')

      return
    }
    this.loading = true
    await this.getSlots(specialty.Code)
    this.loading = false
  },

  validations: {
    form: {
      slot: { required  },
    },
  },

  methods: {
    ...mapActions({
      addToStoreData: 'appointments/addToCurrentAppointment',
      refresh: 'appointments/refreshCurrentAppointment',
      getSlots: 'appointments/getSlots',
    }),
  },
}
</script>
